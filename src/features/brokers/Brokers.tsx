import { brokerSocket } from '../../app/gateway';
import { useAppDispatch } from '../../app/hooks';
import { removeBroker, updateBroker } from './brokerSlice';
import { BrokersTable } from './BrokerTable';

export function Brokers() {
  const dispatch = useAppDispatch();

  brokerSocket.emit('findAll', (brokers: { id: number; login: string; money: number }[]) => {
    brokers.forEach((broker) => {
      dispatch(updateBroker(broker));
    });
  });

  brokerSocket.on('updated', (broker: { id: number; login: string; money: number }) => {
    dispatch(updateBroker(broker));
  });

  brokerSocket.on('removed', (brokerId: number) => {
    dispatch(removeBroker(brokerId));
  });

  return (
    <>
      <h1>Brokers</h1>
      <div>
        <label htmlFor="broker-login">Login: </label>
        <input id="broker-login" type="text"/>
        <br/>
        <label htmlFor="broker-money">Money: </label>
        <input id="broker-money" type="number"/>
        <br/>
        <button onClick={() => {
          const login = document.getElementById('broker-login') as HTMLInputElement;
          const money = document.getElementById('broker-money') as HTMLInputElement;
          brokerSocket.emit('update', {
            login: login.value,
            money: Number(money.value),
          });
          login.value = '';
          money.value = '';
        }}>Create / Update
        </button>
      </div>
      <br/>
      <BrokersTable/>
    </>
  );
}