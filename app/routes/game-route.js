const gameController = require("../controllers/game-controller");
const authToken = require("../middlewares/auth-middelwares.js");

module.exports = (app) => {
  /**
   * @swagger
   * /auth/game/score:
   *   post:
   *     tags:
   *       - Game
   *     summary: Save a player's score
   *     security:
   *       - bearerAuth: []
   *     description: Saves the score for the authenticated user.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               score:
   *                 type: integer
   *                 example: 5000
   *             required:
   *               - score
   *     responses:
   *       "201":
   *         description: Score saved successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Score saved successfully!
   *                 data:
   *                   $ref: '#/components/schemas/Score'
   *       "400":
   *         description: Bad request, for example, if the score is not provided.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       "401":
   *         description: Unauthorized, if the token is invalid or not provided.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       "500":
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.post("/api/v1/auth/game/score", [authToken], gameController.saveScore);

  /**
   * @swagger
   * /game/leaderboard:
   *   get:
   *     tags:
   *       - Game
   *     summary: Get the leaderboard
   *     description: Retrieves the top 10 players with the highest scores.
   *     responses:
   *       "200":
   *         description: A list of the top players.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/LeaderboardEntry'
   *       "500":
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.get("/api/v1/game/leaderboard", gameController.getLeaderboard);

  /**
   * @swagger
   * /auth/game/score/sync:
   *   post:
   *     tags:
   *       - Game
   *     summary: Synchronize scores
   *     security:
   *       - bearerAuth: []
   *     description: Synchronizes scores for a player who was not logged in. It saves the highest score if it's greater than the user's current highest score.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               scores:
   *                 type: array
   *                 items:
   *                   type: integer
   *                 example: [100, 250, 1500]
   *             required:
   *               - scores
   *     responses:
   *       "200":
   *         description: Scores synchronized successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Success
   *       "400":
   *         description: Bad request, for example, if the scores are not provided in the correct format.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       "401":
   *         description: Unauthorized, if the token is invalid or not provided.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       "500":
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.post(
    "/api/v1/auth/game/score/sync",
    [authToken],
    gameController.syncScores
  );
};
