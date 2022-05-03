import { SCButton, SCForm } from "./style";
import Input from "./Input/Input";
import { useEffect, useState } from "react";
import { inputs } from "../../utils/Inputs";
import Select from "./Select/Select";
import bodyTestSchema from "../../schemas/addTest";
import useOptions from "../../hooks/useCategory";

export interface AddTerm {
  title: string;
  urlPDF: string;
  category: number | string;
  discipline: number | string;
  instructor: number | string;
}

export default function FormAdd() {
  const dataForm: AddTerm = {
    title: "",
    urlPDF: "",
    category: "",
    discipline: "",
    instructor: "",
  };
  const [data, setData] = useState<AddTerm>(dataForm);
  const { categories, teachers, disciplines } = useOptions();

  async function handleAddTerm(e: React.FormEvent) {
    e.preventDefault();
    const validate = await bodyTestSchema.isValid(data);
    if (!validate) {
      alert("Preencha corretamente todos os dados para cadastro!");
      return;
    }

    console.log("data", data);
  }

  return (
    <SCForm onSubmit={handleAddTerm}>
      {inputs.map((input, index) => {
        if (input.type === "text") {
          return <Input key={index} {...input} data={data} setData={setData} />;
        } else {
          if (input.prop === "category") {
            return (
              <Select
                key={index}
                {...input}
                data={data}
                setData={setData}
                options={categories}
              />
            );
          } else if (input.prop === "instructor") {
            return (
              <Select
                key={index}
                {...input}
                data={data}
                setData={setData}
                options={teachers}
              />
            );
          } else {
            return (
              <Select
                key={index}
                {...input}
                data={data}
                setData={setData}
                options={disciplines}
              />
            );
          }
        }
      })}
      <SCButton>Enviar</SCButton>
    </SCForm>
  );
}
