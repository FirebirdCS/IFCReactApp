import { Button, TextField, Box, Typography, Link } from "@mui/material";
import { FC } from "react";
import "./front-menu-content.css";
import { useAppContext } from "../../../../middleware/context-provider";

export const CreditsInfo: FC = () => {
  const [state] = useAppContext();

  return (
    <>
      <Typography variant="h6">Creado por: Alvaro Flores y BIM-CA</Typography>
      <Typography variant="h6">Email: info@bim-ca.com</Typography>
    </>
  );
};
