import React, { Component } from 'react';
import './app.scss';

import { Content } from '@carbon/react';
import { Route, Switch } from 'react-router-dom';

import PageHeader from './components/PageHeader';
import LandingPage from './content/LandingPage';
import { AboutPage, LegalPage } from './content/AboutPage';

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
                                window.location.href =
                                    'https://www.theunitedstand.com';
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
