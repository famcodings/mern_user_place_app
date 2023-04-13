import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

import './index.css'

import Users from './users/pages/Users';
import Authenticate from "./users/pages/Authenticate";
import UserPlaces from "./places/pages/UserPlaces";
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from "./places/pages/UpdatePlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";


function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/authenticate" exact>
            <Authenticate />
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/places/new">
            <NewPlace />
          </Route>
          <Route path="/places/:placeId">
            <UpdatePlace />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
