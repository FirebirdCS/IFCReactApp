import { Route, Routes, HashRouter } from "react-router-dom";
import "./App.css";
import { BuildingViewer } from "./components/building/building-viewer";
import { LoginForm } from "./components/user/login-form";
import { MapViewer } from "./components/map/map-viewer";
import { ContextProvider } from "./middleware/context-provider";

function App() {
  return (
    <ContextProvider>
      <HashRouter>
        <Routes>
          <Route path="/building" element={<BuildingViewer />} />
          <Route path="/map" element={<MapViewer />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </HashRouter>
    </ContextProvider>
  );
}

export default App;
