const jwt = require("jsonwebtoken");
const db = require("../models/db");
require('dotenv').config();


module.exports = async (req, res, next) => {
    try{
        const {authorization} = req.headers;
        if (!authorization) {
          throw new Error("Unauthorized");
        }

        if (!(authorization.startsWith("Bearer"))) {
          throw new Error("Unauthorized");
        }

        const token = authorization.split(" ")[1];
        console.log(req.headers)

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(token);
      
      
        const admin = await db.admin.findFirst({ where: { admin_id: payload.id } });
        delete admin.admin_password;
        console.log(admin)
        req.admin = admin;
        next();
    }catch(err){
        next(err)
    }
 
};
