import { Box } from "@mui/material";
import { FC, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../middleware/context-provider";
import { BuildingDrawer } from "./building-drawer";
import { BuildingTopBar } from "./building-topbar";
import { BuildingFrontMenu } from "./front-menu/building-front-menu";
import { getDrawerHeader } from "./mui-utils";

export const BuildingViewer: FC = () => {
  const [sideOpen, setSideOpen] = useState(false);
  const [frontOpen, setFrontOpen] = useState(false);
  const [width] = useState(240);
  const [{ user, building }, dispatch] = useAppContext();

  if (!building) {
    return <Navigate to={"/map"} />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const toggleDrawer = (active: boolean) => {
    setSideOpen(active);
  };

  const toggleFrontMenu = (active = !frontOpen) => {
    setFrontOpen(active);
  };

  const DrawerHeader = getDrawerHeader();

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <BuildingTopBar
          width={width}
          open={sideOpen}
          onOpen={() => toggleDrawer(true)}
        />
        <BuildingDrawer
          width={width}
          open={sideOpen}
          onClose={() => toggleDrawer(false)}
          onToggleMenu={() => toggleFrontMenu(true)}
        ></BuildingDrawer>
        <Box component="main" sx={{ flexGrow: 1, p: 6 }}>
          <DrawerHeader />
          <BuildingFrontMenu
            onToggleMenu={() => toggleFrontMenu(false)}
            open={frontOpen}
            mode="BuildingInfo"
          />
          <h1>Welcome to the BIM-CA viewer</h1>
        </Box>
      </Box>
    </>
  );
};

//process.env.REACT_APP_MAPBOX_TOKEN
