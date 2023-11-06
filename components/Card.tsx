import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { contractData } from "../contracts/data";
import { useState } from "react";

interface CardProps {
  id: number;
  data: string;
}

export default function Card(props: CardProps) {
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const toggleFrom = () => {
    // console.log(isEditing);

    setIsEditing(!isEditing);
  };
  const handleUpdate = (evt) => {
    evt.preventDefault();
    writeUpdate?.();
    toggleFrom();
  };
  const handleChange = (evt) => {
    setTask(evt.target.value);
    // console.log(task);
  };

  const { config: config1 } = usePrepareContractWrite({
    address: contractData.address as `0x${string}`,
    abi: contractData.abi,
    functionName: "deleteTodoItem",
    args: [props.id],
  });

  const { write } = useContractWrite(config1);
  // console.log(write);
  const { config: config2 } = usePrepareContractWrite({
    address: contractData.address as `0x${string}`,
    abi: contractData.abi,
    functionName: "updateTodoItem",
    args: [props.id, task],
  });
  const { write: writeUpdate } = useContractWrite(config2);

  // console.log(writeUpdate);

  return (
    <div
    // className="flex w-full justify-between"
    // style={{ justifyContent: "space-between" }}
    >
      {/* <input value={props.data} type="text" /> */}

      {/* <div style={{ display: "flex" }}> */}
      {!isEditing ? (
        <div
          className="flex w-full justify-between"
          style={{ justifyContent: "space-between" }}
        >
          <input value={props.data} type="text" />
          <div>
            <button
              // disabled={!writeUpdate}
              // onClick={() => writeUpdate?.()}
              onClick={() => toggleFrom()}
            >
              Update
            </button>
            <button
              style={{ paddingLeft: 10 }}
              // className=" border-b-4 border-r-4 border-red-500 cursor-pointer justify-items-end"
              disabled={!write}
              onClick={() => write?.()}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleUpdate}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <input
            onChange={handleChange}
            value={task}
            type="text"
            placeholder={props.data}
            style={{ border: "none", outline: "none" }}
          />
          <button>Save</button>
        </form>
      )}
    </div>
    // </div>
  );
}
