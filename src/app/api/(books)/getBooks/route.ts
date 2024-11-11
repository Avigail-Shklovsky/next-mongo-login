import { NextResponse } from "next/server";
import connect from "@/app/lib/db/mongoDB";
import Book from "@/app/lib/models/Book";

export async function GET() {
  try {
    console.log("getting books");
    await connect();

    const books = await Book.find();

    if (!books || books.length === 0) {
      return NextResponse.json(
        { message: "No books found" },
        { status: 404 }
      );
    }

    console.log("success fetch");
    return NextResponse.json({
      message: "books fetched successfully",
      books,
      status: 200,
    });
  } catch (error) {
    console.log("error from get books");
    return NextResponse.json(
      { message: "error fetching books", error },
      { status: 500 }
    );
  }
}
