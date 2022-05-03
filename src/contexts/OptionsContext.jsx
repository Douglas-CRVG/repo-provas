import { createContext, useEffect, useState } from "react";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import api from "../services/api";

const OptionsContext = createContext();

export default OptionsContext;

export function OptionsProvider({ children }) {
  const [categories, setCategories] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const { setMessage } = useAlert();
  const { token } = useAuth();
  useEffect(() => {
    getCategories();
    getTeachers();
    getDisciplines();
  }, []);

  async function getCategories() {
    try {
      const response = await api.getCategories(token);
      setCategories(response.data.categories);
    } catch (error) {
      if (error.response) {
        setMessage({
          type: "error",
          text: "Erro, tente novamente em alguns segundos!",
        });
      }
    }
  }

  async function getTeachers() {
    try {
      const response = await api.getTeachers(token);
      setTeachers(response.data.teachers);
    } catch (error) {
      if (error.response) {
        setMessage({
          type: "error",
          text: "Erro, tente novamente em alguns segundos!",
        });
      }
    }
  }

  async function getDisciplines() {
    try {
      const response = await api.getDisciplines(token);
      setDisciplines(response.data.disciplines);
    } catch (error) {
      if (error.response) {
        setMessage({
          type: "error",
          text: "Erro, tente novamente em alguns segundos!",
        });
      }
    }
  }

  return (
    <OptionsContext.Provider value={{ categories, teachers, disciplines }}>
      {children}
    </OptionsContext.Provider>
  );
}
