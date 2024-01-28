import { Outlet } from "react-router";
import "./App.css";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <>
      <Provider store={appStore}>
        {/* <Header /> */}
        <Outlet />
        {/* <Footer /> */}
      </Provider>
    </>
  );
}

export default App;
