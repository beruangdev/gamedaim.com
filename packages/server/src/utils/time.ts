export function diffForHuman(createdAt: Date): string {
  const now = new Date()
  const ageInMillis = now.getTime() - createdAt.getTime()

  const seconds = Math.floor(ageInMillis / 1000)
  if (seconds < 60) {
    return formatTime(seconds, "second")
  }

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return formatTime(minutes, "minute")
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return formatTime(hours, "hour")
  }

  const days = Math.floor(hours / 24)
  if (days < 30) {
    return formatTime(days, "day")
  }

  const months = Math.floor(days / 30)
  if (months < 12) {
    return formatTime(months, "month")
  }

  const years = Math.floor(months / 12)
  return formatTime(years, "year")
}

function formatTime(value: number, unit: string): string {
  if (value === 1) {
    return `${value} ${unit} ago`
  } else {
    return `${value} ${unit}s ago`
  }
}
