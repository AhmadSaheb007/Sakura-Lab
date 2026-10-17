import Link from "next/link";
import phrases from "../../data/japanese-phrases.json";
import SentenceCard from "../../components/sentence-card";

export default function JapaneseQnaPage() {
  return (
    <main className="qna-page">
      <section className="qna-intro">
        <Link className="back-link" href="/#kana">
          <span aria-hidden="true">←</span> Back to the kana
        </Link>
        <p className="eyebrow">
          <span className="eyebrow-dot" />
          YOUR FIRST LITTLE CONVERSATION
        </p>
        <h1>
          Everyday Japanese,
          <span>made a little easier.</span>
        </h1>
        <p className="qna-description">
          Ten friendly conversations for the moments you’ll meet every day.
          Choose English or Bangla to switch the names, pronunciation, and
          meaning together.
        </p>
        <div className="phrase-count">
          <span aria-hidden="true">✿</span>
          {phrases.length} everyday conversations <i /> Beginner friendly
        </div>
      </section>

      <section
        className="phrase-section"
        aria-label="Everyday Japanese conversations"
      >
        <div className="phrase-grid">
          {phrases.map((phrase, index) => (
            <SentenceCard
              key={`conversation-${index + 1}`}
              number={index + 1}
              phrase={phrase}
            />
          ))}
        </div>
        <div className="qna-bottom-note">
          <span aria-hidden="true">✿</span>
          <p>
            Keep practicing a little every day — your next conversation starts
            here.
          </p>
        </div>
      </section>
    </main>
  );
}
