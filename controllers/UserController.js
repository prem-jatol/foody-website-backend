const UserModel = require("../models/UserModel");

class UserController {
  singIn(data) {
    return new Promise(async (res, rej) => {
      try {
        const user = await new UserModel({
          name: data.name,
          email: data.email,
        });
        user
          .save()
          .then(res({ status: 1, user }))
          .catch(rej({ status: 0, msg: "user not created" }));
      } catch (err) {
        rej({status : 0, msg: "internal server error from user controller"})
      }
    });
  }
}

module.exports = UserController;
