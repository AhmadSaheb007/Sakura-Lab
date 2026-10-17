"use client";

import { useState } from "react";
import PronunciationToggle, {
  type PronunciationLanguage,
} from "./pronunciation-toggle";

interface ConversationMessage {
  speaker: string;
  japanese: string;
  romaji: string;
  bangla: string;
  english: string;
  bengali: string;
}

interface JapaneseConversation {
  messages: ConversationMessage[];
}

interface SentenceCardProps {
  phrase: JapaneseConversation;
  number: number;
}

function getSpeakerName(
  speaker: string,
  language: PronunciationLanguage,
): string {
  switch (speaker) {
    case "ahmad":
      return language === "bn" ? "আহমাদ" : "Ahmad";
    case "sobuj":
      return language === "bn" ? "সবুজ" : "Sobuj";
    default:
      throw new Error(`Unknown conversation speaker: ${speaker}`);
  }
}

export default function SentenceCard({ phrase, number }: SentenceCardProps) {
  const [language, setLanguage] = useState<PronunciationLanguage>("en");

  return (
    <article className="sentence-card">
      <div className="sentence-card-top">
        <span className="sentence-number">
          {String(number).padStart(2, "0")}
        </span>
        <PronunciationToggle language={language} onChange={setLanguage} />
      </div>
      <div className="sentence-content">
        <div className="conversation-messages">
          {phrase.messages.map((message) => (
            <div
              className={`conversation-message conversation-${message.speaker}`}
              key={`${message.speaker}-${message.japanese}`}
            >
              <div className="conversation-line">
                <span
                  className="conversation-speaker"
                  lang={language === "bn" ? "bn" : "en"}
                >
                  {getSpeakerName(message.speaker, language)}
                </span>
                <span className="conversation-arrow" aria-hidden="true">
                  :{" "}
                </span>
                <span className="sentence-japanese" lang="ja">
                  {message.japanese}
                </span>
                <p
                  className="sentence-reading"
                  lang={language === "bn" ? "bn" : "en"}
                >
                  {language === "bn" ? message.bangla : message.romaji}
                </p>
                <p
                  className="sentence-translation"
                  lang={language === "bn" ? "bn" : "en"}
                >
                  {language === "bn" ? message.bengali : message.english}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
