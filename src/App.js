import React, { Component } from 'react';
import './app.scss';

import { Content } from '@carbon/react';
import { Route, Switch } from 'react-router-dom';

import PageHeader from './components/PageHeader';
import LandingPage from './content/LandingPage';
import { AboutPage, LegalPage } from './content/AboutPage';
import MetaDataPage from './content/MetaDataPage';
import TeamPage from './content/TeamPage';
import DugoutPage from './content/DugoutPage';
import Head2HeadPage from './content/Head2HeadPage';

class App extends Component {
    render() {
        return (
            <>
                <PageHeader />
                <Content>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/home" component={LandingPage} />
                        <Route exact path="/about" component={AboutPage} />
                        <Route exact path="/legal" component={LegalPage} />
                        <Route exact path="/metadata" component={MetaDataPage} />
                        <Route exact path="/the-team" component={TeamPage} />
                        <Route exact path="/the-dugout" component={DugoutPage} />
                        <Route exact path="/ratings-head2head" component={Head2HeadPage} />
                    </Switch>
                </Content>
            </>
        );
    }
}

export default App;
