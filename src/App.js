import React, { Component } from 'react';
import './app.scss';

import { Content } from 'carbon-components-react/lib/components/UIShell';
import { Route, Switch } from 'react-router-dom';

import PageHeader from './components/PageHeader';

import AwardsPage from './content/AwardsPage';
import TalksPage from './content/TalksPage';
import LandingPage from './content/LandingPage';
import NewsPage from './content/NewsPage';
import PatentsPage from './content/PatentsPage';
import PublicationsPage from './content/PublicationsPage';
import ResearchPage from './content/ResearchPage';
import ThesisPage from './content/ThesisPage';

class App extends Component {
  render() {
    return (
      <>
        <PageHeader />
        <Content>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/publications" component={PublicationsPage} />
            <Route exact path="/talks" component={TalksPage} />
            <Route exact path="/awards" component={AwardsPage} />
            <Route exact path="/news" component={NewsPage} />
            <Route exact path="/patents" component={PatentsPage} />
            <Route exact path="/research" component={ResearchPage} />
            <Route exact path="/thesis" component={ThesisPage} />
            <Route
              path="/ibm"
              component={() => {
                window.location.href =
                  'https://www.research.ibm.com/artificial-intelligence';
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
