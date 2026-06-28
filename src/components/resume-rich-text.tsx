import { Fragment, type ReactNode } from "react";

const RESUME_STRONG_PATTERN = /\*\*(.+?)\*\*/g;

export function stripResumeFormatting(text: string) {
  return text.replace(RESUME_STRONG_PATTERN, "$1");
}

export function renderResumeInlineText(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(RESUME_STRONG_PATTERN)) {
    const matchIndex = match.index ?? 0;
    const fullMatch = match[0];
    const strongText = match[1];

    if (matchIndex > lastIndex) {
      parts.push(text.slice(lastIndex, matchIndex));
    }

    parts.push(
      <strong key={`${matchIndex}-${strongText}`} className="resume-inline-strong">
        {strongText}
      </strong>,
    );

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  if (parts.length === 0) {
    return text;
  }

  return parts.map((part, index) => <Fragment key={index}>{part}</Fragment>);
}
