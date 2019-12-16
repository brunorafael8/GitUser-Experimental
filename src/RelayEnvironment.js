import { Environment, Network, RecordSource, Store } from "relay-runtime";

async function fetchRelay(params, variables) {
  const REACT_APP_GITHUB_AUTH_TOKEN = process.env.REACT_APP_GITHUB_AUTH_TOKEN;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${REACT_APP_GITHUB_AUTH_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: params.text,
      variables
    })
  });

  return await response.json();
}

export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource())
});
