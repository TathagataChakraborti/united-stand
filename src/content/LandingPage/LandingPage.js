import React from 'react';
import { ReferenceList } from './data/References';
import { Reference, Instructor } from '../../components/Info';

import {
  StructuredListWrapper,
  StructuredListBody,
  Accordion,
  AccordionItem,
  UnorderedList,
  ListItem,
} from 'carbon-components-react';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className="bx--grid bx--grid--full-width container"
        style={{
          width: '100%',
          minHeight: '100vh',
          paddingTop: '50px',
        }}>
        <div className="bx--row">
          <div className="bx--col-lg-8">
            <a
              href="https://bpm2021.diag.uniroma1.it/"
              rel="noopener noreferrer"
              target="_blank"
              className="text-blue sub-title"
              style={{ textDecoration: 'none' }}>
              BPM 2021 Tutorial on
            </a>
            <h1 className="title">
              Automated Planning and Business Process Management
            </h1>

            <br />
            <br />
            <br />
            <br />

            <h4>Instructors</h4>
            <hr />

            <div className="bx--row">
              <Instructor
                props={{
                  image: 'andrea',
                  name: 'Andrea Marrella',
                  affiliation: 'Sapienza Università di Roma',
                  link:
                    'http://www.diag.uniroma1.it/~marrella/publications.html',
                }}
              />
              <Instructor
                props={{
                  image: 'tathagata',
                  name: 'Tathagata Chakraborti',
                  affiliation: 'IBM Research',
                  link: 'http://tchakra2.com',
                }}
              />
            </div>
          </div>
          <div className="bx--col-lg-8">
            <div className="videoWrapper">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/_q_ied5Xskk"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            </div>

            <br />
            <br />
            <br />
            <br />

            <h4>Tutorial Syllabus</h4>
            <hr />

            <p>
              Slides and material will become available at the time of the
              tutorial.
            </p>

            <br />
            <br />

            <Accordion align="start">
              <AccordionItem title="Introduction | 30 min" open>
                <UnorderedList>
                  <ListItem>Tutorial Overview | 5 min</ListItem>
                  <ListItem>Basics of Autoamted Planning | 15 min</ListItem>
                  <ListItem>
                    Autoamted Planning along the BPM Life-cycle | 10 min
                    <UnorderedList nested>
                      <ListItem>Declarative Modeling</ListItem>
                      <ListItem>Process Adaptation</ListItem>
                      <ListItem>Trace Alignment</ListItem>
                      <ListItem>Interpretability</ListItem>
                    </UnorderedList>
                  </ListItem>
                </UnorderedList>
              </AccordionItem>

              <AccordionItem title="Declarative Modeling | 20 min">
                <UnorderedList>
                  <ListItem>????</ListItem>
                  <ListItem>???</ListItem>
                  <ListItem>
                    Special Cases | 10 min
                    <UnorderedList nested>
                      <ListItem>
                        Design of conversational agents with underlying business
                        processes
                      </ListItem>
                      <ListItem>
                        Web service composision for business process automation
                      </ListItem>
                    </UnorderedList>
                  </ListItem>
                </UnorderedList>
              </AccordionItem>

              <AccordionItem title="Domain Adaptation | 10 min">
                <UnorderedList>
                  <ListItem>???</ListItem>
                  <ListItem>???</ListItem>
                </UnorderedList>
              </AccordionItem>

              <AccordionItem title="Trace Alignment | 10 min">
                <UnorderedList>
                  <ListItem>???</ListItem>
                  <ListItem>???</ListItem>
                  <ListItem>???</ListItem>
                </UnorderedList>
              </AccordionItem>

              <AccordionItem title="Interpretability | 20 min">
                <UnorderedList>
                  <ListItem>
                    Explainability for the domain author | 10 min
                  </ListItem>
                  <ListItem>Transparecny for the end-user | 10 min</ListItem>
                </UnorderedList>
              </AccordionItem>

              <AccordionItem title="Discussion | 10 min">
                <UnorderedList>
                  <ListItem>Tools for the planning researcher | 5 min</ListItem>
                  <ListItem>Conclusion | 5 min</ListItem>
                </UnorderedList>
              </AccordionItem>
            </Accordion>

            <br />
            <br />
            <br />
            <br />

            <h4>References</h4>
            <hr />

            <StructuredListWrapper>
              <StructuredListBody>
                {ReferenceList.map((item, key) => (
                  <React.Fragment key={key}>
                    <Reference props={item} />
                  </React.Fragment>
                ))}
              </StructuredListBody>
            </StructuredListWrapper>
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default LandingPage;
