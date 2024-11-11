import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongoDB";
import Book from "@/app/lib/models/Book";

export async function GET(request: NextRequest) {
  try {
    console.log("getting book");
    await connect();

    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("id"); 

    if (!bookId) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 }
      );
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    console.log("success fetch");
    return NextResponse.json({
      message: "book fetched successfully",
      book,
      status: 200,
    });
  } catch (error) {
    console.log("error from get book");
    return NextResponse.json(
      { message: "error fetching book", error },
      { status: 500 }
    );
  }
}
