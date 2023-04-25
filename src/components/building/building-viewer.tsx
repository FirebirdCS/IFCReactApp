import { Box } from "@mui/material";
import { FC, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../middleware/context-provider";
import { BuildingDrawer } from "./side-menu/building-drawer";
import { BuildingTopBar } from "./side-menu/building-topbar";
import { CssBaseline } from "@mui/material";
import { BuildingFrontMenu } from "./front-menu/building-front-menu";
import { getDrawerHeader } from "./side-menu/mui-utils";
import { FrontMenuMode } from "./types";
import { BuildingViewport } from "./viewport/building-viewport";
import { BuildingBottomMenu } from "./bottom-menu/building-bottom-menu";

export const BuildingViewer: FC = () => {
  const [width] = useState(240);
  const [sideOpen, setSideOpen] = useState(false);
  const [frontOpen, setFrontOpen] = useState(false);
  const [frontMenu, setFrontMenu] = useState<FrontMenuMode>("BuildingInfo");

  const [{ building, user }] = useAppContext();

  if (!building) {
    return <Navigate to="/map" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const toggleFrontMenu = (active = !frontOpen, mode?: FrontMenuMode) => {
    if (mode) {
      setFrontMenu(mode);
    }
    setFrontOpen(active);
  };

  const toggleDrawer = (active: boolean) => {
    setSideOpen(active);
  };

  const DrawerHeader = getDrawerHeader();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <BuildingTopBar
        width={width}
        open={sideOpen}
        onOpen={() => toggleDrawer(true)}
      />

      <BuildingDrawer
        width={width}
        open={sideOpen}
        onClose={() => toggleDrawer(false)}
        onToggleMenu={toggleFrontMenu}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <BuildingViewport />

        <BuildingFrontMenu
          onToggleMenu={toggleFrontMenu}
          open={frontOpen}
          mode={frontMenu}
        />

        <BuildingBottomMenu />
      </Box>
    </Box>
  );
};

//process.env.REACT_APP_MAPBOX_TOKEN
