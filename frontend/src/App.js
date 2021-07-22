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

function App() {
  const { user } = useContext(AuthContext);

  /*TODO:
  1. GroupSideBar invite, edit photo, edit description for creator only
  3. Create group in home page
  4. Notifications (basic)
  2. Backend API for recommended groups
  3. Filter for groups or items in search function
  4. Remove search function in chat
  5. Redo login page and register page
  6. Surprise swap function on top of the page
  7. Notifications using socket.io and show notification count
  8. Cache user data, when update rmb to update local storage also
  9. Change storage system to online storage
  10. Show only items that does not belong to you.
  11. Prevent spamming of notifications by sending error message is user is already invited to the group
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
        <Route exact path="/groups/:groupId/:pageType">
          <Group />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
