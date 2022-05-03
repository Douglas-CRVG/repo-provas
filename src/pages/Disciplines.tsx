import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../components/Search/Search";
import useAuth from "../hooks/useAuth";
import useOptions from "../hooks/useCategory";
import api, {
  Category,
  Discipline,
  TeacherDisciplines,
  Test,
  TestByDiscipline,
} from "../services/api";

export interface Search {
  disciplina: string;
}

function Disciplines() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [terms, setTerms] = useState<TestByDiscipline[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [data, setData] = useState<Search>({ disciplina: "" });
  const { disciplines } = useOptions();

  useEffect(() => {
    async function loadPage() {
      if (!token) return;

      const { data: testsData } = await api.getTestsByDiscipline(token);
      setTerms(handleDiscipline(testsData.tests));
      const { data: categoriesData } = await api.getCategories(token);
      setCategories(categoriesData.categories);
    }
    loadPage();
  }, [token, data.disciplina]);

  function handleDiscipline(tests: TestByDiscipline[]) {
    if (data.disciplina === "") {
      return tests;
    }
    return tests.filter((test) => {
      let { disciplines } = test;
      const aux = disciplines.filter((discipline) => {
        if (data.disciplina === "" || discipline.name === data.disciplina) {
          return discipline;
        }
      });
      if (aux.length > 0) {
        test.disciplines = aux;
        return test;
      }
    });
  }

  return (
    <>
      <Search
        options={disciplines}
        data={data}
        setData={setData}
        name="disciplina"
      />
      <Divider sx={{ marginBottom: "35px" }} />
      <Box
        sx={{
          marginX: "auto",
          width: "700px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/app/disciplinas")}
          >
            Disciplinas
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/app/pessoas-instrutoras")}
          >
            Pessoa Instrutora
          </Button>
          <Button variant="outlined" onClick={() => navigate("/app/adicionar")}>
            Adicionar
          </Button>
        </Box>
        <TermsAccordions categories={categories} terms={terms} />
      </Box>
    </>
  );
}

interface TermsAccordionsProps {
  categories: Category[];
  terms: TestByDiscipline[];
}

function TermsAccordions({ categories, terms }: TermsAccordionsProps) {
  return (
    <Box sx={{ marginTop: "50px" }}>
      {terms.map((term) => (
        <Accordion sx={{ backgroundColor: "#FFF" }} key={term.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">{term.number} Período</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DisciplinesAccordions
              categories={categories}
              disciplines={term.disciplines}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

interface DisciplinesAccordionsProps {
  categories: Category[];
  disciplines: Discipline[];
}

function DisciplinesAccordions({
  categories,
  disciplines,
}: DisciplinesAccordionsProps) {
  if (disciplines.length === 0)
    return <Typography>Nenhuma prova para esse período...</Typography>;

  return (
    <>
      {disciplines.map((discipline) => (
        <Accordion
          sx={{ backgroundColor: "#FFF", boxShadow: "none" }}
          key={discipline.id}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">{discipline.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Categories
              categories={categories}
              teachersDisciplines={discipline.teacherDisciplines}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

interface CategoriesProps {
  categories: Category[];
  teachersDisciplines: TeacherDisciplines[];
}

function Categories({ categories, teachersDisciplines }: CategoriesProps) {
  if (teachersDisciplines.length === 0)
    return <Typography>Nenhuma prova para essa disciplina...</Typography>;

  return (
    <>
      {categories
        .filter(doesCategoryHaveTests(teachersDisciplines))
        .map((category) => (
          <Box key={category.id}>
            <Typography fontWeight="bold">{category.name}</Typography>
            <TeachersDisciplines teachersDisciplines={teachersDisciplines} />
          </Box>
        ))}
    </>
  );
}

interface TeacherDisciplineProps {
  teachersDisciplines: TeacherDisciplines[];
}

function doesCategoryHaveTests(teachersDisciplines: TeacherDisciplines[]) {
  return (category: Category) =>
    teachersDisciplines.filter((teacherDiscipline) =>
      testOfThisCategory(teacherDiscipline, category)
    ).length > 0;
}

function testOfThisCategory(
  teacherDiscipline: TeacherDisciplines,
  category: Category
) {
  return teacherDiscipline.tests.some(
    (test) => test.category.id === category.id
  );
}

function TeachersDisciplines({ teachersDisciplines }: TeacherDisciplineProps) {
  const testsWithDisciplines = teachersDisciplines.map((teacherDiscipline) => ({
    tests: teacherDiscipline.tests,
    teacherName: teacherDiscipline.teacher.name,
  }));

  return <Tests testsWithTeachers={testsWithDisciplines} />;
}

interface TestsProps {
  testsWithTeachers: { tests: Test[]; teacherName: string }[];
}

function Tests({ testsWithTeachers: testsWithDisciplines }: TestsProps) {
  return (
    <>
      {testsWithDisciplines.map((testsWithDisciplines) =>
        testsWithDisciplines.tests.map((test) => (
          <Typography key={test.id} color="#878787">
            <Link
              href={test.pdfUrl}
              target="_blank"
              underline="none"
              color="inherit"
            >{`${test.name} (${testsWithDisciplines.teacherName})`}</Link>
          </Typography>
        ))
      )}
    </>
  );
}

export default Disciplines;
