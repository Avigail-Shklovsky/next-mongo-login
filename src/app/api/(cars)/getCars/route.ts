import { NextResponse } from "next/server";
import connect from "@/app/lib/db/mongoDB";
import Car from "@/app/lib/models/Car";

export async function GET() {
  try {
    console.log("getting Cars");
    await connect();

    const cars = await Car.find();

    if (!cars || cars.length === 0) {
      return NextResponse.json({ message: "No cars found" }, { status: 404 });
    }

    console.log("success fetch");
    return NextResponse.json({
      message: "cars fetched successfully",
      cars,
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
