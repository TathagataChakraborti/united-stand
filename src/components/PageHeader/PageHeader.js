import React from 'react';
import { Link } from 'react-router-dom';

import HeaderContainer from 'carbon-components-react/lib/components/UIShell/HeaderContainer';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  SkipToContent,
} from 'carbon-components-react/lib/components/UIShell';

class PageHeader extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-label="Header">
              <SkipToContent />
              <HeaderName element={Link} to="/" prefix="BPM 2021 Tutorial">
                Planning and BPM
              </HeaderName>
              <HeaderNavigation aria-label="Navigate out">
                <HeaderMenuItem element={Link} to="/bpm">
                  BPM 2021
                </HeaderMenuItem>
                <HeaderMenuItem element={Link} to="/icaps">
                  ICAPS 2021
                </HeaderMenuItem>
              </HeaderNavigation>
            </Header>
          </>
        )}
      />
    );
  }
}

export default PageHeader;
