"use client";

import { useState } from "react";
import { WhiteSculpture } from "@/components/visualisations/glass/WhiteSculpture";
import { mockupAssets } from "@/config/mockup-assets";
import { faqItems as fallbackFaqs } from "./coe-content";
import styles from "./ai-coe.module.css";

export function CoeFaq({
  items,
}: {
  items?: { question: string; answer: string }[];
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className={styles.faq} id="faq">
      <div className={styles.faqArt}>
        <h2>Frequently asked questions</h2>
        <WhiteSculpture
          src={mockupAssets.coeFaqFlow}
          alt=""
          width={1536}
          height={864}
          multiply={false}
          className={`${styles.faqSculpture} bg-transparent`}
        />
      </div>
      <div className={styles.accordion}>
        {(items?.length ? items : fallbackFaqs).map((item, index) => {
          const isOpen = open === index;
          const panelId = `coe-faq-panel-${index}`;
          const buttonId = `coe-faq-button-${index}`;
          return (
            <article
              key={item.question}
              className={isOpen ? styles.faqOpen : undefined}
            >
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <b aria-hidden>{isOpen ? "−" : "+"}</b>
              </button>
              <div id={panelId} role="region" aria-labelledby={buttonId}>
                <p>{item.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
