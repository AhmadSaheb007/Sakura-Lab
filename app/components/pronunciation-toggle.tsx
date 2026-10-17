export type PronunciationLanguage = "en" | "bn";

interface PronunciationToggleProps {
  language: PronunciationLanguage;
  onChange: (language: PronunciationLanguage) => void;
}

export default function PronunciationToggle({
  language,
  onChange,
}: PronunciationToggleProps) {
  return (
    <div
      className="language-toggle"
      role="group"
      aria-label="Choose pronunciation language"
    >
      <button
        aria-pressed={language === "en"}
        className={language === "en" ? "selected" : ""}
        onClick={() => onChange("en")}
        type="button"
      >
        En
      </button>
      <button
        aria-pressed={language === "bn"}
        className={language === "bn" ? "selected" : ""}
        onClick={() => onChange("bn")}
        type="button"
      >
        Bn
      </button>
    </div>
  );
}
