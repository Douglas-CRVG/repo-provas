import { useContext } from "react";
import OptionsContext from "../contexts/OptionsContext";

export default function useOptions() {
  return useContext(OptionsContext);
}
