import { Observable, from } from 'rxjs';
import { StockImprint } from '../features/charts/stockImprint';

const BASE_URL = 'http://localhost:3000';

const STOCKS_URL = `${BASE_URL}/stocks`;
const GET_STOCKS_DETAILS_URL = `${STOCKS_URL}/details`;

interface GetDetailsResponse {
  readonly id: number;
  readonly name: string;
  readonly prices: { date: string; price: number }[];
  readonly quantity: number;
}

interface GetImprintsResponse {
  date: string,
  stockImprint: StockImprint | null,
}

export function getStocks(): Observable<GetDetailsResponse[]> {
  return from(fetch(GET_STOCKS_DETAILS_URL)
    .then(response => response.json())
    .then(data => data as GetDetailsResponse[]));
}

export function getStockImprints(): Observable<GetImprintsResponse[]> {
  return from(fetch(STOCKS_URL)
    .then(response => response.json())
    .then(data => data as GetImprintsResponse[]));
}