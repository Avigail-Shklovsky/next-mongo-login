import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongoDB";
import Book from "@/app/lib/models/Book";

export async function POST(request: NextRequest) {
  try {
    console.log("posted");
    await connect();
    const { name, author } = await request.json();

    const existingBook = await Book.findOne({ name });
    if (existingBook) {
      return NextResponse.json(
        { message: "Book with this name already exists" },
        { status: 400 }
      );
    }

    const newBook = new Book({ name, author });
    console.log("book", newBook);

    await newBook.save();
    console.log("success create");
    return NextResponse.json({
      message: "book created",
      book: newBook,
      status: 201,
    });
  } catch (error) {
    console.log("error from post book");
    return NextResponse.json(
      { message: "error creating book", error },
      { status: 500 }
    );
  }
}

// export default POST;
