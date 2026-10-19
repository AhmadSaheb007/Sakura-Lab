import grammarRules from "../../data/n5-survival-grammar.json";
import SurvivalGrammarCard from "../../components/survival-grammar-card";

const orderedRules = [...grammarRules].sort(
  (left, right) => left.order - right.order,
);

export default function SurvivalGrammarPage() {
  const totalExamples = grammarRules.reduce(
    (total, rule) => total + rule.examples.length,
    0,
  );

  return (
    <main className="survival-grammar-page">
      <section className="survival-grammar-hero">
        <div className="survival-grammar-hero-inner">
          <p className="eyebrow">
            <span className="eyebrow-dot" />
            PRACTICAL JAPANESE FOR EVERYDAY LIFE
          </p>
          <h1>
            Grammar to help you
            <span>find your way in Japan.</span>
          </h1>
          <p className="survival-grammar-intro">
            Start with the phrases you’re most likely to need: asking for help,
            finding your way, and making yourself understood. Rules are ordered
            from most important to less urgent.
          </p>
          <div className="survival-grammar-count">
            <span aria-hidden="true">✿</span>
            {grammarRules.length} practical patterns <i /> {totalExamples} useful
            examples
          </div>
        </div>
      </section>

      <section
        aria-label="Japanese grammar rules for everyday life"
        className="survival-grammar-content"
      >
        <div className="survival-grammar-grid">
          {orderedRules.map((rule) => (
            <SurvivalGrammarCard
              key={rule.id}
              rule={rule}
            />
          ))}
        </div>
        <p className="chart-footnote survival-grammar-footnote">
          <span aria-hidden="true">✿</span> Each rule has its own EN / BN
          toggle. Choose the language that helps you feel confident.
        </p>
      </section>
    </main>
  );
}
