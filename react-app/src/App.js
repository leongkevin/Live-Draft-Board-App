import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import DraftPage from "./components/DraftPage";
import LeaguesPage from "./components/LeaguesPage";
import LeaguePage from "./components/LeaguePage";
import TeamsPage from "./components/TeamsPage";
import TeamPage from "./components/TeamPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/leagues/:league_id/drafts">
            <DraftPage />
          </Route>
          <Route exact path="/leagues/:league_id">
            <LeaguePage />
          </Route>
          <Route exact path="/leagues">
            <LeaguesPage />
          </Route>
          <Route exact path="/teams/:team_id">
            <TeamPage />
          </Route>
          <Route exact path="/teams">
            <TeamsPage />
          </Route>

          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
