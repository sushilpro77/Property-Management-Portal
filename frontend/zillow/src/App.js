import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import RoutesWrapper from "./components/RoutesWrapper";
import { decodeToken } from "./modules/auth";
import { loadUser } from "./store/slices/user/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userPayload = decodeToken();
    if (userPayload) {
      dispatch(loadUser(userPayload));
    }
  }, []);

  return (
    <div>
      <RoutesWrapper />
    </div>
  );
}

export default App;
