import mongoose, { Model, Schema } from "mongoose";
import CountryType from "@/app/types/countryType";

const CountrySchema: Schema<CountryType> = new Schema({
  name: { type: String, required: true },
  capitalCity: { type: String, required: true },
});

const Country: Model<CountryType> =
  mongoose.models.Country ||
  mongoose.model<CountryType>("Country", CountrySchema);

export default Country;
