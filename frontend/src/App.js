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
import MyGroups from "./pages/myGroups/MyGroups";
import Settings from "./pages/settings/Settings";
import Group from "./pages/group/Group";
import GroupList from "./pages/groupList/GroupList";

function App() {
  const { user } = useContext(AuthContext);

  /*TODO:
  7. show notification count
  9. Change storage system to online storage
  */

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to="/home" /> : <Login />}
          {/* {user ? <Group /> : <Group />} */}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/home" /> : <Register />}
        </Route>
        <Route exact path="/product/:pageType/:categoryName">
          <Product />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/create">
          {user ? <CreateListing /> : <Login />}
        </Route>
        <Route exact path="/chat/:initialActiveConvoId">
          {user ? <Chat /> : <Login />}
        </Route>
        <Route exact path="/profile/:username/listings">
          <UserListing />
        </Route>
        <Route exact path="/profile/:username/reviews">
          <Review />
        </Route>
        <Route exact path="/profile/:username/settings">
          <Settings />
        </Route>
        <Route exact path="/profile/:username/mygroups">
          <MyGroups />
        </Route>
        <Route exact path="/items/:itemId">
          <Item />
        </Route>
        {/* GroupList path must be written before Group */}
        <Route exact path="/groups/search/:searchText">
          <GroupList />
        </Route>
        <Route exact path="/groups/:groupId/:pageType">
          <Group />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
