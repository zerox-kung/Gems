import { NextResponse } from "next/server";
import gems from "../../../../data/gems.json";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const search = searchParams.get("search")?.trim().toLowerCase();

  let result = gems;
  if (type) result = result.filter((gem) => gem.type === type);
  if (search) {
    result = result.filter((gem) =>
      `${gem.name} ${gem.type} ${gem.origin} ${gem.colour}`.toLowerCase().includes(search),
    );
  }

  return NextResponse.json(result);
}
