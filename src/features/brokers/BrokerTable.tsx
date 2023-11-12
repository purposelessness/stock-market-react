import { selectBrokersList } from './brokerSlice';
import { useAppSelector } from '../../app/hooks';
import { brokerSocket } from '../../app/gateway';

export function BrokersTable() {
  const brokers = selectBrokersList(useAppSelector((state) => state));

  return (
    <div>
      <table>
        <thead>
        <tr>
          <th>Id</th>
          <th>Login</th>
          <th>Money</th>
        </tr>
        </thead>
        <tbody>
        {brokers.map((broker) => (
          <tr key={'broker-' + broker.id}>
            <td>{broker.id}</td>
            <td>{broker.login}</td>
            <td>{broker.money}</td>
            <td>
              <button onClick={() => {
                brokerSocket.emit('remove', broker.id);
              }}>
                Delete
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
