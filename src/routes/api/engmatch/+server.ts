import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  const word = url.searchParams.get("word");
  if (!word) {
    return new Response(JSON.stringify({ error: "Missing word" }), { status: 400 });
  }

  try {
    // 1. Call ENG → QWID match API
    const matchRes = await fetch(
      `https://ungwe.net/api/v1/engmatch?tran=${encodeURIComponent(word)}`
    );

    if (!matchRes.ok) {
      return new Response(JSON.stringify({ error: "API error" }), { status: matchRes.status });
    }

    const matchData = await matchRes.json();

    // Extract QWIDs
    const qwids: string[] = matchData?.matches?.flatMap((m: any) => m.qwids).flat(Infinity) ?? [];

    // If no qwids, return empty result
    if (qwids.length === 0) {
      return new Response(JSON.stringify({ results: [] }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. Fetch all wordinfo entries in parallel
    const wordinfoPromises = qwids.map(async (qwid: string) => {
      const r = await fetch(`https://ungwe.net/api/v1/wordinfo?qwid=${encodeURIComponent(qwid)}`);
      if (!r.ok) return null;
      return await r.json();
    });

    const wordinfos = (await Promise.all(wordinfoPromises)).filter(Boolean);

    // 3. Return combined data
    return new Response(JSON.stringify({
      query: word,
      matches: wordinfos
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Network error", detail: String(err) }), {
      status: 500
    });
  }
};
