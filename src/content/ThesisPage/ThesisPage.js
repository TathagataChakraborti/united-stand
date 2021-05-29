import React from 'react';
import {
  Tag,
  Link,
  Button,
  StructuredListCell,
  StructuredListRow,
  StructuredListHead,
  StructuredListWrapper,
  StructuredListBody,
} from 'carbon-components-react';

import Trophy32 from '@carbon/icons-react/lib/trophy/32';

class ThesisPage extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div
        className="bx--grid bx--grid--full-width landing-page landing-page__banner"
        style={{ minHeight: '100vh' }}>
        <div className="offset">
          <div className="bx--row">
            <div className="bx--col-lg-10">
              <h1>
                Foundations of Human-Aware Planning:
                <br />A Tale of Three Models
              </h1>

              <br />
              <br />
              <p>
                A critical challenge in the design of AI systems that operate
                with humans in the loop is to be able to model the intentions
                and capabilities of the humans, as well as their beliefs and
                expectations of the AI system itself. This allows the AI system
                to be "human- aware" -- i.e. the human task model enables it to
                envisage desired roles of the human in joint action, while the
                human mental model allows it to anticipate how its own actions
                are perceived from the point of view of the human. In my
                research, I explore how these concepts of human-awareness
                manifest themselves in the scope of planning or sequential
                decision making with humans in the loop. To this end, I will
                show (1) how the AI agent can leverage the human task model to
                generate symbiotic behavior; and (2) how the introduction of the
                human mental model in the deliberative process of the AI agent
                allows it to generate explanations for a plan or resort to
                explicable plans when explanations are not desired. The latter
                is in addition to traditional notions of human-aware planning
                which typically use the human task model alone and thus enables
                a new suite of capabilities of a human-aware AI agent. Finally,
                I will explore how the AI agent can leverage emerging
                mixed-reality interfaces to realize effective channels of
                communication with the human in the loop.
              </p>

              <br />
              <br />

              <Tag type="magenta" name="xai">
                {' '}
                XAI{' '}
              </Tag>
              <Tag type="teal" name="hri">
                {' '}
                HRI{' '}
              </Tag>
              <Tag type="blue" name="support">
                {' '}
                Support{' '}
              </Tag>
              <Tag type="red" name="vamhri">
                {' '}
                Mixed Reality{' '}
              </Tag>
              <Tag type="warm-gray" name="humanai">
                {' '}
                Human-AI{' '}
              </Tag>

              <br />
              <br />
            </div>

            <div className="bx--col-lg-6">
              <StructuredListWrapper className="low-margin">
                <StructuredListHead>
                  <StructuredListRow head>
                    <StructuredListCell head>Advisor</StructuredListCell>
                  </StructuredListRow>
                </StructuredListHead>
                <StructuredListBody>
                  <StructuredListRow className="no-border">
                    <StructuredListCell>
                      <Link
                        href="http://rakaposhi.eas.asu.edu/"
                        target="_blank">
                        Subbarao Kambhampati
                      </Link>{' '}
                      | Arizona State University
                    </StructuredListCell>
                  </StructuredListRow>
                </StructuredListBody>
                <StructuredListHead>
                  <StructuredListRow head>
                    <StructuredListCell head>
                      Committee Members
                    </StructuredListCell>
                  </StructuredListRow>
                </StructuredListHead>
                <StructuredListBody>
                  <StructuredListRow>
                    <StructuredListCell>
                      <Link
                        href="https://researcher.watson.ibm.com/researcher/view.php?person=us-krtalamad"
                        target="_blank">
                        Kartik Talamadupula
                      </Link>{' '}
                      | IBM Research AI
                    </StructuredListCell>
                  </StructuredListRow>
                  <StructuredListRow>
                    <StructuredListCell>
                      <Link
                        href="https://engineering.tufts.edu/people/faculty/matthias-scheutz"
                        target="_blank">
                        Matthias Scheutz
                      </Link>{' '}
                      | Tufts University
                    </StructuredListCell>
                  </StructuredListRow>
                  <StructuredListRow>
                    <StructuredListCell>
                      <Link
                        href="http://henibenamor.weebly.com/"
                        target="_blank">
                        Heni Ben Amor
                      </Link>{' '}
                      | Arizona State University
                    </StructuredListCell>
                  </StructuredListRow>
                  <StructuredListRow className="no-border">
                    <StructuredListCell>
                      <Link
                        href="http://www.public.asu.edu/~yzhan442/"
                        target="_blank">
                        Yu Zhang
                      </Link>{' '}
                      | Arizona State University
                    </StructuredListCell>
                  </StructuredListRow>
                </StructuredListBody>
              </StructuredListWrapper>
            </div>
          </div>

          <br />

          <span>
            <Trophy32 /> ICAPS 2019 Best Dissertation Award (Honorable Mention){' '}
          </span>
          <br />
          <span>
            <Trophy32 /> ASU CIDSE Outstanding Graduate Student Award 2019{' '}
          </span>

          <br />
          <br />
          <br />
          <br />

          <Link
            href="https://repository.asu.edu/items/51791"
            target="_blank"
            className="no-decoration-enforce">
            <Button size="field" kind="secondary">
              Read More
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ThesisPage;
