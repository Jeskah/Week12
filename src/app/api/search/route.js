import { search } from "@/utils/queries";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.trim().length === 0) {
    return Response.json({ results: [] });
  }

  const results = await search(query.trim());
  return Response.json({ results });
}
