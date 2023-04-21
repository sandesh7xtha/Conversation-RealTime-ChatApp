import "./App.css";
import { Navbar } from "./navbar/Navbar";
import { LoginPage } from "./components/LoginPage/LoginPage";
import NewAccount from "./components/NewAccount/NewAccount";
import { ChatPage } from "./components/chatPage/ChatPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectRoute from "./utils/ProtectRoute";
import { useRef, useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/storeIndex";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/LoginPage" element={<LoginPage />} />
          <Route exact path="/createNewAccount" element={<NewAccount />} />
          <Route element={<ProtectRoute />}>
            <Route exact path="/ChatPage" element={<ChatPage />} />
            <Route exact path="/" element={<ChatPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
