const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = require("../Model/user");
const article = require("../Controllers/article");
const { authorizations } = require("../auth/auth")
const route = express.Router();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

route.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const newUser = user.signup(fullname, email, password);

    //const token = createToken(newUser._id);

    res.status(200).json({ fullname,email});
    
  } catch (error) {
    res.status(400).json({ error: error });
  }

});

route.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userExist = await user.findOne({ email: email });

  if (!userExist) {
    return res.status(404).send("User not found with this email");
  }

  const checkPassword = await bcrypt.compare(password, userExist.password);

  if (!email || !password) {
    throw Error("All fields must be filled!");
    return;
  }

  if (!checkPassword) {
    return res.status(403).send("Password incorrect");
  }

  const token = createToken(userExist._id);

  res.status(200).json({ email, token });

});


route.post("/follow/:id", authorizations, async (req, res) => {
  const author = await user.findById({ _id: req.params.id });
  const action = author.follower({
    author: req.user._id,
  });

  res.status(201).json({msg: "You followed"});
});

route.get("/user/:id", authorizations, async (req, res) => {
  const person = await user.findById({ _id: req.params.id });
  if (!person) {
    return res.status(404).send("User not found");
  }

  const authIFollow = await user.aggregate([
    {
      $match: { followers: { $elemMatch: { author: person._id } } },
    },
  ]);

  person.following = [];
  authIFollow.forEach((user) => {
    person.following.push({ author: user._id });
  });
  person.save();

  res.status(200).json(person);
});


route.post("/logout", authorizations, async (req, res) => {
const authHeader = req.headers['authorization']
jwt.sign(authHeader, "", {expiresIn : 1}, (logout, err)=>{
  if(logout){
    return res.send('Logout successful')
  } else {
    res.send({msg: err})
  }
})

});


module.exports = route

