import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./main.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Share from "./pages/Share.jsx";

const cardData = [
  {
    id: 1,
    imageUrl: 'https://theinnisherald.com/wp-content/uploads/2019/10/Bamboo-Garden-1170x694.jpg',
    name: 'UofT Bamboo Garden',
    location: '4200 Yonge St, North York, ON M2P 1N9',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ',
  },
  {
    id: 2,
    imageUrl: 'https://cdnarchitect.s3.ca-central-1.amazonaws.com/wp-content/uploads/2015/02/1003493892-1003505884.jpg',
    name: 'Reference Library',
    location: '12 Percy St, Toronto, ON M5A 3M8',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ',
  },
  {
    id: 3,
    imageUrl: 'https://cdn.discordapp.com/attachments/726228822638198855/1100476368908722196/9EXcQ5vy8AZ_T1GOgVLVtozq58h5JX4ySf88gV9KCih4xcKaQI-auaAyQDEegNFng8EIj9fqfEO1LMOQP0Il8PNwKdJKwc41oHRSWEC9j7azyQwcJSXWXWwIuDyih9179uBLHgnF5gA9MaV_Bn9k-DCKfosFWFk0GR4tuC-9aXA05v0vwWW6SYD8JegG5RZR7HuwpA2EXP-mZ3rEJEA9nIox1uxOaUAiLOgHVK5STiHYhTsR0MXbIYj8p6wjkr0-h9S2YtNjtPPayy_MJpTtN5AY8vF74Nh2Oz-eNZjiWB9tyQo4zSWtK-_SOc1VlN2-5CqUaTagr2VXbwhWVSHA1WkeqDXOUIn0QV6dxZH6a9ggqolM6XmkB-devuSVdq7ckPEr60jMRufbNMQ6s-ZPKtc0oVXUMoU_PzQFhTjBosGCPUO-nV5HvIxpfLh5lGXwZq1fQFwiJzvmcTCOVniJ-Ea773ynUNI_VMO1lX0HFwflSsKQtCiUxghdOWGI..png',
    name: 'Don Valley Trail',
    location: '4200 Yonge St, North York, ON M2P 1N9',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ',
  },
  {
    id: 4,
    imageUrl: 'https://cdn.discordapp.com/attachments/864955277521322015/1144448775037923439/500.png',
    name: 'Dundas Peak',
    location: 'Harvest Rd, Dundas, ON L9H 5K7',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ',
  }, 
  {
    id: 5,
    imageUrl: 'https://cdn.discordapp.com/attachments/1085333537227546655/1108503798424547388/PXL_20230517_204707150.MP.jpg',
    name: 'Percy Park',
    location: '12 Percy St, Toronto, ON M5A 3M8',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ',
  },
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Navbar />
        <div className="wrapper">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore cardData={cardData} />} />
              <Route path="/share" element={<Share />} />
          </Routes>
          <Footer />
        </div>
    </BrowserRouter>
  </React.StrictMode>
);