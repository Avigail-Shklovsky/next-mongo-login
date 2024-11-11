import mongoose, { Model, Schema } from "mongoose";
import BookType from "@/app/types/bookType";

const BookSchema: Schema<BookType> = new Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
});

const Book: Model<BookType> =
  mongoose.models.Book || mongoose.model<BookType>("Book", BookSchema);

export default Book;
