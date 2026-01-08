'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface QuarterOption {
  quarter: 'fall' | 'winter' | 'spring'
  year: number
  label: string
  value: string
}

interface QuarterFilterProps {
  availableQuarters: Array<{ quarter: 'fall' | 'winter' | 'spring'; year: number }>
}

export function QuarterFilter({ availableQuarters }: QuarterFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Create quarter options from available quarters
  const quarterOptions: QuarterOption[] = availableQuarters
    .filter(({ quarter, year }) => quarter && year) // Filter out any invalid entries
    .map(({ quarter, year }) => {
      const quarterLabel = quarter.charAt(0).toUpperCase() + quarter.slice(1)
      return {
        quarter,
        year,
        label: `${quarterLabel} ${year}`,
        value: `${quarter}-${year}`,
      }
    })

  // Default to the most recent quarter (first in the sorted list)
  const defaultQuarter = quarterOptions.length > 0 ? quarterOptions[0].value : ''
  const [selectedQuarter, setSelectedQuarter] = useState<string>(defaultQuarter)

  useEffect(() => {
    const quarter = searchParams.get('quarter')
    const year = searchParams.get('year')
    if (quarter && year) {
      setSelectedQuarter(`${quarter}-${year}`)
    } else if (defaultQuarter) {
      // Set default quarter on initial load
      setSelectedQuarter(defaultQuarter)
      const [q, y] = defaultQuarter.split('-')
      router.push(`/?quarter=${q}&year=${y}`)
    }
  }, [searchParams, defaultQuarter, router])

  const handleQuarterChange = (value: string) => {
    setSelectedQuarter(value)
    const [quarter, year] = value.split('-')
    router.push(`/?quarter=${quarter}&year=${year}`)
  }

  return (
    <div className="flex items-center gap-3 mb-8">
      <label htmlFor="quarter-select" className="text-sm font-medium text-black dark:text-gray-300">
        Filter by Quarter:
      </label>
      <select
        id="quarter-select"
        value={selectedQuarter}
        onChange={(e) => handleQuarterChange(e.target.value)}
        className="pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-grayLight dark:bg-gray-800 text-black dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-[length:1.5em_1.5em] bg-[position:right_0.5rem_center] bg-no-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`
        }}
      >
        {quarterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
