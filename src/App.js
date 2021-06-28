import React, { Component } from 'react';
import './app.scss';

import { Content } from 'carbon-components-react/lib/components/UIShell';
import { Route, Switch } from 'react-router-dom';

import PageHeader from './components/PageHeader';
import LandingPage from './content/LandingPage';

class App extends Component {
  render() {
    return (
      <>
        <PageHeader />
        <Content>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route component={LandingPage} />
            <Route
              path="/bpm"
              component={() => {
                window.location.href = 'https://bpm2021.diag.uniroma1.it/';
                return null;
              }}
            />
            <Route
              path="/icaps"
              component={() => {
                window.location.href =
                  'https://icaps21.icaps-conference.org/home/';
                return null;
              }}
            />
          </Switch>
        </Content>
      </>
    );
  }
}

export default App;
