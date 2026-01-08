import { Workshop } from '@/lib/types'
import { formatDayHeader, isWeekend } from '@/lib/utils'
import { WorkshopCard } from './WorkshopCard'

interface DaySectionProps {
  date: string
  workshops: Workshop[]
}

export function DaySection({ date, workshops }: DaySectionProps) {
  const weekend = isWeekend(date)

  return (
    <section className="space-y-4 flex flex-col items-center">
      {/* Day header - centered */}
      <div className="flex items-center justify-center gap-3">
        <h2 className="text-2xl font-bold text-[#6a39EC] dark:text-primary-400">
          {formatDayHeader(date)}
        </h2>
        {workshops.length > 1 && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-[#6a39EC] dark:bg-primary-900 dark:text-primary-200">
            {workshops.length} workshops
          </span>
        )}
        {weekend && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            Weekend
          </span>
        )}
      </div>

      {/* Workshop cards - centered, consistent width */}
      <div className="flex flex-col items-center gap-4 w-full max-w-md lg:max-w-4xl">
        <div className={`grid ${workshops.length === 1 ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} gap-4 w-full ${workshops.length === 1 ? 'max-w-md' : 'lg:max-w-4xl'}`}>
          {workshops.map((workshop) => (
            <WorkshopCard key={workshop._id} workshop={workshop} />
          ))}
        </div>
      </div>
    </section>
  )
}
