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

        if (!user) return rej({ status: 0, msg: "your email not correct" });
        const decryptPass = await decryptPassword(user.password);
        if (decryptPass === password) {
          const token = await createToken({ email: email });

          res({ status: 1, msg: "user log in", token, user });
        } else {
          rej({ status: 0, msg: "your password not correct" });
        }
      } catch (err) {
        console.log("login controller", err.message);
        rej({ status: 0, msg: "inernal server error" });
      }
    });
  }

  profile(id) {
    return new Promise(async (res, rej) => {
      try {
        const user = await UserModel.findById(id);
        res({ status: 1, user });
      } catch (error) {
        console.log("error form usr ctr", error.message);
      }
    });
  }

  getAllUsers() {
    return new Promise(async (res, rej) => {
      const users = await UserModel.find();
      res({ status: 1, users });
    });
  }

  editUser(id, image) {
    return new Promise(async (res, rej) => {
      try {
        // if (image == null) {
        //     UserModel.updateOne({ _id: id }, {
        //         name: data.name,
        //         lastName: data.lastName,
        //         email: data.email,
        //         contact: data.contact,
        //         gender: data.gender,
        //         bio: data.bio,
        //         address: JSON.parse(data.address)
        //     })
        //         .then(
        //             (success) => {
        //                 res({
        //                     msg: "user data updated",
        //                     status: 1
        //                 })
        //             }
        //         ).catch(
        //             (error) => {
        //                 rej({
        //                     msg: "Unable to update",
        //                     status: 0
        //                 })
        //             }
        //         )
        // } else {
        //     const newImage = new Date().getTime() + Math.floor(Math.random() * 1000) + image.name;
        //     const destination = "./public/images/user/" + newImage;
        //     image.mv(
        //         destination,
        //         (err) => {
        //             if (!err) {
        //                 UserModel.updateOne({ _id: user_id }, {
        //                     name: data.name,
        //                     lastName: data.lastName,
        //                     email: data.email,
        //                     contact: data.contact,
        //                     bio: data.bio,
        //                     gender: data.gender,
        //                     address: JSON.parse(data.address),
        //                     image: newImage
        //                 })
        //                     .then(
        //                         (success) => {
        //                             console.log(data.oldImage)
        //                             unlinkSync(`./public/images/user/${data.oldImage}`);
        //                             res({
        //                                 msg: "Data Updated with image",
        //                                 status: 1,
        //                                 userImagePath: "/images/category/"
        //                             })
        //                         }
        //                     ).catch(
        //                         (error) => {
        //                             res({
        //                                 msg: "Unable to upload with image",
        //                                 status: 0
        //                             })
        //                         }
        //                     )
        //             } else {
        //                 rej({
        //                     msg: "error to upload image",
        //                     staus: 0
        //                 })
        //             }
        //         }
        //     )
        // }

        if (image) {
          const newImage =
            new Date().getTime() +
            Math.floor(Math.random() * 1000) +
            image.name;
          const destination = "./public/images/user/" + newImage;
          image.mv(destination, (err) => {
            if (!err) {
              UserModel.updateOne(
                { _id: id },
                {
                  image: newImage,
                }
              )
                .then((success) => {
                  res({
                    msg: "Data Updated with image",
                    status: 1,
                    userImagePath: "/images/user/",
                  });
                })
                .catch((error) => {
                  res({
                    msg: "Unable to upload with image",
                    status: 0,
                  });
                });
            } else {
              rej({
                msg: "error to upload image",
                staus: 0,
              });
            }
          });
        } else {
          rej({
            msg: "please send file",
            status: 0,
          });
        }
      } catch (err) {
        rej({
          msg: "Internal Server error of mine",
          status: 0,
        });
      }
    });
  }
}

module.exports = UserController;
