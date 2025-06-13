const UserModel = require("../models/UserModel");
const {
  encryptPassword,
  decryptPassword,
  createToken,
  verifyToken,
} = require("../helper");

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

  login(data) {
    return new Promise(async (res, rej) => {
      try {
        const { email, password } = data;
       const user = await UserModel.findOne({ email: email });

        if (!user) return rej({status : 0, msg: "your email not correct"});
        const decryptPass = await decryptPassword(user.password)
        if(decryptPass === password){
          const token = await createToken({email: email})

          res({status : 1, msg: "user log in", token, user})
        }else{
          rej({status : 0, msg: "your password not correct"});
        }
        
      } catch (err) {
        console.log("login controller", err.message);
        rej({ status: 0, msg: "inernal server error" });
      }
    });
  }

  profile(id){
    return new Promise(
      async (res, rej)=>{
        const user = await UserModel.findById(id);
        res({status: 1, user})
        
      }
    )
  }
}

module.exports = UserController;
