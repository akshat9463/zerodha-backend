require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const authRoute = require("./routes/AuthRoute");
const { PositionModel } = require("./models/positionModel");
const { HoldingModel } = require("./models/holdingModel");
const { OrderModel } = require("./models/orderModel");

const app = express();
const port = process.env.PORT || 8080;
const url = process.env.MONGO_URL;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://zerodha-clientside.onrender.com",
      "https://zerodha-dashboard-uu4u.onrender.com",
    ],
    credentials: true,
  })
);

// Routes
app.use("/", authRoute);

app.get("/allHoldings", async (req, res) => {
  const holdings = await HoldingModel.find({});
  res.json(holdings);
});

app.get("/allPositions", async (req, res) => {
  const positions = await PositionModel.find({});
  res.json(positions);
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    const newOrder = new OrderModel({ name, qty, price, mode });
    await newOrder.save();
    res.json({ success: true, message: "Order added" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to save order" });
  }
});

// Connect DB and start server
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(port, () => console.log(`✅ Server running on port ${port}`));
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
