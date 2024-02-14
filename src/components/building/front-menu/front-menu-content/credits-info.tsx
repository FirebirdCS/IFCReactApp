import { Typography } from "@mui/material";
import { FC } from "react";
import "./front-menu-content.css";

export const CreditsInfo: FC = () => {
  return (
    <>
      <Typography variant="h6">Creado por: Alvaro Flores y BIM-CA</Typography>
      <Typography variant="h6">Email: info@bim-ca.com</Typography>
    </>
  );
};
