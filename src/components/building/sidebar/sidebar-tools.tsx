import MapIcon from "@mui/icons-material/Map";
import LogoutIcon from "@mui/icons-material/Logout";
import ErrorIcon from "@mui/icons-material/GppMaybe";
import FloorplanIcon from "@mui/icons-material/FindInPage";
import ModelsIcon from "@mui/icons-material/HolidayVillage";
import ListIcon from "@mui/icons-material/ViewList";
import TableChartIcon from "@mui/icons-material/TableChart";
import DeleteIcon from "@mui/icons-material/Delete";
import { Action } from "../../../middleware/actions";
import { State } from "../../../middleware/state";
import Alert from "@mui/material/Alert/Alert";
import React, { useState } from "react";

interface SideTool {
  name: string;
  icon: any;
  action: () => void;
}

export function getSidebarTools(
  state: State,
  dispatch: React.Dispatch<Action>,
  toggleMenu: () => void
): SideTool[] {
  return [
    {
      name: "Info",
      icon: <ListIcon />,
      action: () => {
        toggleMenu();
      },
    },
    {
      name: "Models",
      icon: <ModelsIcon />,
      action: () => {},
    },
    {
      name: "Floorplans",
      icon: <FloorplanIcon />,
      action: () => {},
    },
    {
      name: "Issues",
      icon: <ErrorIcon />,
      action: () => {},
    },
    {
      name: "Map viewer",
      icon: <MapIcon />,
      action: () => {
        dispatch({ type: "CLOSE_BUILDING" });
      },
    },
    {
      name: "Excel",
      icon: <TableChartIcon />,
      action: () => {},
    },
    {
      name: "Delete building",
      icon: <DeleteIcon />,
      action: () => {
        dispatch({ type: "DELETE_BUILDING", payload: state.building });
      },
    },
    {
      name: "Log out",
      icon: <LogoutIcon />,
      action: () => {
        dispatch({ type: "LOGOUT" });
      },
    },
  ];
}
