import React from "react";
import { Provider } from "react-redux";
import configureStore from "./store";
import Home from "./pages/Home/Home";

import "antd/es/message/style/css";
import "bootstrap/dist/css/bootstrap.min.css";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
