import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
    {
        title: 'Database API Gateway',
        emoji: '🔄',
        description: (
            <>
                Great for unlocking legacy data systems or enabling mobile app access.
            </>
        ),
    },
    {
        title: 'API Business Logic',
        emoji: '🧠',
        description: (
            <>
                Perfect for enterprise use cases requiring tailored backend logic.
            </>
        ),
    },
    {
        title: 'Gateway for Microservices',
        emoji: '🕸️',
        description: (
            <>
                Useful for modern service-oriented architectures or hybrid systems.
            </>
        ),
    },
    {
        title: 'API Developer Portal',
        emoji: '🌐',
        description: (
            <>
                Ideal for SaaS providers offering APIs to external developers.
            </>
        ),
    },
    {
        title: 'API Monetization',
        emoji: '💸',
        description: (
            <>
                Enable freemium or tiered access models with minimal effort.
            </>
        ),
    },
    {
        title: 'MCP Integration',
        emoji: '⚡',
        description: (
            <>
                Leverage the Model Context Protocol to enable AI-driven access and control of API endpoints.
            </>
        ),
    },
    {
        title: 'API Usage Analytics',
        emoji: '📊',
        description: (
            <>
                Essential for maintaining quality of service and detecting issues early.
            </>
        ),
    },
    {
        title: 'Headless CMS Backend',
        emoji: '📰',
        description: (
            <>
                Great for CMS-like applications where content is managed through APIs.
            </>
        ),
    },
    {
        title: 'SDK Automation',
        emoji: '📡',
        description: (
            <>
                Automatically generate SDKs (e.g., PHP, TypeScript, Python) based on your defined API schema.
            </>
        ),
    },
];

function Feature({emoji, title, description}) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <div className={styles.featureEmoji}>{emoji}</div>
            </div>
            <div className={styles.featureHeading}>
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
