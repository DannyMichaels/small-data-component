import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);

    const symbols = searchParams.get('symbols').split(',');

    const data = await Promise.all(
      symbols.map(async (symbol) => {
        return await yahooFinance.quote(symbol);
      })
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
