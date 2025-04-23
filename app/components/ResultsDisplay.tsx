import LoadingSpinner from './LoadingSpinner';
import Markdown from 'markdown-to-jsx';

interface ResultsDisplayProps {
  results: string | { result: string } | null;
  isLoading: boolean;
}

export default function ResultsDisplay({ results, isLoading }: ResultsDisplayProps) {
  const displayResults = () => {
    if (!results) return null;
    
    try {
      // Parse the nested JSON structure
      // const parsed = typeof results === 'string' ? JSON.parse(results) : results;
      
      let content = results;
      
      // If we have raw content directly
      // if (parsed.raw) {
      //   content = parsed.raw;
      // }
      // // If we have tasks_output, get the last task's raw output
      // else if (parsed.tasks_output && parsed.tasks_output.length > 0) {
      //   const lastTask = parsed.tasks_output[parsed.tasks_output.length - 1];
      //   content = lastTask.raw;
      // }
      // // If we have a result property
      // else if (parsed.result) {
      //   const innerResult = typeof parsed.result === 'string' ? 
      //     JSON.parse(parsed.result) : parsed.result;
      //   content = innerResult.raw || innerResult;
      // }
      
      // // Check if content is empty or contains only brackets/empty objects
      // if (!content || content === '[]' || content === '{}' || content === '[[]]') {
      //   return "No relevant matches found for the candidate selection criteria provided. Please try adjusting your requirements or upload different resumes.";
      // }
      
      return content;
      
    } catch (e) {
      console.error('Error parsing results:', e);
      return "No relevant matches found for the candidate selection criteria provided. Please try adjusting your requirements or upload different resumes.";
    }
  };

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
            {displayResults()|| "No content to display."}
          </Markdown>
        </div>
      ) : (
        <p className="text-[#5E5E61] italic font-sans">Results will appear here after analysis</p>
      )}
    </div>
  )
}
  
  