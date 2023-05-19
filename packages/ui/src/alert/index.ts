import * as React from "react"

import {
  Alert as InternalAlert,
  AlertProps,
  AlertTitle,
  AlertDescription,
} from "./alert"

interface Alert
  extends React.ForwardRefExoticComponent<
    AlertProps & React.RefAttributes<HTMLDivElement>
  > {
  Title: typeof AlertTitle
  Description: typeof AlertDescription
}

const Alert = InternalAlert as Alert

Alert.Title = AlertTitle
Alert.Description = AlertDescription

export { Alert, AlertTitle, AlertDescription }
export type { AlertProps }
