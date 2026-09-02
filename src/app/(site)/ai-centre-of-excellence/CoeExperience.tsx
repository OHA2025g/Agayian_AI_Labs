import Link from "next/link";
import { WhiteSculpture } from "@/components/visualisations/glass/WhiteSculpture";
import { mockupAssets } from "@/config/mockup-assets";
import {
  foundations,
  intakeSteps,
  layers,
  maturity,
  outcomes,
  pillars,
  roadmap,
  whatFeatures,
  whyFeatures,
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

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>
            AI Centre of Excellence <b>›</b>
          </span>
          <h1>
            AI Centre of Excellence —{" "}
            <br />
            An operating model that
            <br />
            makes AI repeatable
          </h1>
          <p>
            Connect strategy, governance, platforms, talent and delivery so
            every use case stops restarting from zero.
          </p>
          <div className={styles.heroActions}>
            <ArrowLink href="/contact?interest=consultation">
              Book a Consultation
            </ArrowLink>
            <ArrowLink href="#operating-model" secondary>
              Explore the Operating Model
            </ArrowLink>
          </div>
        </div>
        <div className={styles.heroArchitecture}>
          <HeroStack items={layers} priority />
          <aside className={styles.outcomes}>
            <h3>Core outcomes</h3>
            <ul>
              {outcomes.map((item) => (
                <li key={item}>
                  <OutcomeCheck />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

function DefinitionSection() {
  return (
    <section className={styles.definitionGrid}>
      <article id="what">
        <h2>What an AI CoE is</h2>
        <p>
          A cross-functional capability that sets direction, enables standards,
          funds the right work and accelerates delivery across the enterprise.
        </p>
        <div className={styles.definitionFeatures}>
          {whatFeatures.map((feature) => (
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
        <h2>Why organisations need an AI CoE</h2>
        <p>
          Without a centre of excellence, AI efforts remain inconsistent, costly
          and hard to sustain.
        </p>
        <div className={styles.needFeatures}>
          {whyFeatures.map((feature) => (
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

function OperatingModel() {
  const left = layers.slice(0, 5);
  const right = layers.slice(5);

  return (
    <section className={styles.operatingModel} id="operating-model">
      <div className={styles.sectionHeading}>
        <h2>The AI CoE operating model</h2>
        <p>Nine integrated layers that turn strategy into measurable value.</p>
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

function IdeaToImpact() {
  return (
    <section className={styles.ideaImpact} id="idea-to-impact">
      <div>
        <h2>From idea to impact</h2>
        <p>
          A governed intake and decision process that funds and scales the right
          work.
        </p>
      </div>
      <div className={styles.stepFlow}>
        {intakeSteps.map((step, index) => (
          <div className={styles.step} key={step.title}>
            <span className={styles.roundIcon}>
              <CoeIcon name={step.icon} />
            </span>
            <strong>{step.title}</strong>
            <small>{step.description}</small>
            {index < intakeSteps.length - 1 ? (
              <i className={styles.stepLine} aria-hidden />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className={styles.pillars} id="pillars">
      <div className={styles.pillarIntro}>
        <h2>
          The CoE works
          <br />
          on three pillars
        </h2>
        <p>
          Three connected mandates that keep the model focused and
          outcomes-driven.
        </p>
        <Link href="#foundations">
          Learn more <span aria-hidden>→</span>
        </Link>
      </div>
      {pillars.map((pillar) => (
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

function Foundations() {
  return (
    <section className={styles.foundations} id="foundations">
      {foundations.map((column) => (
        <article key={column.title}>
          <h3>{column.title}</h3>
          <p>{column.description}</p>
          <ul>
            {column.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <FoundationSculpture name={column.sculpture} />
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
  items: typeof maturity | typeof roadmap;
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

function FinalCta() {
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
          Build an AI CoE that delivers
          <br />
          governed, measurable outcomes.
        </h2>
        <p>
          Partner with Agrayian AI Labs to design, build and scale your Centre
          of Excellence.
        </p>
      </div>
      <ArrowLink href="/contact?interest=consultation">
        Book a Consultation
      </ArrowLink>
    </section>
  );
}

export function CoeExperience() {
  return (
    <div className={styles.page}>
      <Hero />
      <div className={styles.content}>
        <DefinitionSection />
        <OperatingModel />
        <IdeaToImpact />
        <Pillars />
        <Foundations />
        <JourneyRow
          id="maturity"
          title="AI CoE maturity levels"
          subtitle="A progressive maturity journey to build capability and value over time."
          items={maturity}
        />
        <JourneyRow
          id="roadmap"
          title="Your roadmap to build and scale"
          subtitle="A phased approach tailored to your organisation's goals and context."
          items={roadmap}
        />
        <CoeFaq />
        <FinalCta />
      </div>
    </div>
  );
}
