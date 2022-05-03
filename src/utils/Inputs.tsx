interface Input {
  type: string;
  name: string;
  prop: string;
}

const inputs: Input[] = [
  {
    name: "Título da Prova",
    type: "text",
    prop: "title",
  },
  {
    name: "PDF da prova",
    type: "text",
    prop: "urlPDF",
  },
  {
    name: "Categoria",
    type: "list",
    prop: "category",
  },
  {
    name: "Disciplina",
    type: "list",
    prop: "discipline",
  },
  {
    name: "Pessoa instrutora",
    type: "list",
    prop: "instructor",
  },
];

export { inputs };
