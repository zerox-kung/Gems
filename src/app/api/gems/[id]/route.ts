import { NextResponse } from "next/server";
import gems from "../../../../../data/gems.json";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const gem = gems.find((item) => item.id === Number(id));

  if (!gem) {
    return NextResponse.json({ error: "Gem not found" }, { status: 404 });
  }

  return NextResponse.json(gem);
}
