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
  const [difference, setDifference] = React.useState<number>(10)

  const handleDownloadClick = () => {
    setShowCountdown(true)

    const countdownInterval = setInterval(() => {
      setDifference((prevDifference) => prevDifference - 1)
    }, 1000)

    setTimeout(() => {
      clearInterval(countdownInterval)
      window.open(downloadLink, "_blank")
      setShowCountdown(false)
      setDifference(10)
    }, 10000)
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <Button
        aria-label="Download"
        className="w-44"
        onClick={handleDownloadClick}
        disabled={showCountdown}
      >
        Download ({fileSize})
      </Button>
      {showCountdown && (
        <div className="bg-success/10 text-foreground w-full p-7">
          {`Link download akan terbuka pada ${difference} detik`}
        </div>
      )}
    </div>
  )
}
