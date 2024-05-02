import { NextResponse } from 'next/server';
import { getEodLatest, getTickers } from '../../../../services/marketstackApi';

export async function GET(request) {
  // const url = new URL(request.url);

  const tickers = await getTickers();
  console.log({ tickers });
  const symbols = tickers.data.map((ticker) => ticker.symbol).join(',');

  // const searchParams = new URLSearchParams(url.searchParams);
  // const symbols = searchParams.get('symbols');

  const data = await getEodLatest(symbols);

  return NextResponse.json(data, { status: 200 });
}
