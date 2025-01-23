const express = require("express");
const { User } = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const isUserExist = await User.findOne({
      where: { email: req.body.email },
    });
    if (isUserExist) {
      return res
        .status(400)
        .json({ message: "User already exist with this email" });
    }

    const userData = {
      ...req.body,
      role: "user",
      password: bcrypt.hashSync(req.body.password, 10),
    };
    const user = new User(userData);
    await user.save();
    return res.status(200).json({ message: "User has been created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const isUserExist = await User.findOne({
      where: { email: req.body.email },
    });
    if (!isUserExist) {
      return res
        .status(400)
        .json({ message: "User not exist with this email" });
    }
    if (!bcrypt.compareSync(req.body.password, isUserExist.password)) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: isUserExist.id, role: isUserExist.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    return res.json({ message: "User logged in", token, role: isUserExist.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const isUserExists = await User.findOne({ where: { id: req.params.id } });
    if (!isUserExists) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.update(req.body, { where: { id: req.params.id } });
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Coin not found" });
    }
    await user.destroy();
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
