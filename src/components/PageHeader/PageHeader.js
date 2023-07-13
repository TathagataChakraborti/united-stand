import React from 'react';
import GitHubButton from 'react-github-btn';
import { Link } from 'react-router-dom';
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
                        <Header aria-label="Header">
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
                                    as={Link}
                                    to="/manutd"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    Manchester United
                                </HeaderMenuItem>
                                <HeaderMenuItem
                                    as={Link}
                                    to="/united-stand"
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
                                isChildOfHeader
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
                                </SideNavItems>
                                <div className="footer">
                                    <GitHubButton
                                        href="https://github.com/TathagataChakraborti/survey-visualizer"
                                        data-size="small"
                                        data-show-count="true"
                                        aria-label="Stars on GitHub">
                                        Star
                                    </GitHubButton>
                                </div>
                            </SideNav>
                        </Header>
                    </Theme>
                )}
            />
        );
    }
}

export default PageHeader;
