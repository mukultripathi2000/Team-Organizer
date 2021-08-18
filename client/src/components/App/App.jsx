import React from 'react';
import { Switch, useRouteMatch, Redirect } from 'react-router-dom';
import PrivateRoute from '../Routes/PrivateRoute';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Schedule from '../Schedule/Schedule';
import Teams from '../Teams/Teams';
import Profile from '../Profile/Profile';

function App() {
  const { path } = useRouteMatch();
  return (
    <main>
      <Header />
      <div className="content-container">
        <Switch>
          <PrivateRoute path={path} exact>
            <Redirect to={`${path}/schedule`} />
          </PrivateRoute>
          <PrivateRoute path={`${path}/schedule`} component={Schedule} exact />
          <PrivateRoute path={`${path}/teams`} component={Teams} />
          <PrivateRoute path={`${path}/profile`} component={Profile} exact />
        </Switch>
      </div>
      <Footer />
    </main>
  );
}

export default App;
