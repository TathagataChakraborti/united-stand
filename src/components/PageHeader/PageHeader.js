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
  SideNavMenu,
  SideNavMenuItem,
  SideNavDivider,
} from 'carbon-components-react/lib/components/UIShell';

class PageHeader extends React.Component {
  constructor(props) {
    super();
    this.state = {
      current: 'introduction',
    };
  }

  onClickTab = (name, e) => {
    const old = this.state.current;
    const current = name.replaceAll('-', '');

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
            <Header aria-label="Header">
              <SkipToContent />
              <HeaderMenuButton
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
                aria-label="Toggle Contents"
              />
              <HeaderName element={Link} to="/" prefix="Fun with data from">
                United Stand
              </HeaderName>
              <HeaderNavigation aria-label="Navigate out">
                <HeaderMenuItem element={Link} to="/manutd">
                  Manchester United
                </HeaderMenuItem>
                <HeaderMenuItem element={Link} to="/united-stand">
                  United Stand
                </HeaderMenuItem>
              </HeaderNavigation>

              <SideNav
                isChildOfHeader
                expanded={isSideNavExpanded}
                isPersistent={true}
                aria-label="Side navigation">
                <SideNavItems>
                  <HeaderSideNavItems>
                    <SideNavLink
                      href="/#/introduction"
                      children="Introduction"
                      onClick={this.onClickTab.bind(this, 'introduction')}
                      isActive={this.state.introduction}
                    />

                    <SideNavMenu title="Overview" defaultExpanded>
                      <SideNavLink
                        href="/#/overview#the-season"
                        children="The Season"
                        onClick={this.onClickTab.bind(this, 'the-season')}
                        isActive={this.state.theseason}
                      />
                      <SideNavLink
                        href="/#/overview#ole-has-not-won-it-in-the-end"
                        children="Ole has not won it in the end"
                        onClick={this.onClickTab.bind(
                          this,
                          'ole-has-not-won-it-in-the-end'
                        )}
                        isActive={this.state.olehasnotwonitintheend}
                      />
                      <SideNavLink
                        href="/#/overview#hindsight-is-2020"
                        children="Hindsight is 2020"
                        onClick={this.onClickTab.bind(
                          this,
                          'hindsight-is-2020'
                        )}
                        isActive={this.state.hindsightis2020}
                      />
                    </SideNavMenu>

                    <SideNavMenu title="Fan Opinion" defaultExpanded>
                      <SideNavLink
                        href="/fan-opinion#by-the-numbers"
                        children="By the numbers"
                        onClick={this.onClickTab.bind(this, 'by-the-numbers')}
                        isActive={this.state.bythenumbers}
                      />
                      <SideNavLink
                        href="/fan-opinion#the-myth"
                        children="The Myth"
                        onClick={this.onClickTab.bind(this, 'the-myth')}
                        isActive={this.state.themyth}
                      />
                      <SideNavLink
                        href="/fan-opinion#traditional-media"
                        children="Traditional Media"
                        onClick={this.onClickTab.bind(
                          this,
                          'traditional-media'
                        )}
                        isActive={this.state.traditionalmedia}
                      />
                      <SideNavLink
                        href="/fan-opinion#the-eye-test"
                        children="The Eye Test"
                        onClick={this.onClickTab.bind(this, 'the-eye-test')}
                        isActive={this.state.theeyetest}
                      />
                    </SideNavMenu>

                    <SideNavMenu title="A Deeper Dive" defaultExpanded>
                      <SideNavLink
                        href="/a-deeper-dive#fan-favorites"
                        children="Fan Favorites"
                        onClick={this.onClickTab.bind(this, 'fan-favorites')}
                        isActive={this.state.fanfavorites}
                      />
                      <SideNavLink
                        href="/a-deeper-dive#the-dependables"
                        children="The Dependables"
                        onClick={this.onClickTab.bind(this, 'the-dependables')}
                        isActive={this.state.thedependables}
                      />
                      <SideNavLink
                        href="/a-deeper-dive#hero-to-zero"
                        children="Hero to Zero"
                        onClick={this.onClickTab.bind(this, 'hero-to-zero')}
                        isActive={this.state.herotozero}
                      />
                      <SideNavLink
                        href="/a-deeper-dive#the-inexplicables"
                        children="The Inexplicables"
                        onClick={this.onClickTab.bind(
                          this,
                          'the-inexplicables'
                        )}
                        isActive={this.state.theinexplicables}
                      />
                    </SideNavMenu>

                    <SideNavMenu title="The Agendas" defaultExpanded>
                      <SideNavLink
                        href="/the-agendas#the-a-word"
                        children="The A-word"
                        onClick={this.onClickTab.bind(this, 'the-a-word')}
                        isActive={this.state.theaword}
                      />
                      <SideNavLink
                        href="/the-agendas#daniel-james"
                        children="Daniel James"
                        onClick={this.onClickTab.bind(this, 'daniel-james')}
                        isActive={this.state.danieljames}
                      />
                      <SideNavLink
                        href="/the-agendas#the-luckhurst-effect"
                        children="The Luckhurst Effect"
                        onClick={this.onClickTab.bind(
                          this,
                          'the-luckhurst-effect'
                        )}
                        isActive={this.state.theluckhursteffect}
                      />
                      <SideNavLink
                        href="/the-agendas#omnishambles-in-magulof"
                        children="Omnishambles in MaguLof"
                        onClick={this.onClickTab.bind(
                          this,
                          'omnishambles-in-magulof'
                        )}
                        isActive={this.state.omnishamblesinmagulof}
                      />
                      <SideNavLink
                        href="/the-agendas#themcfred"
                        children="The McFred"
                        onClick={this.onClickTab.bind(this, 'the-mcfred')}
                        isActive={this.state.themcfred}
                      />
                    </SideNavMenu>

                    <SideNavMenu title="Conclusions" defaultExpanded>
                      <SideNavLink
                        href="/conclusions#looking-forward"
                        children="Looking Forward"
                        onClick={this.onClickTab.bind(this, 'looking-forward')}
                        isActive={this.state.lookingforward}
                      />
                      <SideNavLink
                        href="/conclusions#contributing"
                        children="Contributing"
                        onClick={this.onClickTab.bind(this, 'contributing')}
                        isActive={this.state.contributing}
                      />
                    </SideNavMenu>

                    <SideNavDivider />
                    <SideNavMenuItem>
                      <span className="page-numbers" id="page-views">
                        0
                      </span>{' '}
                      Views
                    </SideNavMenuItem>
                    <SideNavMenuItem>
                      <span className="page-numbers" id="page-likes">
                        0
                      </span>{' '}
                      Likes
                    </SideNavMenuItem>
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
