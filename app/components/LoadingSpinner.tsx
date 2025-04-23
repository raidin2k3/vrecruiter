export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#009999]"></div>
      <p className="ml-4 text-[#009999] font-sans">Analyzing resumes...</p>
    </div>
  )
} 