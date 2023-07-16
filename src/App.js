import React, { Component } from 'react';
import './app.scss';

import { Content } from '@carbon/react';
import { Route, Switch } from 'react-router-dom';

import { OUTLINE, createRoute } from './components/PageHeader/Outline';

import PageHeader from './components/PageHeader';
import LandingPage from './content/LandingPage';
import { About, Legal } from './content/About';
import MetaData from './content/MetaData';
import { RawPlayerRatings, TheDependables, TUSFanFavorites } from './content/TheTeam';
import { RawManagerRatings, DeadManWalking } from './content/TheDugout';
import { WhoScored, TheMedia } from './content/RatingsHead2Head';

const components = {
    RawPlayerRatings: RawPlayerRatings,
    TheDependables: TheDependables,
    TUSFanFavorites: TUSFanFavorites,
    RawManagerRatings: RawManagerRatings,
    DeadManWalking: DeadManWalking,
    WhoScored: WhoScored,
    TheMedia: TheMedia,
};

class App extends Component {
    render() {
        return (
            <>
                <PageHeader />
                <Content>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/home" component={LandingPage} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/legal" component={Legal} />
                        <Route exact path="/metadata" component={MetaData} />

                        {OUTLINE.filter(item => item.children && !item.hashit).map(item => {
                            return item.children.map(child => (
                                <Route exact path={'/' + createRoute(item, child)} component={components[child.replace(/\s/g, '')]} />
                            ));
                        })}
                    </Switch>
                </Content>
            </>
        );
    }
}

export default App;
