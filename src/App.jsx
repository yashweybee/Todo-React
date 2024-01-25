import { Outlet } from "react-router";
import "./App.css";
import Header from "./Components/Header";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <Header />
        <Outlet />
      </Provider>
    </>
  );
}

export default App;
