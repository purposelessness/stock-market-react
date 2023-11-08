import React from 'react';

import { controllerSocket } from '../../app/gateway';
import { startClock, stopClock } from '../../app/httpClient';

function setDate(dateElement: any | null) {
  if (dateElement === null) {
    return;
  }
  console.log(dateElement.value);
  controllerSocket.emit('setDate', dateElement.value);
}

async function onStartClock() {
  await startClock();
}

async function onStopClock() {
  await stopClock();
}

export function Settings() {
  return (
    <div>
      <label>
        Date:
      </label>
      <input type="text" id="date" defaultValue="2020-10-10" />
      <button onClick={() => setDate(document.getElementById("date"))}>Set</button>
      <br/>
      <button onClick={() => onStartClock()}>Start Clock</button>
      <br/>
      <button onClick={() => onStopClock()}>Stop Clock</button>
    </div>
  )
}