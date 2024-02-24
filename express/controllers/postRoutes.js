import express from "express";
import multer from "multer";
import sharp from "sharp";
import crypto from "crypto";
import dotenv from "dotenv";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { getImage, uploadImage, deleteImage } from "../s3Bucket.js";

dotenv.config();

const prisma = new PrismaClient();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router(); // Use express.Router() to create a router instance

const generateImageId = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

// api endpoint to get first 5 latest posts
router.get("/recent", async (req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" }, // sort by createdAt in descending order so newest posts are first
    take: 5,
  });

  //if at least 1 post exists and its not empty
  if (posts) {
    for (let post of posts) {
      post.imageUrl = await getImage(post.imageId);
    }
    res.status(200).send(posts);
  } else {
    res.status(404);
  }
});

// api endpoint to get queried posts
router.get("/:cityName", async (req, res) => {
  const city = req.params.cityName;

  const posts = await prisma.post.findMany({
    where: { city: city.toLowerCase() },
    orderBy: { createdAt: "desc" },
  });

  //if at least 1 post exists and its not empty
  if (posts) {
    for (let post of posts) {
      post.imageUrl = await getImage(post.imageId);
    }
    res.status(200).send(posts);
  } else {
    res.status(404);
  }
});

//api endpoint to get nearby posts
router.get("/nearby/:latitude/:longitude", async (req, res) => {
  const { latitude, longitude } = req.params;

  try {
    const geocodeResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );

    const city = geocodeResponse.data.results[0].address_components.find(
      (component) => component.types.includes("locality")
    ).long_name;

    console.log(city);

    // Fetch the 5 most recent posts in the city
    const posts = await prisma.post.findMany({
      where: { city: city.toLowerCase() },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    //if at least 1 post exists and its not empty
    if (posts) {
      for (let post of posts) {
        post.imageUrl = await getImage(post.imageId);
      }
      res.status(200).send(posts);
    } else {
      res.status(404);
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Error retrieving nearby posts.");
  }
});

// api endpoint to check for new posts
router.get("/new/:id", async (req, res) => {
  const currentId = parseInt(req.params.id, 10);

  const posts = await prisma.post.findMany({
    orderBy: { id: "desc" }, // sort by id in descending order so newest posts are first
    where: { id: { gt: currentId } }, // only get posts with id greater than currentId
  });

  //if at least 1 post exists and its not empty
  if (posts) {
    for (let post of posts) {
      post.imageUrl = await getImage(post.imageId);
    }
    res.status(200).send(posts);
  } else {
    res.status(404);
  }
});

// api endpoint to create a post
router.post("/upload", upload.single("image"), async (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const city = req.body.city;
  const category = req.body.category;
  const description = req.body.description;
  const file = req.file;
  const imageId = generateImageId();

  // Check if the file size exceeds the limit (5MB)
  if (file.size > 5 * 1024 * 1024) {
    return res.status(413).json({ error: "File size limit exceeded." });
  }

  const fileBuffer = await sharp(file.buffer)
    .resize({ height: 700, width: 400, fit: "cover" })
    .jpeg({ quality: 90 })
    .png({ compressionLevel: 9 })
    .toBuffer();

  await uploadImage(fileBuffer, imageId, file.mimetype);

  const post = await prisma.post.create({
    data: {
      name: name,
      address: address,
      city: city.toLowerCase(),
      category: category,
      description: description,
      imageId: imageId,
    },
  });

  res.status(201).send(post);
});

// // api endpoint to delete a post
// app.delete("/api/posts/:id", async (req, res) => {
//   const id = +req.params.id;
//   const post = await prisma.posts.findUnique({ where: { id } });

//   await deleteImage(post.imageId);

//   await prisma.posts.delete({ where: { id: post.id } });
//   res.send(post);
// });

export default router;
