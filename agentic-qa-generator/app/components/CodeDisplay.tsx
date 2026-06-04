'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeDisplayProps {
  code: string;
  language: string;
}

export default function CodeDisplay({ code, language }: CodeDisplayProps) {
  const getLanguageForHighlighter = (framework: string): string => {
    switch (framework) {
      case 'playwright':
        return 'typescript';
      case 'jest':
        return 'typescript';
      case 'manual':
        return 'markdown';
      default:
        return 'typescript';
    }
  };

  return (
    <div className="rounded-lg overflow-hidden bg-slate-900 border border-slate-700">
      <SyntaxHighlighter
        language={getLanguageForHighlighter(language)}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          maxHeight: '600px',
          overflow: 'auto',
        }}
        showLineNumbers
        wrapLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
