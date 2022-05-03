import { useState } from "react";
import { AddTerm } from "../FormAdd";
import { SCInput, SCSelect, SCOption } from "./style";

interface Props {
  type: string;
  name: string;
  prop: string;
  data: AddTerm;
  setData: React.Dispatch<React.SetStateAction<AddTerm>>;
}
export default function Input({ type, name, prop, data, setData }: Props) {
  const [input, setInput] = useState("");
  const validate: boolean = type !== "text";

  function getInput(target: any) {
    setInput(target.value);
    setData({ ...data, [target.name]: target.value });
  }

  return (
    <SCInput
      type={type}
      placeholder={name}
      onChange={(e) => getInput(e.target)}
      value={input}
      name={prop}
    />
  );
}
