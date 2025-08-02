import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import {MdArticle, MdBuild, MdMonetizationOn, MdMonitorHeart, MdPeople, MdSettingsSuggest} from "react-icons/md";

const FeatureList = [
    {
        title: 'Building',
        Svg: MdBuild,
        description: (
            <>
                Fusio provides many ways to build new API endpoints
            </>
        ),
    },
    {
        title: 'Documentation',
        Svg: MdArticle,
        description: (
            <>
                Fusio contains a schema store to describe the request and response payloads.
            </>
        ),
    },
    {
        title: 'Monetization',
        Svg: MdMonetizationOn,
        description: (
            <>
                Fusio provides a simple way to monetize your existing API.
            </>
        ),
    },
    {
        title: 'Onboarding',
        Svg: MdPeople,
        description: (
            <>
                Fusio provides a ready to use developer portal where external developers can register.
                API.
            </>
        ),
    },
    {
        title: 'Integration',
        Svg: MdSettingsSuggest,
        description: (
            <>
                Fusio contains a powerful SDK generator.
            </>
        ),
    },
    {
        title: 'Monitoring',
        Svg: MdMonitorHeart,
        description: (
            <>
                Fusio provides an intuitive backend where you can monitor important aspects of your API.
            </>
        ),
    },
];

function Feature({Svg, title, description}) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img"/>
            </div>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
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
