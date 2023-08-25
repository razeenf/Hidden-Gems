import express from "express";
import multer from "multer";
import sharp from "sharp";
import crypto from "crypto";
import cors from "cors";

import { PrismaClient } from "@prisma/client";
import { uploadFile, deleteFile, getObjectSignedUrl } from "./s3.js";

const prisma = new PrismaClient();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const app = express();
app.use(cors());

const generateImageId = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

// api endpoint to get all posts
app.get("/api/posts", async (req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: [{ createdAt: "desc" }],
  });
  for (let post of posts) {
    post.imageUrl = await getObjectSignedUrl(post.imageId);
  }
  res.send(posts);
});

// // api endpoint to get quried posts
// app.get("/api/posts/:id", async (req, res) => {
//   const id = +req.params.id;
//   const posts = await prisma.posts.findMany(
//     { where: { id } },
//     { orderBy: [{ created: "desc" }] }
//   );

//   for (let post of posts) {
//     post.imageUrl = await getObjectSignedUrl(post.imageId);
//   }
//   res.send(posts);
// });

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
    .resize({ height: 550, width: 600, fit: "cover" })
    .jpeg({ quality: 90 })
    .png({ compressionLevel: 9 })
    .toBuffer();

  await uploadFile(fileBuffer, imageId, file.mimetype);

  const post = await prisma.post.create({
    data: {
      name: name,
      address: address,
      city: city,
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
