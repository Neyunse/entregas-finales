'use strict';
import "dotenv";

import mongoose from "mongoose";

const db = async () => {
      return await mongoose.connect("mongodb+srv://mxt:EywnTCwknuaeogx4@cluster0.qprgs73.mongodb.net/ecommerce").then(() => console.log('Connected!'));
}

export default db

