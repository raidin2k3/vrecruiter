'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/ui/button'
import { Textarea } from '@/components/ui/ui/textarea'
import FileUpload from './FileUpload'
import ProgressBar from './ProgressBar'
import ResultsDisplay from './ResultsDisplay'
import { selectResumes } from '../actions/selectResumes'

export default function ResumeSelector() {
  const [prompt, setPrompt] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [results, setResults] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => {
      const allFiles = [...prevFiles, ...newFiles]
      return Array.from(new Map(allFiles.map(file => [file.name, file])).values());
    });
  }

  const handleSelectResume = async () => {
    if (files.length === 0) return
    
    setIsLoading(true)
    try {
      const response = await selectResumes(prompt, files)
      if (response.success) {
        setResults(response.results)
      } else {
        console.error('Error:', response.error)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRedo = () => {
    setPrompt('')
    setFiles([])
    setResults(null)
  }

  const isAIFinderDisabled = prompt.trim() === '' || files.length === 0

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-1/2 flex flex-col gap-4 h-full overflow-hidden">
        <Textarea
          placeholder="Enter your resume selection criteria..."
          value={prompt}
          onChange={handlePromptChange}
          className="h-[380px] bg-white border-[#009999] rounded-md font-sans text-base resize-none text-black"
        />
        <div className="flex gap-4">
          <Button 
            onClick={handleSelectResume} 
            disabled={isAIFinderDisabled || isProcessing || isLoading}
            className="bg-[#003399] hover:bg-[#002277] text-white font-sans flex-1"
          >
            Shoot
          </Button>
          <Button 
            onClick={handleRedo}
            variant="outline"
            className="border-[#FF3333] text-[#FF3333] hover:bg-[#FFEEEE] font-sans flex-1"
          >
            Redo
          </Button>
        </div>
        <FileUpload files={files} onFileChange={handleFileChange} />
        {isProcessing && <ProgressBar />}
      </div>
      <div className="w-full lg:w-1/2 h-full overflow-hidden">
        <ResultsDisplay results={results} isLoading={isLoading} />
      </div>
    </div>
  )
}

