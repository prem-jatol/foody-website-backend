const Cryptr = require('cryptr');
const cryptr = new Cryptr("premjatol@email.com");
const sceretKey = "premjatol@email.com"
const jwt = require('jsonwebtoken');

const encryptPassword=(password)=>{
    return cryptr.encrypt(password);
}

const decryptPassword=(password)=>{
    return cryptr.decrypt(password);
}

const createToken = (user_email)=>{
    return jwt.sign(user_email, sceretKey, {expiresIn: "1h"})
}

function verifyToken(token) {
    try{
        return jwt.verify(token, sceretKey)
    }catch (err) {
        return false;
    }
    // user_tokens.get(token);
}

module.exports = {
    encryptPassword, decryptPassword, createToken, verifyToken
}