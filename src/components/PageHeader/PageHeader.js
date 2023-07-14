import React from 'react';
import GitHubButton from 'react-github-btn';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import {
    Theme,
    Header,
    HeaderContainer,
    HeaderMenuButton,
    HeaderName,
    HeaderNavigation,
    HeaderMenuItem,
    SkipToContent,
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavDivider,
    SideNavMenu,
    SideNavMenuItem,
} from '@carbon/react';

class PageHeader extends React.Component {
    constructor(props) {
        super();

        const local_url_split = window.location.href.split('/');
        const endpoint = local_url_split[local_url_split.length - 1];
        const label = endpoint === '' ? 'home' : endpoint;

        this.state = {
            current: label,
            [label]: true,
        };
    }

    onClickTab = ({ name }) => {
        this.setState({
            ...this.state,
            current: name,
            [this.state.current]: false,
            [name]: true,
        });
    };

    render() {
        return (
            <HeaderContainer
                render={({ isSideNavExpanded, onClickSideNavExpand }) => (
                    <Theme
                        theme={this.state.current === 'home' ? 'g100' : 'g10'}>
                        <Header
                            aria-label="Header"
                            className={
                                this.state.current !== 'home'
                                    ? 'activate-red'
                                    : ''
                            }>
                            <SkipToContent />
                            <HeaderMenuButton
                                onClick={onClickSideNavExpand}
                                isActive={isSideNavExpanded}
                                aria-label="Toggle Contents"
                            />
                            <HeaderName
                                as={Link}
                                to="/"
                                prefix="Fun with data from"
                                onClick={this.onClickTab.bind(this, {
                                    name: 'home',
                                })}>
                                United Stand
                            </HeaderName>
                            <HeaderNavigation aria-label="Navigate out">
                                <HeaderMenuItem
                                    href="https://www.manutd.com"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    Manchester United
                                </HeaderMenuItem>
                                <HeaderMenuItem
                                    href="https://theunitedstand.com"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    United Stand
                                </HeaderMenuItem>
                            </HeaderNavigation>

                            <SideNav
                                className={
                                    this.state.current !== 'home'
                                        ? 'activate-red'
                                        : ''
                                }
                                expanded={isSideNavExpanded}
                                isPersistent={true}
                                aria-label="Side navigation">
                                <SideNavItems>
                                    <SideNavLink
                                        as={Link}
                                        to="/"
                                        children="Home"
                                        onClick={this.onClickTab.bind(this, {
                                            name: 'home',
                                        })}
                                        isActive={this.state.home}
                                    />
                                    <SideNavLink
                                        as={Link}
                                        to="/about"
                                        children="About"
                                        onClick={this.onClickTab.bind(this, {
                                            name: 'about',
                                        })}
                                        isActive={this.state.about}
                                    />
                                    <SideNavLink
                                        as={Link}
                                        to="/legal"
                                        children="Legal"
                                        onClick={this.onClickTab.bind(this, {
                                            name: 'legal',
                                        })}
                                        isActive={this.state.legal}
                                    />
                                    <SideNavDivider />

                                    <SideNavMenu
                                        title="MetaData"
                                        defaultExpanded>
                                        <HashLink
                                            className="no-decoration-enforce"
                                            to="/metadata#tus-by-the-numbers">
                                            <SideNavMenuItem
                                                onClick={this.onClickTab.bind(
                                                    this,
                                                    {
                                                        name: 'metadata_1',
                                                    }
                                                )}
                                                isActive={
                                                    this.state.metadata_1
                                                }>
                                                TUS by the numbers
                                            </SideNavMenuItem>
                                        </HashLink>
                                        <HashLink
                                            className="no-decoration-enforce"
                                            to="/metadata#the-myth-of-negativity">
                                            <SideNavMenuItem
                                                onClick={this.onClickTab.bind(
                                                    this,
                                                    {
                                                        name: 'metadata_2',
                                                    }
                                                )}
                                                isActive={
                                                    this.state.metadata_2
                                                }>
                                                The Myth of Negativity
                                            </SideNavMenuItem>
                                        </HashLink>
                                    </SideNavMenu>

                                    <SideNavMenu
                                        title="The Team"
                                        defaultExpanded>
                                        <HashLink
                                            className="no-decoration-enforce"
                                            to="/the-team#raw-player-ratings">
                                            <SideNavMenuItem
                                                onClick={this.onClickTab.bind(
                                                    this,
                                                    {
                                                        name: 'the_team_1',
                                                    }
                                                )}
                                                isActive={
                                                    this.state.the_team_1
                                                }>
                                                Raw Player Ratings
                                            </SideNavMenuItem>
                                        </HashLink>
                                        <HashLink
                                            className="no-decoration-enforce"
                                            to="/the-team#fan-favorites">
                                            <SideNavMenuItem
                                                onClick={this.onClickTab.bind(
                                                    this,
                                                    {
                                                        name: 'the_team_2',
                                                    }
                                                )}
                                                isActive={
                                                    this.state.the_team_2
                                                }>
                                                Fan Favourites
                                            </SideNavMenuItem>
                                        </HashLink>
                                        <HashLink
                                            className="no-decoration-enforce"
                                            to="/the-team#the-a-word">
                                            <SideNavMenuItem
                                                onClick={this.onClickTab.bind(
                                                    this,
                                                    {
                                                        name: 'the_team_3',
                                                    }
                                                )}
                                                isActive={
                                                    this.state.the_team_3
                                                }>
                                                The A Word
                                            </SideNavMenuItem>
                                        </HashLink>
                                    </SideNavMenu>

                                    <SideNavMenu
                                        title="The Dugout"
                                        defaultExpanded>
                                        <HashLink
                                            className="no-decoration-enforce"
                                            to="/the-dugout#raw-manager-ratings">
                                            <SideNavMenuItem
                                                onClick={this.onClickTab.bind(
                                                    this,
                                                    {
                                                        name: 'the_dugout_1',
                                                    }
                                                )}
                                                isActive={
                                                    this.state.the_dugout_1
                                                }>
                                                Raw Manager Ratings
                                            </SideNavMenuItem>
                                        </HashLink>
                                        <HashLink
                                            className="no-decoration-enforce"
                                            to="/the-dugout#contrasting-fortunes">
                                            <SideNavMenuItem
                                                onClick={this.onClickTab.bind(
                                                    this,
                                                    {
                                                        name: 'the_dugout_2',
                                                    }
                                                )}
                                                isActive={
                                                    this.state.the_dugout_2
                                                }>
                                                Contrasting Fortunes
                                            </SideNavMenuItem>
                                        </HashLink>
                                        <HashLink
                                            className="no-decoration-enforce"
                                            to="/the-dugout#dead-man-walking">
                                            <SideNavMenuItem
                                                onClick={this.onClickTab.bind(
                                                    this,
                                                    {
                                                        name: 'the_dugout_3',
                                                    }
                                                )}
                                                isActive={
                                                    this.state.the_dugout_3
                                                }>
                                                Dead Man Walking
                                            </SideNavMenuItem>
                                        </HashLink>
                                    </SideNavMenu>

                                    <SideNavMenu
                                        title="Ratings Head2Head"
                                        defaultExpanded>
                                        <HashLink
                                            className="no-decoration-enforce"
                                            to="/ratings-head2head#whoscored">
                                            <SideNavMenuItem
                                                onClick={this.onClickTab.bind(
                                                    this,
                                                    {
                                                        name:
                                                            'ratings_head2head_1',
                                                    }
                                                )}
                                                isActive={
                                                    this.state
                                                        .ratings_head2head_1
                                                }>
                                                WhoScored
                                            </SideNavMenuItem>
                                        </HashLink>
                                        <HashLink
                                            className="no-decoration-enforce"
                                            to="/ratings-head2head#the-media">
                                            <SideNavMenuItem
                                                onClick={this.onClickTab.bind(
                                                    this,
                                                    {
                                                        name:
                                                            'ratings_head2head_2',
                                                    }
                                                )}
                                                isActive={
                                                    this.state
                                                        .ratings_head2head_2
                                                }>
                                                The Media
                                            </SideNavMenuItem>
                                        </HashLink>
                                    </SideNavMenu>
                                </SideNavItems>
                                {!this.state.about && (
                                    <div className="footer">
                                        <GitHubButton
                                            href="https://github.com/TathagataChakraborti/united-stand"
                                            data-size="small"
                                            data-show-count="true"
                                            aria-label="Stars on GitHub">
                                            Star
                                        </GitHubButton>
                                    </div>
                                )}
                            </SideNav>
                        </Header>
                    </Theme>
                )}
            />
        );
    }
}

export default PageHeader;
