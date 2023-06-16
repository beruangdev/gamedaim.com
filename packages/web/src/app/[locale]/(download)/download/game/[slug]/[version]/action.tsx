"use client"

import * as React from "react"
import { Button } from "@/components/UI/Button"

interface DownloadButtonActionProps {
  downloadLink: string
  fileSize: string
}

export const DownloadButtonAction = (props: DownloadButtonActionProps) => {
  const { downloadLink, fileSize } = props
  const [showCountdown, setShowCountdown] = React.useState(false)
  const [countdownInterval, setCountdownInterval] = React.useState<
    number | null
  >(null)
  const [difference, setDifference] = React.useState<number>(10)

  const handleDownloadClick = () => {
    setShowCountdown(true)
    setCountdownInterval(
      //@ts-ignore
      setInterval(() => {
        setDifference((prevDifference): number => prevDifference - 1)
        setShowCountdown(false)
        setCountdownInterval(null)
        window.open(downloadLink, "_blank")
        setDifference(10)
      }, 10000),
    )
  }
  React.useEffect(() => {
    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval)
      }
    }
  }, [countdownInterval])

  return (
    <div className="flex flex-col">
      <Button
        aria-label="Download"
        onClick={handleDownloadClick}
        disabled={showCountdown}
      >
        Download ({fileSize})
      </Button>
      {showCountdown && (
        <div className="bg-success/30 text-foreground p-7">
          Link download akan terbuka pada
          {difference} detik
        </div>
      )}
    </div>
  )
}
