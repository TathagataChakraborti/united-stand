import React from 'react';
import { Link } from 'carbon-components-react';
import { LogoTwitter32 } from '@carbon/icons-react';

const DATA = [
  {
    title: (
      <>
        <span style={{ color: 'silver' }}>
          Recent and Upcoming Events | Feb 14
        </span>
      </>
    ),
    description: null,
    link: null,
  },
  {
    title: 'A Crash Course in Designing Interpretable Agent Behavior',
    description: (
      <>
        <span style={{ color: 'silver' }}>
          Invited Talk at SSIR-HRI
          <br />
          (HRI) 2021
        </span>
      </>
    ),
    link: 'https://sites.google.com/view/realworldhri-workshop/home',
  },
  {
    title:
      'How Symbolic AI and ML can Combine for the Design of Conversational Agents at Scale',
    description: (
      <>
        <span style={{ color: 'silver' }}>
          Invited Talk at DEEP-DIAL
          <br />
          (AAAI) 2021
        </span>
      </>
    ),
    link: 'https://sites.google.com/view/deep-dial2021/',
  },
  {
    title: 'VAM-HRI Workshop',
    description: 'HRI 2021',
    link: 'https://vam-hri.github.io/',
  },
  {
    title: 'XAIP Workshop',
    description: 'ICAPS 2021',
    link: 'http://ibm.biz/xaip2021',
  },
  {
    title: (
      <>
        <Link>
          @tchakra2
          <LogoTwitter32 />
        </Link>
      </>
    ),
    description: null,
    link: 'https://twitter.com/tchakra2',
  },
];

export default DATA;
