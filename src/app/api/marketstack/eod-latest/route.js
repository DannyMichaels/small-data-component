import { NextResponse } from 'next/server';
import { getEodLatest } from '../../../../services/marketstackApi';

export async function GET(request) {
  const url = new URL(request.url);

  const searchParams = new URLSearchParams(url.searchParams);

  const symbols = searchParams.get('symbols');

  const data = await getEodLatest(symbols);
  // Do whatever you want
  return NextResponse.json(data, { status: 200 });
}
