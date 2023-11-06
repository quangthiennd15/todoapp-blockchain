import {
  WagmiConfig,
  createConfig,
  configureChains,
  mainnet,
  useEnsName,
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { contractData } from "../contracts/data";
import { useState } from "react";
import Card from "../components/Card";

const { chains, publicClient } = configureChains(
  [mainnet],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "https://rpc.testnet.fantom.network/",
      }),
    }),
  ]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [new MetaMaskConnector({ chains })],
});

function Profile() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: balance } = useBalance({ address });
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const [task, setTask] = useState("");

  const { config } = usePrepareContractWrite({
    address: contractData.address as `0x${string}`,
    abi: contractData.abi,
    functionName: "addTodoItem",
    args: [task],
  });
  const { isLoading, isSuccess, write } = useContractWrite(config);

  const { data } = useContractRead({
    address: contractData.address as `0x${string}`,
    abi: contractData.abi,
    functionName: "getAllTodoItems",
    watch: true,
  });
  // console.log(data, contractData.address);

  function handleChange() {
    write?.();
    setTask("");
  }

  if (isConnected) {
    return (
      <div>
        <div className="pb-10 justify-center">
          <div className="absolute left-1/2">
            Address User: {ensName ? `${ensName} (${address})` : address}
            <p>Balance: {balance ? balance.formatted : "Loading..."} FTM</p>
          </div>
          <button
            onClick={() => disconnect()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full content-center absolute left-1/2 mt-14"
          >
            Disconnect
          </button>
        </div>

        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
          <div className="px-4 py-2">
            <h1 className="text-gray-800 font-bold text-2xl ">To-Do List</h1>
          </div>
          <form className="w-full mx-auto px-4 py-2">
            <div className="flex items-center border-b-2 border-teal-500 py-2">
              <input
                type="text"
                className=" appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                placeholder="Add a task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                disabled={!write}
                onClick={handleChange}
              >
                Add
              </button>
            </div>
          </form>
          {isLoading && <div>Check Wallet</div>}
          {isSuccess}

          <ul className="divide-y divide-gray-200 px-4">
            {data?.map((item, index) => (
              <li className="py-4">
                <Card key={index} id={index} data={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full absolute left-1/2"
        >
          Connect Wallet
        </button>
      ))}
    </div>
  );
}

function App() {
  return (
    <WagmiConfig config={config}>
      <Profile />
    </WagmiConfig>
  );
}

export default App;
