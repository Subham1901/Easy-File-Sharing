import ReactDom from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import "./style.css";
import { store } from "./store/store";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>
);
