import React from 'react';
import { Link } from 'react-router-dom';

import HeaderContainer from 'carbon-components-react/lib/components/UIShell/HeaderContainer';
import {
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderSideNavItems,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
} from 'carbon-components-react/lib/components/UIShell';

import { Home20 } from '@carbon/icons-react';
import { Microscope20 } from '@carbon/icons-react';
import { Report20 } from '@carbon/icons-react';
import { Rule20 } from '@carbon/icons-react';
import { PresentationFile20 } from '@carbon/icons-react';
import { Trophy20 } from '@carbon/icons-react';
import { Bullhorn20 } from '@carbon/icons-react';
import { Education20 } from '@carbon/icons-react';

class PageHeader extends React.Component {
  constructor(props) {
    super();
    this.state = {
      current: 'home',
      home: true,
      research: false,
      publications: false,
      patents: false,
      talks: false,
      awards: false,
      news: false,
      thesis: false,
    };
  }

  onClickTab = (name, e) => {
    const old = this.state.current;
    const current = name;

    this.setState({
      ...this.state,
      current: current,
      [old]: false,
      [current]: true,
    });
  };

  render() {
    return (
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-label="">
              <SkipToContent />
              <HeaderMenuButton
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
                aria-label=""
              />
              <HeaderName element={Link} to="/" prefix="Tathagata's">
                Home
              </HeaderName>
              <HeaderNavigation aria-label="">
                <HeaderMenuItem element={Link} to="/ibm">
                  IBM Research AI
                </HeaderMenuItem>
              </HeaderNavigation>
              <SideNav
                aria-label=""
                expanded={isSideNavExpanded}
                isPersistent={true}
                isRail={true}>
                <SideNavItems>
                  <HeaderSideNavItems>
                    <SideNavLink
                      element={Link}
                      to="/"
                      renderIcon={Home20}
                      children="Home"
                      onClick={this.onClickTab.bind(this, 'home')}
                      isActive={this.state.home}
                      large
                    />
                    <SideNavLink
                      href="/#research"
                      renderIcon={Microscope20}
                      children="Research"
                      onClick={this.onClickTab.bind(this, 'research')}
                      isActive={this.state.research}
                      large
                    />
                    <SideNavLink
                      href="/#publications"
                      renderIcon={Report20}
                      children="Publications"
                      onClick={this.onClickTab.bind(this, 'publications')}
                      isActive={this.state.publications}
                      large
                    />
                    <SideNavLink
                      href="/#thesis"
                      renderIcon={Education20}
                      children="Thesis"
                      onClick={this.onClickTab.bind(this, 'thesis')}
                      isActive={this.state.thesis}
                      large
                    />
                    <SideNavLink
                      href="/#patents"
                      renderIcon={Rule20}
                      children="Patents"
                      onClick={this.onClickTab.bind(this, 'patents')}
                      isActive={this.state.patents}
                      large
                    />
                    <SideNavLink
                      href="/#talks"
                      renderIcon={PresentationFile20}
                      children="Talks"
                      onClick={this.onClickTab.bind(this, 'talks')}
                      isActive={this.state.talks}
                      large
                    />
                    <SideNavLink
                      href="/#awards"
                      renderIcon={Trophy20}
                      children="Awards"
                      onClick={this.onClickTab.bind(this, 'awards')}
                      isActive={this.state.awards}
                      large
                    />
                    <SideNavLink
                      href="/#news"
                      renderIcon={Bullhorn20}
                      children="News"
                      onClick={this.onClickTab.bind(this, 'news')}
                      isActive={this.state.news}
                      large
                    />
                  </HeaderSideNavItems>
                </SideNavItems>
              </SideNav>
            </Header>
          </>
        )}
      />
    );
  }
}

export default PageHeader;
