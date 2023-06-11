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
        setShowCountdown(false)
        setCountdownInterval(null)
        window.open(downloadLink, "_blank")
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

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDifference((prevDifference): number => prevDifference - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Button
        aria-label="Download"
        onClick={handleDownloadClick}
        disabled={showCountdown}
      >
        Download ({fileSize})
      </Button>
      {showCountdown && (
        <div className="bg-green-100 p-7 text-black">
          Link download akan terbuka pada
          {difference} detik
        </div>
      )}
    </>
  )
}
