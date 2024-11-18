import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongoDB";
import Book from "@/app/lib/models/Book";

export async function PUT(request: NextRequest) {
  try {
    console.log("sent to update");
    await connect();
    
    const { _id, name, author } = await request.json();

    const existingBook = await Book.findById(_id);
    if (!existingBook) {
      return NextResponse.json(
        { message: "Book not found" },
        { status: 404 }
      );
    }

    if (name) existingBook.name = name;
    if (author) existingBook.author = author;

    await existingBook.save();

    console.log("book updated");

    return NextResponse.json({
      message: "book updated",
      book: existingBook,
      status: 200,
    });
  } catch (error) {
    console.log("error from put book", error);
    return NextResponse.json(
      { message: "error updating book", error },
      { status: 500 }
    );
  }
}
