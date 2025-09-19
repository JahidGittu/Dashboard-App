import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbconnect";
import UserModel from "@/app/modal/User";
import bcrypt from "bcrypt";

// Define a type for the expected request body
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

    await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    // Use `unknown` instead of `any`, then safely narrow
    const message =
      err instanceof Error ? err.message : "Signup failed";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
