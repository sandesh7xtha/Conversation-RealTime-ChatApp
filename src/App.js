import "./App.css";
import { Navbar } from "./navbar/Navbar";
import { LoginPage } from "./components/LoginPage/LoginPage";
import NewAccount from "./components/NewAccount/NewAccount";
import { ChatPage } from "./components/chatPage/ChatPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectRoute from "./utils/ProtectRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/Conversation-RealTime-ChatApp/LoginPage"
          element={<LoginPage />}
        />
        <Route
          exact
          path="/Conversation-RealTime-ChatApp/createNewAccount"
          element={<NewAccount />}
        />
        <Route element={<ProtectRoute />}>
          <Route
            exact
            path="/Conversation-RealTime-ChatApp/ChatPage"
            element={<ChatPage />}
          />
          <Route
            exact
            path="/Conversation-RealTime-ChatApp"
            element={<ChatPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
