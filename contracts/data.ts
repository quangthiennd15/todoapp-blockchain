export const contractData = {
  address: "0x808AD1632F9Ae2f227f39C557Fb93193B0ff8EDB",
  abi: [
    {
      inputs: [
        {
          internalType: "string",
          name: "newItem",
          type: "string",
        },
      ],
      name: "addTodoItem",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "indexToDelete",
          type: "uint256",
        },
      ],
      name: "deleteTodoItem",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllTodoItems",
      outputs: [
        {
          internalType: "string[]",
          name: "",
          type: "string[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "indexToUpdate",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "newText",
          type: "string",
        },
      ],
      name: "updateTodoItem",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
