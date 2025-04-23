import { useRef } from 'react'
import { Button } from '@/components/ui/ui/button'
import { X } from 'lucide-react'

interface FileUploadProps {
  files: File[]
  onFileChange: (files: File[]) => void
}

export default function FileUpload({ files, onFileChange }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleBrowse = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const newFiles = [...files, ...selectedFiles].slice(0, 50)
    onFileChange(newFiles)
  }

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    onFileChange(newFiles)
  }

  return (
    <div className="flex-1 flex flex-col gap-3 min-h-0">
      <Button 
        onClick={handleBrowse}
        className="bg-[#009999] hover:bg-[#007777] text-white font-sans w-full"
      >
        Browse Resumes
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept=".pdf,.doc,.docx"
        className="hidden"
      />
      <div className="flex-1 overflow-y-auto bg-white rounded-md border border-[#009999] p-3 min-h-0">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between p-2 rounded bg-gray-200 mb-2">
            <p className="text-sm truncate font-sans text-black">{file.name}</p>
            <button
              onClick={() => handleRemoveFile(index)}
              className="text-[#FF3333] hover:text-[#CC0000]"
              aria-label="Remove file"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        {files.length === 0 && (
          <p className="text-[#5E5E61] text-sm font-sans italic">No files selected</p>
        )}
      </div>
    </div>
  )
}

