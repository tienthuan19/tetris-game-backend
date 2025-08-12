const accountController = require("../controllers/account-controller");
const authToken = require("../middlewares/auth-middelwares.js");

module.exports = (app) => {
  /**
   * @swagger
   * /accounts/register:
   *   post:
   *     tags:
   *       - Accounts
   *     summary: Register a new account
   *     description: Creates a new user account.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 example: newuser
   *               password:
   *                 type: string
   *                 example: password123
   *             required:
   *               - username
   *               - password
   *     responses:
   *       "201":
   *         description: Account created successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Register success!
   *                 data:
   *                   $ref: '#/components/schemas/Account'
   *       "400":
   *         description: Bad request, for example, if the username already exists.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.post("/api/v1/accounts/register", accountController.register);

  /**
   * @swagger
   * /accounts/login:
   *   post:
   *     tags:
   *       - Accounts
   *     summary: Login to an account
   *     description: Authenticates a user and returns a JWT token.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 example: player1
   *               password:
   *                 type: string
   *                 example: password123
   *             required:
   *               - username
   *               - password
   *     responses:
   *       "200":
   *         description: Login successful.
   *         headers:
   *           Authorization:
   *             description: "The JWT token, with 'Bearer ' prefix."
   *             schema:
   *               type: string
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Login successful
   *                 token:
   *                   type: string
   *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *                 user:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       example: 1
   *                     username:
   *                       type: string
   *                       example: player1
   *       "401":
   *         description: Unauthorized, for example, if the password is wrong or the user does not exist.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.post("/api/v1/accounts/login", accountController.login);
};
