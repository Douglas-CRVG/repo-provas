import { Search } from "../../../pages/Disciplines";
import { SCSelect } from "../../FormAdd/Input/style";
import { Category, Discipline, Teacher } from "../../../services/api";

interface Props {
  type: string;
  name: string;
  prop: string;
  data: Search;
  setData: React.Dispatch<React.SetStateAction<Search>>;
  options: Teacher[] | Discipline[];
}
export default function SelectSearch({
  name,
  prop,
  data,
  setData,
  options,
}: Props) {
  function getSelect(target: any) {
    setData({
      ...data,
      [target.name]: target.options[target.options.selectedIndex].text,
    });
  }

  return (
    <SCSelect name={prop} onChange={(e) => getSelect(e.target)}>
      <option value="" disabled selected hidden>
        {name}
      </option>
      {options.map((option, index) => (
        <option key={index} id={`${option.id}`}>
          {option.name}
        </option>
      ))}
    </SCSelect>
  );
}
