const express = require('express');
const router = express.Router();

const Assets = [
  {
    id: 1,
    name: "Printer",
    quantity: 3,
    image: "http://localhost:5000/images/Assets_img/printer.png"
  },
  {
    id: 2,
    name: "Keyboard",
    quantity: 10,
    image: "http://localhost:5000/images/Assets_img/kb.png"
  },
  {
    id: 3,
    name: "Projector",
    quantity: 5,
    image: "http://localhost:5000/images/Assets_img/projector.png"
  },
  {
    id: 4,
    name: "Laptop",
    quantity: 100,
    image: "http://localhost:5000/images/Assets_img/lap.png"
  },
  {
    id: 5,
    name: "Accessories Components",
    quantity: 20,
    image: "http://localhost:5000/images/Assets_img/AC.svg"
  },
  {
    id: 6,
    name: "Router",
    quantity: 7,
    image: "http://localhost:5000/images/Assets_img/roter.png"
  },
  {
    id: 7,
    name: "LAN Cable",
    quantity: 50,
    image: "http://localhost:5000/images/Assets_img/lan.png"
  },
  {
    id: 8,
    name: "Software Licenses",
    quantity: 30,
    image: "http://localhost:5000/images/Assets_img/softwareLicenses.svg"
  },
  {
    id: 9,
    name: "Cloud Asset",
    quantity: 8,
    image: "http://localhost:5000/images/Assets_img/cloud.png"
  },
  {
    id: 10,
    name: "Docking Station",
    quantity: 6,
    image: "http://localhost:5000/images/Assets_img/docking.png"
  }
];

router.get("/", (req, res) => {
  res.json(Assets);
});

module.exports = router;