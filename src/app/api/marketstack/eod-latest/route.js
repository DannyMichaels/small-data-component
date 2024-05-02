import { NextResponse } from 'next/server';
import { getEodLatest, getTickers } from '../../../../services/marketstackApi';

export async function GET(request) {
  try {
    // const url = new URL(request.url);

    const tickers = await getTickers();
    const symbols = tickers.data.map((ticker) => ticker.symbol).join(',');

    // const searchParams = new URLSearchParams(url.searchParams);
    // const symbols = searchParams.get('symbols');

    const data = await getEodLatest(symbols);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
