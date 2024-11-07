import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("mongodb connencted");
  } catch (error) {
    throw new Error("mogo connection failed" + error);
  }
};

export default connect;
