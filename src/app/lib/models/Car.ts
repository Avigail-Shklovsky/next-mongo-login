import mongoose, { Model, Schema } from "mongoose";
import CarType from "@/app/types/carType";

const CarSchema: Schema<CarType> = new Schema({
  model: { type: String, required: true },
  year:{ type: String, required: true },
});

const Car: Model<CarType> =mongoose.models.Car||mongoose.model<CarType>('Car',CarSchema);

export default Car;