const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const jwt = require("jsonwebtoken");
app.listen(port, () => {
  console.log("Server is running on port 8000");
});

mongoose
  .connect("mongodb+srv://adim:mypassword@cluster0.b77a5ad.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });

const User = require("./models/user");
const Order = require("./models/order");
const Product = require("./models/Product");

const sendVerificationEmail = async (email, verificationToken) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email service or SMTP details here
    service: "gmail",
    auth: {
      user: "mahmoud.ha.199@gmail.com",
      pass: "txouculbekkelgot",
    },
  });

  // Compose the email message
  const mailOptions = {
    from: "tuquoise.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: https://9cb5-195-142-243-198.ngrok-free.app/verify/${verificationToken}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
// Register a new user
// ... existing imports and setup ...

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      //   console.log("Email already registered:", email); // Debugging statement
      return res.status(400).send({ message: "Email already registered" });
    }

    // Create a new user
    const newUser = new User({ name, email, password });

    // Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Save the user to the database
    await newUser.save();

    // Debugging statement to verify data
    console.log("New User Registered:", newUser);

    // Send verification email to the user
    // Use your preferred email service or library to send the email
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(201).send({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.log("Error during registration:", error); // Debugging statement
    console.error(error);
    res.status(500).json({ message: "Registration failed", error: error });
  }
});

//endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //Find the user witht the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).send({ message: "Invalid verification token" });
    }

    //Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Email Verificatioion Failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

// endPoint to login the user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if the user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    // check if the password is correct
    if (user.password !== password) {
      return res.status(401).send({ message: "Invalid password" });
    }

    // generate token
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      secretKey
    );

    res.status(200).send({ token, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).send({ message: "Login Failed" });
  }
});

app.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.isAdmin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify password, consider using bcrypt
  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate and send token, consider using JWT
  // ...
});

//endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;

    //find the user by the Userid
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //add the new address to the user's addresses array
    user.addresses.push(address);

    //save the updated user in te backend
    await user.save();

    res.status(200).json({ message: "Address created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error addding address" });
  }
});

//endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieveing the addresses" });
  }
});

//endpoint to store all the orders
app.post("/orders", async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //create an array of product objects from the cart Items
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }));

    //create a new Order
    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({ message: "Order created successfully!" });
  } catch (error) {
    console.log("error creating orders...", error);
    res.status(500).json({ message: "Error creating orders" });
  }
});

//get the user profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});

app.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId }).populate("user");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

// Endpoint to update user password
// app.post("/update-password", async (req, res) => {
//   try {
//     const { userId, oldPassword, newPassword } = req.body;

//     console.log("UserID:", userId); // Log user ID
//     console.log("Old Password:", oldPassword); // Log old password from request
//     console.log("new Password:", newPassword); // Log old password from request

//     if (!oldPassword || !newPassword) {
//       return res.status(400).send({ message: "Missing password fields" });
//     }

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }
//     console.log("user password", user.password); // Log old password from request
//     const isMatch = await bcrypt.compare(oldPassword, user.password);
//     console.log("is Match", isMatch);
//     console.log(oldPassword,user.password);

//     if (!isMatch) {
//       return res.status(401).send({ message: "Invalid old password" });
//     }

//     await user.save();

//     res.send({ message: "Password updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Error updating password", error: error });
//   }
// });

app.put("/update-password", async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Directly compare the old password with the stored password
    if (oldPassword !== user.password) {
      return res.status(401).send({ message: "Invalid old password" });
    }

    // Update the password (Consider hashing the new password here)
    user.password = newPassword;
    await user.save();

    res.send({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating password" });
  }
});

// app.get("/api/users", async (req, res) => {
//   // Authentication and authorization logic here
//   if (!isAdmin(req.user)) {
//     return res.status(403).send("Access denied");
//   }

//   const users = await User.find(); // Fetch users from the database
//   res.json(users);
// });

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/products", async (req, res) => {
  try {
    const product = await Product.find({});
    // console.log("productId", productId);
    // if (!product) {
    //   return res.status(404).send({ message: "Product not found" });
    // }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving product", error: error });
  }
});
app.get("/products/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    // console.log("productId", productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving product", error: error });
  }
});

app.put("/products/:productId", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true } // returns the updated document
    );
    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send({ message: "Error updating product" });
  }
});

app.delete("/products/:productId", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting product" });
  }
});
