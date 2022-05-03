import { AddTerm } from "../FormAdd";
import { SCSelect } from "../Input/style";
import { Category, Discipline, Teacher } from "../../../services/api";

interface Props {
  type: string;
  name: string;
  prop: string;
  data: AddTerm;
  setData: React.Dispatch<React.SetStateAction<AddTerm>>;
  options: Category[] | Teacher[] | Discipline[];
}
export default function Select({ name, prop, data, setData, options }: Props) {
  function getSelect(target: any) {
    setData({
      ...data,
      [target.name]: Number(target.options[target.options.selectedIndex].id),
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
