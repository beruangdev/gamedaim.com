"use client"

import * as React from "react"
import TweetEmbed from "react-tweet-embed"

export const Twitter = ({ children }: { children: React.ReactNode }) => {
  const modifiedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === "p") {
      const { children: pChildren, ...restProps } = child.props
      const modifiedPChildren = React.Children.map(
        pChildren,
        (pChild: React.ReactNode) => {
          if (
            React.isValidElement(pChild) &&
            pChild.type === "a" &&
            pChild.props.href
          ) {
            const { href } = pChild.props
            const regex = /^https?:\/\/twitter\.com\/\w+\/status\/(\d+).*$/
            const match = href.match(regex)

            if (match && match[1]) {
              return <TweetEmbed tweetId={match[1]} />
            }

            return
          }
          return
        },
      )

      return React.cloneElement(child, restProps, modifiedPChildren)
    }
    return
  })

  return <>{modifiedChildren}</>
}
