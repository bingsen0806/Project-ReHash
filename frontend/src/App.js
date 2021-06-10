import "./App.css";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import UserListing from "./pages/userlisting/UserListing";
import Review from "./pages/review/Review";
import Product from "./pages/product/Product";
import CreateListing from "./pages/createListing/CreateListing";
import Item from "./pages/item/Item";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Chat from "./pages/chat/Chat";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/chat" /> : <Login />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route exact path="/chat">
          {user ? <Chat /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
