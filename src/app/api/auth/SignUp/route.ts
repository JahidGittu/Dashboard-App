import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbconnect";
import UserModel from "@/app/modal/User";
import bcrypt from "bcrypt";

interface SignUpBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = (await req.json()) as SignUpBody;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        user: { id: user._id.toString(), name: user.name, email: user.email },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Signup API Error:", err);

    // Always return JSON, never plain text
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
