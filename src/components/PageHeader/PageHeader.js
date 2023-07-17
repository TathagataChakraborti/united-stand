import React from 'react';
import GitHubButton from 'react-github-btn';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { OUTLINE, getHomeName, isHome, transformRouteString, createRoute } from './Outline';
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

        const local_url_split = window.location.href.split('/#/');
        const endpoint = local_url_split[local_url_split.length - 1];
        const label = endpoint === '' ? getHomeName() : endpoint;

        this.state = {
            current: label,
            [label]: true,
        };
    }

    onClickTab = tabName => {
        this.setState({
            ...this.state,
            current: tabName,
            [this.state.current]: false,
            [tabName]: true,
        });
    };

    render() {
        return (
            <HeaderContainer
                render={({ isSideNavExpanded, onClickSideNavExpand }) => (
                    <Theme theme={isHome(this.state.current) ? 'g100' : 'g10'}>
                        <Header aria-label="Header" className={isHome(this.state.current) ? '' : 'activate-red'}>
                            <SkipToContent />
                            <HeaderMenuButton onClick={onClickSideNavExpand} isActive={isSideNavExpanded} aria-label="Toggle Contents" />
                            <HeaderName as={Link} to="/" prefix="Fun with data from" onClick={this.onClickTab.bind(this, getHomeName())}>
                                United Stand
                            </HeaderName>
                            <HeaderNavigation aria-label="Navigate out">
                                <HeaderMenuItem href="https://www.manutd.com" target="_blank" rel="noopener noreferrer">
                                    Manchester United
                                </HeaderMenuItem>
                                <HeaderMenuItem href="https://theunitedstand.com" target="_blank" rel="noopener noreferrer">
                                    United Stand
                                </HeaderMenuItem>
                            </HeaderNavigation>

                            <SideNav
                                className={isHome(this.state.current) ? '' : 'activate-red'}
                                expanded={isSideNavExpanded}
                                isPersistent={true}
                                aria-label="Side navigation">
                                <SideNavItems>
                                    {OUTLINE.filter(item => !item.children).map(item => (
                                        <SideNavLink
                                            key={item.name}
                                            as={Link}
                                            to={'/' + transformRouteString(item.name)}
                                            children={item.name}
                                            onClick={this.onClickTab.bind(this, item.name)}
                                            isActive={this.state[item.name]}
                                        />
                                    ))}
                                    <SideNavDivider />

                                    {OUTLINE.filter(item => item.children).map(item => (
                                        <SideNavMenu key={item.name} title={item.name} defaultExpanded>
                                            {item.children.map(child => (
                                                <HashLink key={child} className="no-decoration-enforce" to={'/' + createRoute(item, child, item.hashit)}>
                                                    <SideNavMenuItem
                                                        onClick={this.onClickTab.bind(this, createRoute(item, child))}
                                                        isActive={this.state[createRoute(item, child)]}>
                                                        {child}
                                                    </SideNavMenuItem>
                                                </HashLink>
                                            ))}
                                        </SideNavMenu>
                                    ))}
                                </SideNavItems>
                                {!this.state['About'] && (
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
