import * as yup from "yup";

const bodyTestSchema = yup.object().shape({
  title: yup.string().min(1).required(),
  urlPDF: yup.string().url().required(),
  category: yup.number().positive().integer().min(1).required(),
  discipline: yup.number().positive().integer().min(1).required(),
  instructor: yup.number().positive().integer().min(1).required(),
});

export default bodyTestSchema;
