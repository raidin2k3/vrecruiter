import LoadingSpinner from './LoadingSpinner';
import Markdown from 'markdown-to-jsx';

interface ResultsDisplayProps {
  results: string | { result: string } | null;
  isLoading: boolean;
}

export default function ResultsDisplay({ results, isLoading }: ResultsDisplayProps) {
  const displayResults = (): string => {
    if (!results) return "No content to display.";

    try {
      const content = results;

      if (typeof content === "string") {
        return content || "No content to display.";
      }

      if (content && typeof content === "object" && "result" in content) {
        return content.result || "No content to display.";
      }

      return String(content);
    } catch (e) {
      console.error('Error parsing results:', e);
      return "No relevant matches found for the candidate selection criteria provided. Please try adjusting your requirements or upload different resumes.";
    }
  };

  const markdown = displayResults();

  return (
    <div className="h-full bg-white p-6 rounded-lg border border-[#009999] shadow-md overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4 text-[#003399] font-sans">Results</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : results ? (
        <div className="prose prose-sm max-w-none font-sans text-[#000000] leading-relaxed">
          <Markdown
            options={{
              overrides: {
                h1: { props: { className: 'text-2xl font-bold mb-4' } },
                h2: { props: { className: 'text-xl font-bold mb-3' } },
                h3: { props: { className: 'text-lg font-bold mb-2' } },
                p: { props: { className: 'mb-4' } },
                ul: { props: { className: 'list-disc pl-5 mb-4' } },
                li: { props: { className: 'mb-2' } },
              },
            }}
          >
            {markdown}
          </Markdown>
        </div>
      ) : (
        <p className="text-[#5E5E61] italic font-sans">Results will appear here after analysis</p>
      )}
    </div>
  )
}
