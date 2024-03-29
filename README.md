﻿<a name="readme-top"></a>

<div align="center">
    <h1><img src="react\src\assets\logo.png" alt="Project Logo" width="25px"> Hidden Gems</h1>
</div>

A web application designed to highlight interesting but less-explored destinations submitted by users across different cities. The main goal of this project was to learn and use AWS services like RDS, S3, and EC2 while building a complete application with React, Express, Node, and PostgreSQL. Work in progress. <a href="https://hiddengemz.xyz/"><strong>View Site ➜</strong></a>

### Screenshots

Screenshots from iPhone 12 Pro through DevTools Emulated Device.

<div align="center">
    <img src="./assets/1. home page.png" alt="Project Logo" style="width: 32%;">
    <img src="./assets/2. explore page.png" alt="Project Logo" style="width: 32%;">
    <img src="./assets/3. card.png" alt="Project Logo" style="width: 32%;">
    <img src="./assets/4. share page.png" alt="Project Logo" style="width: 32%;">
    <img src="./assets/5. login page.png" alt="Project Logo" style="width: 32%;">
    <img src="./assets/6. user page.png" alt="Project Logo" style="width: 32%;">
</div>

### Roadmap

Some features that I have already implemented and more I am planning to add soon.

- [x] View others posts
- [x] Display recent posts
- [x] Display nearby posts
- [x] Search for posts by City
- [x] Upload posts
- [x] User profile
- [ ] Save posts
- [ ] Delete posts
- [ ] User Authentication
- [ ] Filter for posts by Category

## System Design

User entries stored in RDS PostgreSQL database via Prisma ORM and image files stored in an S3 Bucket using the AWS SDK, implemented Axios to interact with REST API endpoints to perform CRUD operations. Saved fetched data in local storage to minimize API calls and developed a synchronization algorithm to update local storage with latest data.

A simple diagram of how I implemented AWS resources with my project:

<img src="https://cdn.discordapp.com/attachments/864955277521322015/1211021422521090149/sd.png?ex=65ecae96&is=65da3996&hm=a0df0f45ffd55cbb43afaec36d46a1c16fd5e5474c7fb4139b8fb8d016db227c&" alt="Project Logo" width="100%">

### Some Notes

- One key aspect of this project was my goal to limit API calls to S3 because I wanted to stay within the free tier limits, and in my attempt to do so I decided to go with local storage rather than session storage so that API calls wouldn't be made with each new session.

- But in order to have the latest data in local storage and not miss out on any new posts I built a synchronization function to update the local storage with new posts uploaded by users.

- The sync function runs every time the explore component mounts thanks to useEffect hook. It checks for new data that has been created after the data saved in local storage and simply appends new posts to local storage, greatly minimizing S3 API calls.

### Built With

- [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
- [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
- [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)](https://expressjs.com/)
- [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
- [![Amazon AWS](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
