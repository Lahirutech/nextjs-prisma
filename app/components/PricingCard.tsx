// components/PricingCards.tsx
import React from "react";
import Image from "next/image";
import styles from "./PricingCards.module.css";

interface Feature {
  text: string;
  isIncluded: boolean;
}

interface PlanProps {
  title: string;
  description: string;
  features: Feature[];
  buttonText: string;
}

interface CardProps extends PlanProps {}

const CheckIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.checkIcon}
  >
    <path d="M20 6 9 17l-5-5"></path>
  </svg>
);

const PricingCard: React.FC<CardProps> = ({
  title,
  description,
  features,
  buttonText,
}) => (
  <div className={styles.card}>
    <figure className={styles.cardImage}>
      <Image
        src="https://tailwind-generator.b-cdn.net/images/card-generator/tailwind-card-generator-card-preview.png"
        alt="Card Preview"
        width={384}
        height={200}
        className={styles.image}
      />
    </figure>
    <div className={styles.cardContent}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardDescription}>{description}</p>
      <ul className={styles.featureList}>
        {features.map((feature, index) => (
          <li key={index} className={styles.featureItem}>
            {feature.isIncluded && <CheckIcon />}
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
      <div className={styles.buttonWrapper}>
        <button className={styles.button}>{buttonText}</button>
      </div>
    </div>
  </div>
);

const PricingCards: React.FC = () => {
  const plans: PlanProps[] = [
    {
      title: "Basic",
      description: "Basic features. Get started completely for free.",
      features: [
        { text: "Core Features", isIncluded: true },
        { text: "Limited Storage", isIncluded: true },
        { text: "Ticket Support", isIncluded: true },
      ],
      buttonText: "Get started - 100% Free",
    },
    {
      title: "Pro",
      description:
        "Get access to advanced features for increased productivity.",
      features: [
        { text: "All features of the basic plan", isIncluded: true },
        { text: "Increased Storage", isIncluded: true },
        { text: "Advanced Analytics", isIncluded: true },
        { text: "Reporting Tools", isIncluded: true },
        { text: "Third-Party Integrations", isIncluded: true },
        { text: "E-Mail Support", isIncluded: true },
      ],
      buttonText: "Buy Pro",
    },
    {
      title: "Premium",
      description: "Exclusive features and priority support for businesses.",
      features: [
        { text: "All features of the Pro plan", isIncluded: true },
        { text: "Unlimited Storage", isIncluded: true },
        { text: "End-to-End Encryption", isIncluded: true },
        { text: "Predictive Insights", isIncluded: true },
        { text: "Early-Access", isIncluded: true },
        { text: "Dedicated Account Manager", isIncluded: true },
        { text: "24/7 Dedicated Customer Support", isIncluded: true },
      ],
      buttonText: "Buy Premium",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.cardGrid}>
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default PricingCards;
