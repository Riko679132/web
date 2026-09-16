import { NextResponse } from "next/server";
import { getCounter, setCounter } from "@/lib/counter-store";

// GET /api/counter  ——  读取当前数字
export async function GET() {
  try {
    const value = await getCounter();
    return NextResponse.json({ value });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read counter" },
      { status: 500 }
    );
  }
}

// POST /api/counter  ——  更新数字
// 请求体: { value: number }
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const value = Number(body.value);

    if (Number.isNaN(value)) {
      return NextResponse.json(
        { error: "Invalid number" },
        { status: 400 }
      );
    }

    const newValue = await setCounter(value);
    return NextResponse.json({ value: newValue, success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update counter" },
      { status: 500 }
    );
  }
}
