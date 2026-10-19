"use client";

import { useState } from "react";
import PronunciationToggle, {
  type PronunciationLanguage,
} from "./pronunciation-toggle";

interface SurvivalExample {
  japanese: string;
  romaji: string;
  bangla: string;
  meaningEnglish: string;
  meaningBangla: string;
}

export interface SurvivalGrammarRule {
  id: string;
  order: number;
  priority: string;
  title: string;
  pattern: string;
  explanationEnglish: string;
  explanationBangla: string;
  examples: SurvivalExample[];
}

interface SurvivalGrammarCardProps {
  rule: SurvivalGrammarRule;
}

export default function SurvivalGrammarCard({
  rule,
}: SurvivalGrammarCardProps) {
  const [language, setLanguage] = useState<PronunciationLanguage>("en");

  return (
    <article className="survival-grammar-card">
      <div className="survival-card-header">
        <div className="survival-card-heading">
          <span className="survival-card-priority">
            {String(rule.order).padStart(2, "0")} · {rule.priority}
          </span>
          <h2>{rule.title}</h2>
        </div>
        <PronunciationToggle language={language} onChange={setLanguage} />
      </div>

      <p className="survival-pattern" lang="ja">
        {rule.pattern}
      </p>
      <p className="survival-explanation" lang={language === "bn" ? "bn" : "en"}>
        {language === "en" ? rule.explanationEnglish : rule.explanationBangla}
      </p>

      <div className="survival-examples">
        {rule.examples.map((example, index) => (
          <div
            className="survival-example"
            key={`${rule.id}-${example.japanese}`}
          >
            <span className="survival-example-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="survival-example-content">
              <p className="survival-example-japanese" lang="ja">
                {example.japanese}
              </p>
              <p
                className="survival-example-reading"
                lang={language === "bn" ? "bn" : "en"}
              >
                {language === "en" ? example.romaji : example.bangla}
              </p>
              <p
                className="survival-example-meaning"
                lang={language === "bn" ? "bn" : "en"}
              >
                {language === "en"
                  ? example.meaningEnglish
                  : example.meaningBangla}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
