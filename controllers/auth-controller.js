require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");

module.exports.register = async (req, res, next) => {
  const { name, lastname, email, password, confirmPassword } = req.body;
  try {
    //validation
    if (!(name && lastname && email && password && confirmPassword)) {
      return next(new Error("Fulfill all inputs"));
    }
    if (confirmPassword !== password) {
      throw new Error("password not match");
    }
    const hased = await bcrypt.hash(password, 8);
    console.log(hased);

    const data = {
      admin_name: name,
      admin_lastname: lastname,
      admin_email: email,
      admin_password: hased,
    };
    //                                db  / const db
    const rs = await db.admin.create({ data: data });
    console.log(rs);

    res.json({ message: "Register SUCCESSFUL!!!" });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // validation
    if (!(email.trim() && password.trim())) {
      throw new Error("Please Enter your input");
    }
    //find username in db.user
    const admin = await db.admin.findFirstOrThrow({
      where: { admin_email: email },
    });

    //check password
    const pwOK = await bcrypt.compare(password, admin.admin_password);
    if (!pwOK) {
      throw new Error("Invaild login");
    }

    //issue jwt token
    const payload = { id: admin.admin_id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {});
    // console.log(payload)
    console.log(token);
    res.json({ token: token });
  } catch (err) {
    next(err);
  }
};

exports.GETME = (req, res, next) => {
  res.json(req.user);
};

module.exports.student = async (req, res, next) => {
  const {
    name,
    lastname,
    BD,
    address,
    phone,
    email,
    image,
    idParent,
    nameParent,
    lastParent,
    phoneParent,
    statusParent,
    major_id,
    class_id,
  } = req.body;
  try {
    //validation
    if (
      !(
        name &&
        lastname &&
        BD &&
        address &&
        phone &&
        email &&
        image &&
        idParent &&
        nameParent &&
        lastParent &&
        statusParent &&
        major_id &&
        class_id
      )
    ) {
      return next(new Error("Fulfill all inputs"));
    }
    // function fillemail(email) {
    //   if (!email || email.trim() === " ") {
    //     return "null";
    //   } else {
    //     return email;
    //   }
    // }
    // function fillphone(phoneParent) {
    //   if (!phoneParent || phoneParent.trim() === " ") {
    //     return "null";
    //   } else {
    //     return phoneParent;
    //   }
    // }

    const std ={
      // std_id : id,
      std_name: name,
      std_lastname: lastname,
      std_bd: BD,
      std_address: address,
      std_phone: phone,
      std_email: email,
      std_img: image,
      std_parent_identity: idParent,
      std_parent_name: nameParent,
      std_parent_lastname: lastParent,
      std_parent_phone: phoneParent,
      std_parent_status: statusParent,
      major_id: major_id,
      class_id: class_id,
    }
    //                                db  / const db
    const rs =
      await db.$executeRaw`insert into student (std_name,std_lastname,std_bd,std_address,std_phone,std_email,std_img,std_parent_identity,std_parent_name,std_parent_lastname,std_parent_phone,std_parent_status,major_id,class_id) 
    values (${name}, ${lastname}, ${BD}, ${address}, ${phone}, ${email}, ${image}, ${idParent}, ${nameParent}, ${lastParent}, ${phoneParent}, ${statusParent}, ${major_id},${class_id})`;
    console.log(rs);

    res.json({ message: "Register SUCCESSFUL!!!" });
  } catch (err) {
    next(err);
  }
};
