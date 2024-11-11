import { NextResponse } from "next/server";
import connect from "@/app/lib/db/mongoDB";
import Country from "@/app/lib/models/Country";

export async function GET() {
  try {
    console.log("getting Country");
    await connect();

    const countrys = await Country.find();

    if (!countrys || countrys.length === 0) {
      return NextResponse.json(
        { message: "No countrys found" },
        { status: 404 }
      );
    }

    console.log("success fetch");
    return NextResponse.json({
      message: "countrys fetched successfully",
      countrys,
      status: 200,
    });
  } catch (error) {
    console.log("error from get countrys");
    return NextResponse.json(
      { message: "error fetching countrys", error },
      { status: 500 }
    );
  }
}
