import "../assets/styles/reset.css";
import { Box, Button, Divider } from "@mui/material";
import Title from "../components/Title/Title";
import { useNavigate } from "react-router-dom";
import FormAdd from "../components/FormAdd/FormAdd";

export default function Add() {
  const navigate = useNavigate();

  return (
    <>
      <Title />
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
            variant="outlined"
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
          <Button
            variant="contained"
            onClick={() => navigate("/app/adicionar")}
          >
            Adicionar
          </Button>
        </Box>
        <FormAdd />
      </Box>
    </>
  );
}
