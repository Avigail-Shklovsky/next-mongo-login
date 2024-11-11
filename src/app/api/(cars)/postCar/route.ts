import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongoDB";
import Car from "@/app/lib/models/Car";

export async function POST(request: NextRequest) {
  try {
    console.log("posted");
    await connect();
    const { model, year } = await request.json();

    const existingBook = await Car.findOne({ model });
    if (existingBook) {
      return NextResponse.json(
        { message: "Book with this name already exists" },
        { status: 400 }
      );
    }

    const newCar = new Car({ model, year });
    console.log("Car", newCar);

    await newCar.save();
    console.log("success create");
    return NextResponse.json({
      message: "Car created",
      book: newCar,
      status: 201,
    });
  } catch (error) {
    console.log("error from post Car");
    return NextResponse.json(
      { message: "error creating Car", error },
      { status: 500 }
    );
  }
}

// export default POST;
