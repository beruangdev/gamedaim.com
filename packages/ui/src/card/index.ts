import * as React from "react"

import {
  Card as InternalCard,
  CardProps,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./card"

interface Card
  extends React.ForwardRefExoticComponent<
    CardProps & React.RefAttributes<HTMLDivElement>
  > {
  Header: typeof CardHeader
  Footer: typeof CardFooter
  Title: typeof CardTitle
  Description: typeof CardDescription
  Content: typeof CardContent
}

const Card = InternalCard as Card

Card.Header = CardHeader
Card.Footer = CardFooter
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
export type { CardProps }
