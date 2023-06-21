import React, { Component } from 'react';
import './app.scss';

import { Content } from 'carbon-components-react/lib/components/UIShell';
import { Route, Switch } from 'react-router-dom';

import PageHeader from './components/PageHeader';
import LandingPage from './content/LandingPage';
import IntroPage from './content/IntroPage';
import OverviewPage from './content/OverviewPage';
import FanOpinionPage from './content/FanOpinionPage';
import DeeperDivePage from './content/DeeperDivePage';
import AgendaPage from './content/AgendaPage';
import ConclusionsPage from './content/ConclusionsPage';

class App extends Component {
  render() {
    return (
      <>
        <PageHeader />
        <Content>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/introduction" component={IntroPage} />
            <Route exact path="/overview" component={OverviewPage} />
            <Route exact path="/fan-opinion" component={FanOpinionPage} />
            <Route exact path="/a-deeper-dive" component={DeeperDivePage} />
            <Route exact path="/the-agendas" component={AgendaPage} />
            <Route exact path="/conclusions" component={ConclusionsPage} />
            <Route
              path="/manutd"
              component={() => {
                window.location.href = 'https://www.manutd.com';
                return null;
              }}
            />
            <Route
              path="/united-stand"
              component={() => {
                window.location.href = 'https://www.theunitedstand.com';
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
