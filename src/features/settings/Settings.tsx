import React from 'react';

import { controllerSocket } from '../../app/gateway';
import { setDelay, startClock, stopClock } from '../../app/httpClient';

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

async function onSetDelay(delayElement: any | null) {
  if (delayElement === null) {
    return;
  }
  console.log(delayElement.value);
  await setDelay(delayElement.value);
}

export function Settings() {
  return (
    <div>
      <label>
        Delay:
      </label>
      <input type="text" id="delay" defaultValue="1000" />
      <button onClick={() => onSetDelay(document.getElementById("delay"))}>Set</button>
      <br/>
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