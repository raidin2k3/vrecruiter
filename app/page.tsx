import Image from 'next/image'
import ResumeSelector from './components/ResumeSelector'
import { Brain } from 'lucide-react'
import axios from 'axios'

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-[#F5F5F5] overflow-hidden">
      <header className="bg-[#003399] text-white py-3">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
            {/* <Image
              src=""
              alt="Add Image"
              width={120}
              height={40}
              className="mr-4"
              priority
            /> */}
            <h1 className="text-3xl font-bold">Talent Assist</h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-4 flex-grow overflow-hidden">
        <ResumeSelector />
      </main>
      <footer className="bg-[#FF3333] text-white py-3">
        <div className="container mx-auto px-6 flex items-center justify-center">
          <Brain className="mr-2" />
          <p className="font-sans">Caution: AI Generated Responses</p>
        </div>
      </footer>
    </div>
  )
}

