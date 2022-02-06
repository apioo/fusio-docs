import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import {MdAssessment, MdBuild, MdMonetizationOn} from "react-icons/md";

const FeatureList = [
  {
    title: 'API management',
    Svg: MdBuild,
    description: (
      <>
      Fusio provides a powerful backend app to control and monitor your API.
      </>
    ),
  },
  {
    title: 'Developer portal',
    Svg: MdAssessment,
    description: (
      <>
      Fusio provides a developer portal app where developer can register to use your API.
      </>
    ),
  },
  {
    title: 'Monetization',
    Svg: MdMonetizationOn,
    description: (
      <>
      Fusio provides a simple payment system to charge for specific routes.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
