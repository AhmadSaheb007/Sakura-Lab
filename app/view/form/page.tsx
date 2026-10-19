import Link from "next/link";
import GrammarTable from "../../components/grammar-table";
import VerbConjugationSection from "../../components/verb-conjugation-section";
import adjectiveData from "../../data/n5-adjective-forms.json";
import conversationData from "../../data/n5-daily-conversation.json";
import particleData from "../../data/n5-particles.json";
import sentencePatternData from "../../data/n5-sentence-patterns.json";

export default function FormsPage() {
  return (
    <main className="forms-page">
      <section className="forms-hero">
        <div className="forms-hero-inner">
          <p className="eyebrow">
            <span className="eyebrow-dot" />
            A GENTLE GUIDE TO JAPANESE GRAMMAR
          </p>
          <h1>
            JLPT N5 Japanese Forms
            <span>&amp; Conjugation</span>
          </h1>
          <p className="forms-hero-description">
            Build a strong foundation with beginner-friendly examples,
            step-by-step verb forms, and clear explanations in English or
            Bangla.
          </p>
          <div className="forms-hero-count">
            <span aria-hidden="true">✿</span>
            N5 grammar essentials <i /> English &amp; Bangla support
          </div>
          <nav className="forms-jump-links" aria-label="Grammar topics">
            <Link href="#verb-forms">Verb forms</Link>
            <Link href="#adjectives">Adjectives</Link>
            <Link href="#particles">Particles</Link>
            <Link href="#sentence-patterns">Sentence patterns</Link>
            <Link href="#daily-conversation">Daily conversation</Link>
          </nav>
        </div>
      </section>

      <div className="forms-page-content">
        <VerbConjugationSection />

        <section className="forms-content-section" id="adjectives">
          <div className="forms-section-heading">
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              DESCRIBE THE WORLD AROUND YOU
            </p>
            <h2>Adjective forms</h2>
            <p>
              い-adjectives change their final い. な-adjectives keep their
              stem and use forms of です.
            </p>
          </div>
          <div className="forms-table-grid">
            {adjectiveData.groups.map((group) => (
              <GrammarTable
                key={group.id}
                rows={group.rows}
                subtitle={group.subtitle}
                title={group.title}
              />
            ))}
          </div>
        </section>

        <section className="forms-content-section" id="particles">
          <div className="forms-section-heading">
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              SMALL WORDS, BIG MEANING
            </p>
            <h2>Essential particles</h2>
            <p>
              Particles show how each word works in a sentence. Notice how the
              particle follows the word it describes.
            </p>
          </div>
          <GrammarTable
            rows={particleData}
            subtitle="Nine useful particles with everyday examples"
            title="N5 particles"
          />
        </section>

        <section className="forms-content-section" id="sentence-patterns">
          <div className="forms-section-heading">
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              PUT YOUR FIRST SENTENCES TOGETHER
            </p>
            <h2>Simple sentence patterns</h2>
            <p>
              Start with clear statements, then make questions, describe what
              exists, and talk about where you are going.
            </p>
          </div>
          <GrammarTable
            rows={sentencePatternData}
            subtitle="Affirmative, negative, question, existence, and movement"
            title="Build a sentence"
          />
        </section>

        <section className="forms-content-section" id="daily-conversation">
          <div className="forms-section-heading">
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              TAKE IT INTO EVERYDAY LIFE
            </p>
            <h2>Daily conversation</h2>
            <p>
              Use polite requests, invitations, suggestions, permission, and
              prohibition patterns in simple conversations.
            </p>
          </div>
          <GrammarTable
            rows={conversationData}
            subtitle="Useful expressions for your first conversations"
            title="Everyday expressions"
          />
        </section>

        <p className="chart-footnote forms-footnote">
          <span aria-hidden="true">✿</span> Each table has its own English and
          Bangla toggle. Keep practicing a little at a time.
        </p>
      </div>
    </main>
  );
}
