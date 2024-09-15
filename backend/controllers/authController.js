import { comparePassword, hashPassword } from "../helper/authHelper.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";


//Register Routes
export const registerController = async (req, res) => {
  try {
    const { name, number, email, password, cpassword } = req.body;
    console.log(req.body);

    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!number) {
      return res.send({ message: "Number  is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!cpassword) {
      return res.send({ message: "Confirm Password is Required" });
    }
    if (cpassword != password) {
      return res.send({ message: "Please Enter the currect password" });
    }

    //check user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        message: false,
        message: "Already register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      number,
      email,
      password: hashedPassword,
    }).save();
    res.status(200).send({
      success: true,
      message: "User Register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration ",
      error,
    });
  }
};
//POST Routes
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// getUsersController
export const getUsersController = async (req, res) => {
  try {
    const users = await userModel.find({}).limit(12).sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      counTotal: users.length,
      message: "All Users ",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error,
    });
  }
};

//deleteProductController
export const deleteUsersController = async (req, res) => {
  try {
    console.log("hello delete");
    const { id } = req.params;
    console.log(id);
    await userModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Users",
      error,
    });
  }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword); //code to in Hash  form
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

// User order
export const getOrdersController = async (req, res) => {
  try {
    console.log("hello order");
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "mainImages")
      .populate("buyer", "name");
    console.log(orders);
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//Admin orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "mainImages")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });

    console.log(orders);

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};

export const addressController = async (req, res) => {
  try {
    console.log("hello order");
    console.log(req.body);
    const {
      name,
      lname,
      userEmail,
      country,
      state,
      city,
      address,
      pinCode,
      number,
    } = req.body;

    const adminEmail = process.env.EMAIL; // Admin email from environment

    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!lname) {
      return res.send({ message: "lname is required" });
    }
    if (!userEmail) {
      return res.send({ message: "Email is required" });
    }
    if (!country) {
      return res.send({ message: "Country is required" });
    }
    if (!state) {
      return res.send({ message: "State is required" });
    }
    if (!city) {
      return res.send({ message: "City is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!pinCode) {
      return res.send({ message: "Pincode is required" });
    }
    if (!number) {
      return res.send({ message: "Number is required" });
    }

    const order = await orderModel({
      name,
      lname,
      userEmail,
      country,
      state,
      city,
      address,
      pinCode,
      number,
    }).save();

    let config = {
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    };

    let transporter = nodemailer.createTransport(config);
    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Mailgen",
        link: "https://mailgen.js/",
      },
    });

    let response = {
      body: {
        name: "BGS Energy",
        intro: "Your information has arrived!",
        table: {
          data: [
            {
              item: "BGS Supplier utility",
              description: "BGS for gas, water & utility supplier",
              price: "Get Quote",
            },
          ],
        },
        outro: "Looking forward to do more business",
      },
    };
    let mail = MailGenerator.generate(response);


    let message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Get quote",
      html: mail,
    };
    let adminMessage = {
      from: process.env.EMAIL,
      to: adminEmail,
      subject: "New Quote Request",
      html: mail,
    };

    transporter
      .sendMail(message)
      .then(() => {
        return transporter.sendMail(adminMessage);
      })

      .then(() => {
        return res.status(201).json({
          msg: " A New Email received Successfully",
        });
      });

    res.status(200).send({
      success: true,
      message: "Address Submitted Successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in order Address",
      error,
    });
  }
};

export const google = async (req, res) => {
  console.log("h");
  const { email, name, googlePhotoUrl } = req.body;
  console.log(req.body);
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new userModel({
        name:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unauthorized access",
      error,
    });
  }
};
