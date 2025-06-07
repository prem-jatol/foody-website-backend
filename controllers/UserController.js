class UserController{
    singIn(data){
        return new Promise(
            (res, rej)=>{
                try{
                    const user = UserModel({
                        name : "prem jatol",
                        email: "prem@email.com"
                    })
                } catch (err){

                }
            }
        )
    }
}