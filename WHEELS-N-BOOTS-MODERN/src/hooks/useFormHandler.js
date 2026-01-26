import clsx from 'clsx'
import { useState } from 'react'

export default function useFormHandler(onSuccess) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e, data) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Replace with your API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      const result = await response.json()
      if (onSuccess) onSuccess(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, error, handleSubmit }
}
