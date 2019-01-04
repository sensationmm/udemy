import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const store = new Store(new RecordSource());

const network = Network.create((operation, variables) => {
  return fetch('//localhost:5000/backend', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => {
    return response.json();
  });
});

const environment = new Environment({
  network,
  store
});

export default environment;
