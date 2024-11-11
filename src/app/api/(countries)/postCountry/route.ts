import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongoDB";
import Country from "@/app/lib/models/Country";

export async function POST(request: NextRequest) {
  try {
    console.log("posted");
    await connect();
    const { name, capitalCity } = await request.json();

    const existingCountry = await Country.findOne({ name });
    if (existingCountry) {
      return NextResponse.json(
        { message: "Country with this name already exists" },
        { status: 400 }
      );
    }

    const newCountry = new Country({ name, capitalCity });
    console.log("Country", newCountry);

    await newCountry.save();
    console.log("success create");
    return NextResponse.json({
      message: "Country created",
      Country: newCountry,
      status: 201,
    });
  } catch (error) {
    console.log("error from post Country");
    return NextResponse.json(
      { message: "error creating Country", error },
      { status: 500 }
    );
  }
}

// export default POST;
