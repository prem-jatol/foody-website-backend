const express = require('express');

const UserRouter = express.Router();

UserRouter.get(
    "/",
    (req, res)=>{
        const result = new UserController().signIn(req.body)
        result.then().catch()
    }
)

module.exports = UserRouter;