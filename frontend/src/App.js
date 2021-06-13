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

  //Note to punpun: for
  return (
    <Router>
      <Switch>
        <Route exact path="/product/:categoryName">
          <Product />
        </Route>

        <Route exact path="/home">
          {user ? <Home /> : <Register />}
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to="/home" /> : <Login />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/home" /> : <Register />}
        </Route>
        <Route exact path="/chat">
          {user ? <Chat /> : <Register />}
        </Route>
        <Route exact path="/profile">
          {user ? <UserListing /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
