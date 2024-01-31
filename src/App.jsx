import { Outlet } from "react-router";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      console.log(permission);
    });
  }
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
