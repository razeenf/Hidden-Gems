import express from "express";
import multer from "multer";
import sharp from "sharp";
import crypto from "crypto";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

import { PrismaClient } from "@prisma/client";
import { uploadFile, deleteFile, getObjectSignedUrl } from "./s3.js";

const prisma = new PrismaClient();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const app = express();
app.use(cors());

const generateImageId = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

// api endpoint to get first 5 latest posts
app.get("/api/posts", async (req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" }, // sort by createdAt in descending order so newest posts are first
    take: 5,
  });

  for (let post of posts) {
    post.imageUrl = await getObjectSignedUrl(post.imageId);
    console.log("called s3");
  }
  res.send(posts);
});

// api endpoint to get queried posts
app.get("/api/posts/:cityName", async (req, res) => {
  const city = req.params.cityName;

  const posts = await prisma.post.findMany({
    where: { city: city.toLowerCase() },
    orderBy: { createdAt: "desc" },
  });

  for (let post of posts) {
    console.log("called s3");
    post.imageUrl = await getObjectSignedUrl(post.imageId);
  }

  if (posts.length > 0) {
    res.send(posts);
  } else {
    res.send([]);
  }
});

//api endpoint to get nearby posts
app.get("/api/posts/nearby/:latitude/:longitude", async (req, res) => {
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

    for (let post of posts) {
      console.log("called s3");
      post.imageUrl = await getObjectSignedUrl(post.imageId);
    }

    if (posts.length > 0) {
      res.send(posts);
    } else {
      res.send([]);
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Error retrieving nearby posts.");
  }
});

// api endpoint to check for new posts
app.get("/api/posts/new/:id", async (req, res) => {
  const currentId = parseInt(req.params.id, 10);

  const posts = await prisma.post.findMany({
    orderBy: { id: "desc" }, // sort by id in descending order so newest posts are first
    where: { id: { gt: currentId } }, // only get posts with id greater than currentId
  });

  for (let post of posts) {
    console.log("called s3");
    post.imageUrl = await getObjectSignedUrl(post.imageId);
  }

  if (posts.length > 0) {
    res.send(posts);
  } else {
    res.send([]);
  }
});

// api endpoint to create a post
app.post("/api/posts", upload.single("image"), async (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const city = req.body.city;
  const category = req.body.category;
  const description = req.body.description;
  const file = req.file;
  const imageId = generateImageId();

  const fileBuffer = await sharp(file.buffer)
    .resize({ height: 700, width: 400, fit: "cover" })
    .jpeg({ quality: 90 })
    .png({ compressionLevel: 9 })
    .toBuffer();

  await uploadFile(fileBuffer, imageId, file.mimetype);

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

//   await deleteFile(post.imageId);

//   await prisma.posts.delete({ where: { id: post.id } });
//   res.send(post);
// });

app.listen(8080, () => console.log("listening on port 8080"));
