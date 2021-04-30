const { Router } = require("express");
const Team = require("../models").team;

const router = new Router();

router.get("/test", (req, res) => {
  res.send("This is the Teams Router, test endpoint.");
});

router.get("/all", async (req, res) => {
  try {
    const allTeams = await Team.findAll();
    return res.status(200).send(allTeams);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
