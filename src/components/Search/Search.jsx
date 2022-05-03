import SelectSearch from "./SelectSearch/SelectSearc";
import { SCSearch } from "./style";

export default function Search({ options, data, setData, name }) {
  const input = {
    name:
      name === "disciplina"
        ? `Pesquise por ${name}`
        : "Pesquise por pessoa instrutora",
    type: "list",
    prop: name,
  };
  return (
    <SCSearch>
      <SelectSearch
        {...input}
        data={data}
        setData={setData}
        options={options}
      />
    </SCSearch>
  );
}
