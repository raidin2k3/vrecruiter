'use server'

export async function selectResumes(prompt: string, files: File[]) {
  const formData = new FormData()
  
  console.log('=== Starting Resume Selection ===')
  console.log('Files being sent:', files.map(f => ({name: f.name, size: f.size})))
  console.log('Job requirements length:', prompt.length)
  
  // Append files to form data
  files.forEach((file) => {
    formData.append('files', file)
    console.log(`Appending file: ${file.name} (${file.size} bytes)`)
  })
  
  // Create job_details object
  const jobDetails = {
    requirements: prompt
  }
  
  // Append job_details as a string
  formData.append('job_details', JSON.stringify(jobDetails))

  try {
    console.log('Sending request to API...')
    const response = await fetch('http://localhost:8000/api/resumeCatcher', {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      console.error('API Error:', errorData)
      throw new Error(errorData.detail || 'API request failed')
    }
    
    const data = await response.json()
    console.log('=== API Response Details ===')
    console.log('Success:', data.success)
    console.log('Has result:', !!data.result)
    console.log('Result type:', typeof data.result)
    if (data.result?.tasks_output) {
      console.log('Number of tasks:', data.result.tasks_output.length)
    }
    return { success: true, results: data.result || data.results }
  } catch (error) {
    console.error('Error processing resumes:', error)
    return {
      success: false,
      error: 'Failed to process resumes'
    }
  }
}

