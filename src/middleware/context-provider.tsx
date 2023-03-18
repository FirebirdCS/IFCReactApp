import {
  FC,
  PropsWithChildren,
  useReducer,
  createContext,
  useContext,
} from "react";
import { Action } from "./actions";
import { Authenticator } from "./authenticator";
import { executeCore } from "./core-handler";
import { Events } from "./event-handler";
import { initialState, State } from "./state";
import { reducer } from "./state-handler";

const appContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => {},
]);

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useReducer(reducer, initialState);

  const events = new Events();
  events.on("OPEN_BUILDING", (buildingId: string) => {
    setState({ type: "OPEN_BUILDING", payload: buildingId });
  });

  const dispatch = (value: Action) => {
    setState(value);
    executeCore(value, events);
  };
  return (
    <appContext.Provider value={[state, dispatch]}>
      <Authenticator />
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};
