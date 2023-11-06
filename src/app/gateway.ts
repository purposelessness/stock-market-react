import { io } from 'socket.io-client';

const STOCKS_URL = 'http://localhost:3000/stocks';
const CONTROLLER_URL = 'http://localhost:3000/controller';

const stocksSocket = io(STOCKS_URL);
const controllerSocket = io(CONTROLLER_URL);