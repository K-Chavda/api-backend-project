import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DATABASE_URI}/${DB_NAME}`
    );

    console.log(
      "DB Connection Established on Host: ",
      connectionInstance.connection.host
    );
  } catch (err) {
    console.log("DB Connection Failed. ERROR: ", err);
  }
};

export default dbConnect;
