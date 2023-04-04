import { Button, IconButton } from "@mui/material";
import { FC } from "react";
import { useAppContext } from "../../../../middleware/context-provider";
import { BuildingDrawer } from "../../side-menu/building-drawer";
import DeleteIcon from "@mui/icons-material/Clear";
import "./front-menu-content.css";
export const ModelListMenu: FC = () => {
  const [{ building, user }, dispatch] = useAppContext();

  if (!building || !user) {
    throw new Error("Error: Building or user not found!");
  }

  const onUploadModel = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.style.visibility = "hidden";
    document.body.appendChild(input);
    input.onchange = () => {
      if (input.files && input.files.length) {
        const file = input.files[0];
        const newBuilding = { ...building };
        const { name } = file;
        const id = `${file.name}-${performance.now()}`;
        const model = { name, id };
        newBuilding.models.push(model);
        dispatch({
          type: "UPLOAD_MODEL",
          payload: {
            model,
            file,
            building: newBuilding,
          },
        });
      }
      input.remove();
    };
    input.click();
  };

  const onDeleteModel = (id: string) => {
    const newBuilding = { ...building };
    const model = newBuilding.models.find((model) => model.id);
    if (!model) throw new Error("Model not found!");
    newBuilding.models = newBuilding.models.filter((model) => model.id !== id);
    dispatch({
      type: "DELETE_MODEL",
      payload: { model, building: newBuilding },
    });
  };

  return (
    <div>
      {building.models.length ? (
        building.models.map((model) => (
          <div className="list-item" key={model.id}>
            <IconButton onClick={() => onDeleteModel(model.id)}>
              <DeleteIcon />
            </IconButton>
            <span className="margin-left">{model.name}</span>
          </div>
        ))
      ) : (
        <p>This building has no models</p>
      )}
      <div className="list-item">
        <Button onClick={onUploadModel} variant="contained" color="primary">
          Upload Model
        </Button>
      </div>
    </div>
  );
};
