import { Router } from "express";
import Database from "../database";
import Responses from "../utils/response";
import { getCodeFakeScore } from "../utils/helpers";

const router = Router();

router.post("/submission", async (req, res) => {
    const { groupId } = req.body;
    try {
        const foundGroup = await Database.Group.findById(groupId);
        if (!foundGroup) {
            return Responses.error(res, "Group not found");
        }

        const alreadySubmitted = await Database.Submission.findOne({
            group: groupId
        });

        if (alreadySubmitted) {
            return Responses.error(res, "You already submmited the code", 400, alreadySubmitted);
        }
        const codeScore = getCodeFakeScore();
        const sumbit = Database.Submission.create({
            score: codeScore,
            group: groupId,
            time: new Date(),
            codeLink: "http://localhost"
        });
        return Responses.normal(res, "Code Submitted Successfully", sumbit);
    } catch (err) {
        return Responses.error(res, "unknown errro occurred", 500);
    }
});

router.get("/leaderboard", async (_, res) => {
    try {
        const submissions = await Database.Submission.find().populate({
            path: "group",
            model: "Group",
            populate: {
              path: "members",
              model: "User",
              select: ["name", "id", "email"]
            }
        });
        return Responses.normal(res, "Leaderboard", submissions);
    } catch (err) {
        return Responses.error(res, "unknown errro occurred", 500);
    }
});

// for testing only
router.get("/reset", async (_, res) => {
    try {
        await Promise.allSettled([
            Database.User.remove({}),
            Database.Submission.remove({}),
            Database.Group.remove({})
        ]);
        return Responses.normal(res, "Removed");
    } catch (err) {
        return Responses.error(res, "unknown errro occurred", 500);
    }
});

// for testing only
router.get("/insert", async (_, res) => {
    try {
        return Responses.normal(res, "Added", await Database.initFakeData());
    } catch (err) {
        return Responses.error(res, "unknown errro occurred", 500);
    }
});

// for testing only
router.get("/info", async (_, res) => {
    try {
        const data = await Promise.allSettled([
            Database.User.find().select(["name", "email", "id"]).lean(),
            Database.Group.find().lean()
        ]);
        return Responses.normal(res, "Added", data);
    } catch (err) {
        return Responses.error(res, "unknown errro occurred", 500);
    }
});

export default router;