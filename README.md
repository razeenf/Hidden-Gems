# <img src="react\src\assets\logo.png" alt="Project Logo" width="25px"> Hidden Gems

A web app that showcases user-submitted destinations in various cities that are interesting yet lesser-known. The purpose of this project was to develop a full stack application (React, Express, Node, PostgreSQL) utilizing AWS resources (RDS, S3, EC2). This project is currently a MVP and is still a work in progress.

## Features

Some features that I have already implemented and more I am planning to add soon.

- [x] View others posts
- [x] View recent posts
- [x] Filter for posts by City
- [x] Share posts
- [ ] Delete posts
- [ ] Filter for posts by Category
- [x] User profile
- [ ] Save posts

## System Design

User entries stored in RDS PostgreSQL database via Prisma ORM and image files stored in an S3 Bucket using the AWS SDK, implemented Axios to interact with REST API endpoints to perform CRUD operations. Saved fetched data in local storage to minimize API calls and developed a synchronization algorithm to update local storage with latest data.

A simple diagram of how I implemented AWS resources with my project:

<img src="https://cdn.discordapp.com/attachments/864955277521322015/1146336145697943622/sd.png" alt="Project Logo" width="100%">

<!-- Add more screenshots as needed -->

## Notes

- One key aspect of this project was my goal to limit API calls to S3 because I wanted to stay within the free tier limits, and in my attempt to do so I decided to go with local storage rather than session storage so that API calls wouldn't be made with each new session.

- But in order to have the latest data in local storage and not miss out on any new posts I built a synchronization function to update the local storage with new posts uploaded by users.

- The sync function runs every time the explore component mounts thanks to useEffect hook. It checks for new data that has been created after the data saved in local storage and simply appends new posts to local storage, greatly minimizing S3 API calls.
