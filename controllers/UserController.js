const UserModel = require("../models/UserModel");
const { encryptPassword, decryptPassword, createToken, verifyToken } = require("../helper");

class UserController {
  singIn(data) {
    return new Promise(async (res, rej) => {
      try {
        const userExist = await UserModel.findOne({ email: data.email });

        if (userExist) {
          rej({ status: 0, msg: "user already created" });
        } else {
          const encryptPass = await encryptPassword(data.password);
          const user = await new UserModel({
            name: data.name,
            email: data.email,
            password: encryptPass,
          });
          const token = await createToken(user.toObject());
          user
            .save()
            .then(res({ status: 1, user, token }))

            .catch(rej({ status: 0, msg: "user not created" }));
        }
      } catch (err) {
        rej({ status: 0, msg: "internal server error from user controller" });
      }
    });
  }

  login(toke) {
    return new Promise(async(res, rej) => {
      const result = await verifyToken(token);
      console.log("login api", result)
      
    });
  }
}

module.exports = UserController;
