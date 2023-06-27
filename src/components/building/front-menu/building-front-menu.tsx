import { Button, Card, CardContent } from "@mui/material";
import { FC } from "react";
import "./building-front-menu.css";
import CloseIcon from "@mui/icons-material/Close";
import { BuildingInfoMenu } from "./front-menu-content/building-info-menu";
import { FrontMenuMode } from "../types";
import { ModelListMenu } from "./front-menu-content/model-list-menu";
import { PropertiesMenu } from "./front-menu-content/properties-menu";
import { FloorplanMenu } from "./front-menu-content/floorplan-menu";
import { CreditsInfo } from "./front-menu-content/credits-info";

export const BuildingFrontMenu: FC<{
  mode: FrontMenuMode;
  open: boolean;
  onToggleMenu: (active: boolean) => void;
}> = ({ mode, open, onToggleMenu }) => {
  if (!open) {
    return <></>;
  }

  const content = new Map<FrontMenuMode, any>();
  content.set("BuildingInfo", <BuildingInfoMenu onToggleMenu={onToggleMenu} />);
  content.set("ModelList", <ModelListMenu />);
  content.set("Properties", <PropertiesMenu />);
  content.set("Floorplans", <FloorplanMenu />);
  content.set("Credits", <CreditsInfo />);

  const titles = {
    BuildingInfo: "Información del edificio",
    ModelList: "Lista de modelos",
    Properties: "Propiedades",
    Floorplans: "Planos de planta",
    Credits: "Créditos",
  };

  const title = titles[mode];

  return (
    <Card className="front-menu">
      <CardContent>
        <div className="front-menu-header">
          <h2>{title}</h2>
          <Button onClick={() => onToggleMenu(false)}>
            <CloseIcon />
          </Button>
        </div>
        <div className="front-menu-content">{content.get(mode)}</div>
      </CardContent>
    </Card>
  );
};
