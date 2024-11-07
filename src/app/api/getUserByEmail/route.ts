import { NextRequest, NextResponse } from "next/server";
import connect from "../../lib/db/mongoDB";
import User from "../../lib/models/User";

export async function GET(request: NextRequest) {
    const email = request.nextUrl.searchParams.get("email");

  try {
    await connect();
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ exists: true, user });
    } else {
      return NextResponse.json({ exists: false });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error checking user", error }, { status: 500 });
  }
}
