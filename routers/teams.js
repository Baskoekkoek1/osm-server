const { Router } = require("express");
const Team = require("../models").team;
const Match = require("../models").match;

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

router.get("/results", async (req, res) => {
  try {
    const allResults = await Match.findAll();
    return res.status(200).send(allResults);
  } catch (error) {
    console.log(error);
  }
});

router.put("/reset", async (req, res) => {
  try {
    const allTeams = await Team.findAll();
    const newRanking = allTeams.map(async (team) => {
      await team.update({
        played: 0,
        won: 0,
        lost: 0,
        draw: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0,
      });
    });
    const allMatches = await Match.findAll();
    allMatches.forEach(async (match) => {
      await match.destroy();
    });

    res.status(200).send(allTeams);
  } catch (error) {
    console.log(error);
  }
});

router.put("/match", async (req, res) => {
  // console.log(req.body);
  try {
    const { homeTeam, awayTeam, homeScore, awayScore } = req.body.matchResult;

    const thisMatch = await Match.create({
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
    });

    const thisHomeTeam = await Team.findOne({
      where: {
        name: homeTeam.name,
      },
    });
    const thisAwayTeam = await Team.findOne({
      where: {
        name: awayTeam.name,
      },
    });
    console.log("thisHomeTeam", thisHomeTeam);
    if (homeScore > awayScore) {
      await thisHomeTeam.update({
        played: thisHomeTeam.played + 1,
        won: thisHomeTeam.won + 1,
        points: thisHomeTeam.points + 3,
        goalsFor: thisHomeTeam.goalsFor + homeScore,
        goalsAgainst: thisHomeTeam.goalsAgainst + awayScore,
      });
      await thisAwayTeam.update({
        played: thisAwayTeam.played + 1,
        lost: thisAwayTeam.lost + 1,
        goalsFor: thisAwayTeam.goalsFor + awayScore,
        goalsAgainst: thisAwayTeam.goalsAgainst + homeScore,
      });
    } else if (homeScore < awayScore) {
      await thisAwayTeam.update({
        played: thisAwayTeam.played + 1,
        won: thisAwayTeam.won + 1,
        points: thisAwayTeam.points + 3,
        goalsFor: thisAwayTeam.goalsFor + awayScore,
        goalsAgainst: thisAwayTeam.goalsAgainst + homeScore,
      });
      await thisHomeTeam.update({
        played: thisHomeTeam.played + 1,
        lost: thisHomeTeam.lost + 1,
        goalsFor: thisHomeTeam.goalsFor + homeScore,
        goalsAgainst: thisHomeTeam.goalsAgainst + awayScore,
      });
    } else {
      await thisHomeTeam.update({
        played: thisHomeTeam.played + 1,
        draw: thisHomeTeam.draw + 1,
        points: thisHomeTeam.points + 1,
        goalsFor: thisHomeTeam.goalsFor + homeScore,
        goalsAgainst: thisHomeTeam.goalsAgainst + awayScore,
      });
      await thisAwayTeam.update({
        played: thisAwayTeam.played + 1,
        draw: thisAwayTeam.lost + 1,
        points: thisAwayTeam.points + 1,
        goalsFor: thisAwayTeam.goalsFor + awayScore,
        goalsAgainst: thisAwayTeam.goalsAgainst + homeScore,
      });
    }
    const allTeams = await Team.findAll();
    const sendResponse = {
      allTeams,
      thisMatch,
    };
    res.status(200).send(sendResponse);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
