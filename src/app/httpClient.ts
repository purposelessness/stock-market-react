import { Observable, from } from 'rxjs';
import { StockImprint } from '../features/charts/stockImprint';

const BASE_URL = 'http://localhost:3000';

const STOCKS_URL = `${BASE_URL}/stocks`;
const GET_STOCKS_DETAILS_URL = `${STOCKS_URL}/details`;

const CONTROLLER_URL = `${BASE_URL}/controller`;
const START_CLOCK_URL = `${CONTROLLER_URL}/start-clock`;
const STOP_CLOCK_URL = `${CONTROLLER_URL}/stop-clock`;
const GET_DATE_URL = `${CONTROLLER_URL}/date`;

interface GetDetailsResponse {
  readonly id: number;
  readonly name: string;
  readonly prices: { date: string; price: number }[];
  readonly quantity: number;
  readonly enabled: boolean;
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

export async function startClock(): Promise<void> {
  await fetch(START_CLOCK_URL, { method: 'POST' });
}

export async function stopClock(): Promise<void> {
  await fetch(STOP_CLOCK_URL, { method: 'POST' });
}

export function getDate(): Observable<string> {
  return from(fetch(GET_DATE_URL)
    .then(response => response.json())
    .then(data => new Date(data).toISOString().split('T')[0] as string));
}