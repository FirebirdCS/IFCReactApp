import { Action } from "../../../middleware/actions";
import { State } from "../../../middleware/state";
import { Tool } from "../../../types";
import CutIcon from "@mui/icons-material/ContentCut";
import RulerIcon from "@mui/icons-material/Straighten";
import ExplodeIcon from "@mui/icons-material/ImportExport";

export function getBottombarTools(
  state: State,
  dispatch: React.Dispatch<Action>
): Tool[] {
  return [
    {
      name: "Clipping planes",
      icon: <CutIcon />,
      action: () => {
        console.log("Cutting planes tool!");
      },
    },
    {
      name: "Dimensions",
      icon: <RulerIcon />,
      action: () => {
        console.log("Dimensions tool!");
      },
    },
    {
      name: "Explosion",
      icon: <ExplodeIcon />,
      action: () => {
        console.log("Exploding tool!");
      },
    },
  ];
}
