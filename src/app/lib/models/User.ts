import mongoose, { Model, Schema } from "mongoose";
import UserType from "@/app/types/userType";

const UserSchema: Schema<UserType> = new Schema({
  username: { type: String, required: true },
  email:{ type: String, required: true ,unique:true},
  password:{ type: String, required: true },
});

const User: Model<UserType> =mongoose.models.User||mongoose.model<UserType>('User',UserSchema);

export default User;