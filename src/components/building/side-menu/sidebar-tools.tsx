import MapIcon from "@mui/icons-material/Map";
import LogoutIcon from "@mui/icons-material/Logout";
import ErrorIcon from "@mui/icons-material/GppMaybe";
import FloorplanIcon from "@mui/icons-material/FindInPage";
import ModelsIcon from "@mui/icons-material/HolidayVillage";
import ListIcon from "@mui/icons-material/ViewList";
import TableChartIcon from "@mui/icons-material/TableChart";
import DeleteIcon from "@mui/icons-material/Delete";
import PropertiesIcon from "@mui/icons-material/Info";
import React from "react";
import { FrontMenuMode } from "../types";
import { State } from "../../../middleware/state";
import { Action } from "../../../middleware/actions";

interface SideTool {
  name: string;
  icon: any;
  action: () => void;
}

export function getSidebarTools(
  state: State,
  dispatch: React.Dispatch<Action>,
  toggleMenu: (active: boolean, mode?: FrontMenuMode) => void
): SideTool[] {
  return [
    {
      name: "Info",
      icon: <ListIcon />,
      action: () => {
        toggleMenu(true, "BuildingInfo");
      },
    },
    {
      name: "Map viewer",
      icon: <MapIcon />,
      action: () => {
        dispatch({ type: "CLOSE_BUILDING" });
      },
    },
    {
      name: "Models",
      icon: <ModelsIcon />,
      action: () => {
        toggleMenu(true, "ModelList");
      },
    },
    {
      name: "Floorplans",
      icon: <FloorplanIcon />,
      action: () => {
        toggleMenu(true, "Floorplans");
      },
    },
    {
      name: "Properties",
      icon: <PropertiesIcon />,
      action: () => {
        toggleMenu(true, "Properties");
      },
    },
    /*{
      name: "Issues",
      icon: <ErrorIcon />,
      action: () => {},
    },*/
    /*{
      name: "Excel",
      icon: <TableChartIcon />,
      action: () => {},
    },*/
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
