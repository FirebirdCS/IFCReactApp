import { FC } from "react";
import { Button } from "@mui/material";
import { useAppContext } from "../../../../middleware/context-provider";
import { Floorplan } from "../../../../types";
import "./front-menu-content.css";

export const FloorplanMenu: FC = () => {
  const [state, dispatch] = useAppContext();

  const onFloorplanSelected = (active: boolean, floorplan?: Floorplan) => {
    dispatch({ type: "TOGGLE_FLOORPLAN", payload: { active, floorplan } });
  };

  return (
    <div>
      {state.floorplans.map((plan) => (
        <div key={plan.name} className="list-item">
          <Button
            onClick={() => onFloorplanSelected(true, plan)}
            className="wide-button"
          >
            {plan.name}
          </Button>
        </div>
      ))}
      <div key="exit" className="list-item">
        <Button
          onClick={() => onFloorplanSelected(false)}
          className="wide-button"
          aria-label="Close floorplan mode"
        >
          Cerrar
        </Button>
      </div>
    </div>
  );
};
