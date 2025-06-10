const UserModel = require("../models/UserModel");
const {encryptPassword, decryptPassword} = require('../helper');

class UserController {
  singIn(data) {
    return new Promise(async (res, rej) => {
      try {
        const userExist = await UserModel.findOne({ email: data.email });
        
        if (userExist) {          
          rej({ status: 0, msg: "user already created" })
        } else {
          const encryptPass = await encryptPassword(data.password)
          const user = await new UserModel({
            name: data.name,
            email: data.email,
            password: encryptPass
          });
          user
            .save()
            .then(res({ status: 1, user }))
            .catch(rej({ status: 0, msg: "user not created" }));
        }
      } catch (err) {
        rej({ status: 0, msg: "internal server error from user controller" });
      }
    });
  }
}

module.exports = UserController;
