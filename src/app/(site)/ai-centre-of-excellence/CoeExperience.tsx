import Link from "next/link";
import { WhiteSculpture } from "@/components/visualisations/glass/WhiteSculpture";
import { mockupAssets } from "@/config/mockup-assets";
import type { CoePageContent } from "@/lib/cms/page-content";
import {
  foundations as fallbackFoundations,
  intakeSteps as fallbackIntake,
  layers as fallbackLayers,
  maturity as fallbackMaturity,
  outcomes as fallbackOutcomes,
  pillars as fallbackPillars,
  roadmap as fallbackRoadmap,
  whatFeatures as fallbackWhat,
  whyFeatures as fallbackWhy,
  type IconName,
  type Layer,
} from "./coe-content";
import { CoeFaq } from "./CoeFaq";
import {
  ArrowLink,
  CoeCubeCluster,
  CoeIcon,
  CoeTower,
  FoundationSculpture,
  HeroStack,
  LayerItem,
  OutcomeCheck,
} from "./CoeVisuals";
import styles from "./ai-coe.module.css";

function asIcon(value: string | undefined): IconName {
  return (value || "blocks") as IconName;
}

function resolveCoeModel(copy: CoePageContent) {
  return {
    layers: (copy.layers.length ? copy.layers : fallbackLayers).map((item) => ({
      ...item,
      icon: asIcon(item.icon),
    })) as Layer[],
    outcomes: copy.outcomes.length ? copy.outcomes : fallbackOutcomes,
    whatFeatures: (copy.whatFeatures.length ? copy.whatFeatures : fallbackWhat).map(
      (item) => ({ ...item, icon: asIcon(item.icon) }),
    ),
    whyFeatures: (copy.whyFeatures.length ? copy.whyFeatures : fallbackWhy).map(
      (item) => ({ ...item, icon: asIcon(item.icon) }),
    ),
    intakeSteps: (copy.intakeSteps.length ? copy.intakeSteps : fallbackIntake).map(
      (item) => ({ ...item, icon: asIcon(item.icon) }),
    ),
    pillars: (copy.pillars.length ? copy.pillars : fallbackPillars).map((item) => ({
      ...item,
      icon: asIcon(item.icon),
    })),
    foundations: (copy.foundations.length
      ? copy.foundations
      : fallbackFoundations
    ).map((item) => ({
      ...item,
      icon: asIcon(item.icon),
      sculpture: item.sculpture || "direct",
    })),
    maturity: (copy.maturity.length ? copy.maturity : fallbackMaturity).map(
      (item) => ({ ...item, icon: asIcon(item.icon) }),
    ),
    roadmap: (copy.roadmap.length ? copy.roadmap : fallbackRoadmap).map((item) => ({
      ...item,
      icon: asIcon(item.icon),
    })),
    faqItems: copy.faqItems,
  };
}

function Hero({ copy }: { copy: CoePageContent }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>
            {copy.hero.eyebrow} <b>›</b>
          </span>
          <h1>
            {copy.hero.title ===
            "AI Centre of Excellence — An operating model that makes AI repeatable" ? (
              <>
                AI Centre of Excellence —{" "}
                <br />
                An operating model that
                <br />
                makes AI repeatable
              </>
            ) : (
              copy.hero.title
            )}
          </h1>
          <p>{copy.hero.description}</p>
          <div className={styles.heroActions}>
            <ArrowLink href={copy.hero.primaryCtaHref}>
              {copy.hero.primaryCtaLabel}
            </ArrowLink>
            <ArrowLink href={copy.hero.secondaryCtaHref} secondary>
              {copy.hero.secondaryCtaLabel}
            </ArrowLink>
          </div>
        </div>
        <div className={styles.heroArchitecture}>
          <HeroStack items={resolveCoeModel(copy).layers} priority />
        </div>
        <aside className={styles.outcomes}>
          <h3>{copy.outcomesTitle}</h3>
          <ul>
            {resolveCoeModel(copy).outcomes.map((item) => (
              <li key={item}>
                <OutcomeCheck />
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

function DefinitionSection({ copy }: { copy: CoePageContent }) {
  return (
    <section className={styles.definitionGrid}>
      <article id="what">
        <h2>{copy.whatTitle}</h2>
        <p>{copy.whatBody}</p>
        <div className={styles.definitionFeatures}>
          {resolveCoeModel(copy).whatFeatures.map((feature) => (
            <div className={styles.miniFeature} key={feature.title}>
              <span className={styles.roundIcon}>
                <CoeIcon name={feature.icon} size={22} />
              </span>
              <strong>{feature.title}</strong>
              <small>{feature.detail}</small>
            </div>
          ))}
        </div>
      </article>
      <article id="why">
        <h2>{copy.whyTitle}</h2>
        <p>{copy.whyBody}</p>
        <div className={styles.needFeatures}>
          {resolveCoeModel(copy).whyFeatures.map((feature) => (
            <div className={styles.miniFeature} key={feature.title}>
              <span className={styles.roundIcon}>
                <CoeIcon name={feature.icon} size={22} />
              </span>
              <strong>{feature.title}</strong>
              <small>{feature.detail}</small>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function OperatingModel({ copy }: { copy: CoePageContent }) {
  const layers = resolveCoeModel(copy).layers;
  const left = layers.slice(0, 5);
  const right = layers.slice(5);

  return (
    <section className={styles.operatingModel} id="operating-model">
      <div className={styles.sectionHeading}>
        <h2>{copy.operatingTitle}</h2>
        <p>{copy.operatingDescription}</p>
      </div>
      <div className={styles.modelGrid}>
        <div className={styles.layerColumn}>
          {left.map((layer) => (
            <LayerItem key={layer.number} layer={layer} />
          ))}
        </div>
        <CoeTower compact />
        <div className={styles.layerColumn}>
          {right.map((layer) => (
            <LayerItem key={layer.number} layer={layer} />
          ))}
        </div>
        <aside className={styles.modelCallout}>
          <span className={styles.roundIcon}>
            <CoeIcon name="model" />
          </span>
          <h3>
            One model.
            <br />
            End-to-end impact.
          </h3>
          <p>
            Each layer connects to the others with clear inputs, outputs and
            accountabilities to remove friction and accelerate outcomes.
          </p>
          <CoeCubeCluster />
        </aside>
      </div>
    </section>
  );
}

function IdeaToImpact({ copy }: { copy: CoePageContent }) {
  return (
    <section className={styles.ideaImpact} id="idea-to-impact">
      <div>
        <h2>{copy.ideaTitle}</h2>
        <p>{copy.ideaDescription}</p>
      </div>
      <div className={styles.stepFlow}>
        {resolveCoeModel(copy).intakeSteps.map((step, index) => (
          <div className={styles.step} key={step.title}>
            <span className={styles.roundIcon}>
              <CoeIcon name={step.icon} />
            </span>
            <strong>{step.title}</strong>
            <small>{step.description}</small>
            {index < resolveCoeModel(copy).intakeSteps.length - 1 ? (
              <i className={styles.stepLine} aria-hidden />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function Pillars({ copy }: { copy: CoePageContent }) {
  return (
    <section className={styles.pillars} id="pillars">
      <div className={styles.pillarIntro}>
        <h2>
            {copy.pillarsTitle === "The CoE works on three pillars" ? (
              <>
                The CoE works
                <br />
                on three pillars
              </>
            ) : (
              copy.pillarsTitle
            )}
          </h2>
        <p>{copy.pillarsDescription}</p>
        <Link href="#foundations">
          Learn more <span aria-hidden>→</span>
        </Link>
      </div>
      {resolveCoeModel(copy).pillars.map((pillar) => (
        <article key={pillar.title}>
          <span className={styles.pillarIcon}>
            <CoeIcon name={pillar.icon} size={38} />
          </span>
          <div>
            <h3>{pillar.title}</h3>
            <p>{pillar.description}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function Foundations({ copy }: { copy: CoePageContent }) {
  return (
    <section className={styles.foundations} id="foundations">
      {resolveCoeModel(copy).foundations.map((column) => (
        <article key={column.title}>
          <h3>{column.title}</h3>
          <p>{column.description}</p>
          <ul>
            {column.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <FoundationSculpture
            name={
              (
                [
                  "governance",
                  "factory",
                  "platform",
                  "talent",
                  "value",
                ] as const
              ).includes(
                column.sculpture as
                  | "governance"
                  | "factory"
                  | "platform"
                  | "talent"
                  | "value",
              )
                ? (column.sculpture as
                    | "governance"
                    | "factory"
                    | "platform"
                    | "talent"
                    | "value")
                : "governance"
            }
          />
        </article>
      ))}
    </section>
  );
}

function JourneyRow({
  id,
  title,
  subtitle,
  items,
}: {
  id: string;
  title: string;
  subtitle: string;
  items: { name: string; description: string; icon: IconName }[];
}) {
  return (
    <section className={styles.journeyRow} id={id}>
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className={styles.journeyItems}>
        {items.map((item, index) => (
          <article key={item.name}>
            <span className={styles.roundIcon}>
              <CoeIcon name={item.icon} />
            </span>
            <strong>{item.name}</strong>
            <small>{item.description}</small>
            {index < items.length - 1 ? <i aria-hidden /> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function FinalCta({ copy }: { copy: CoePageContent }) {
  return (
    <section className={styles.finalCta}>
      <WhiteSculpture
        src={mockupAssets.coeCtaWaves}
        alt=""
        width={1536}
        height={512}
        multiply={false}
        className={`${styles.ctaWaves} bg-transparent`}
        imageClassName="h-[72px] w-full object-cover"
      />
      <div>
        <h2>
            {copy.ctaTitle ===
            "Build an AI CoE that delivers governed, measurable outcomes." ? (
              <>
                Build an AI CoE that delivers
                <br />
                governed, measurable outcomes.
              </>
            ) : (
              copy.ctaTitle
            )}
          </h2>
        <p>{copy.ctaDescription}</p>
      </div>
      <ArrowLink href={copy.hero.primaryCtaHref}>
        {copy.hero.primaryCtaLabel}
      </ArrowLink>
    </section>
  );
}

export function CoeExperience({ copy }: { copy: CoePageContent }) {
  return (
    <div className={styles.page}>
      <Hero copy={copy} />
      <div className={styles.content}>
        <DefinitionSection copy={copy} />
        <OperatingModel copy={copy} />
        <IdeaToImpact copy={copy} />
        <Pillars copy={copy} />
        <Foundations copy={copy} />
        <JourneyRow
          id="maturity"
          title={copy.maturityTitle}
          subtitle={copy.maturityDescription}
          items={resolveCoeModel(copy).maturity}
        />
        <JourneyRow
          id="roadmap"
          title={copy.roadmapTitle}
          subtitle={copy.roadmapDescription}
          items={resolveCoeModel(copy).roadmap}
        />
        <CoeFaq items={copy.faqItems} />
        <FinalCta copy={copy} />
      </div>
    </div>
  );
}
