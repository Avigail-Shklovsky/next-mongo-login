import { NextRequest, NextResponse } from "next/server";
import connect from "../../lib/db/mongoDB";
import User from "../../lib/models/User";

export async function POST(request: NextRequest) {
  try {
    console.log("posted");
    await connect();
    const { username, email, password } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email or username already exists" },
        { status: 400 }
      );
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    console.log("success create");
    return NextResponse.json({
      message: "user created",
      user: newUser,
      status: 201,
    });
  } catch (error) {
    console.log("error from post user");
    return NextResponse.json(
      { message: "error creating user", error },
      { status: 500 }
    );
  }
}

// export default POST;
