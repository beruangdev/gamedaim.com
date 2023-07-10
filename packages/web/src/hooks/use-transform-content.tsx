import * as React from "react"
import Script from "next/script"
import rehypeParse from "rehype-parse"
import rehypeReact from "rehype-react"
import { unified } from "unified"

import { Image } from "@/components/Image"
import YouTube from "@/components/UI/YouTube"
import { cn } from "@/utils/classname"

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"
import { Twitter } from "@/components/UI/Twitter"

export const transformContent = async (html: string, title: string) => {
  const data = await unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeReact, {
      createElement: React.createElement,
      components: {
        img: (
          props: React.DetailedHTMLProps<
            React.ImgHTMLAttributes<HTMLImageElement>,
            HTMLImageElement
          >,
        ) => {
          if (props.src) {
            return (
              <React.Fragment>
                {props.className ? (
                  <Image
                    className={cn(`${props.className} !relative`)}
                    src={props.src as string}
                    alt={title}
                  />
                ) : (
                  <div className="relative aspect-video w-full">
                    <Image src={props.src as string} alt={title} />
                  </div>
                )}
              </React.Fragment>
            )
          }
        },
        iframe: (
          props: React.DetailedHTMLProps<
            React.IframeHTMLAttributes<HTMLIFrameElement>,
            HTMLIFrameElement
          >,
        ) => {
          if (props?.src?.includes("youtube.com/embed")) {
            const arr = props?.src?.split(
              /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm,
            )

            return (
              <YouTube
                title={props.title || title}
                id={undefined !== arr[3] ? arr[3] : arr[0]}
                wrapperClass="yt-lite"
              />
            )
          }
          return <iframe {...props} />
        },
        blockquote: (
          props: React.DetailedHTMLProps<
            React.BlockquoteHTMLAttributes<HTMLQuoteElement>,
            HTMLQuoteElement
          >,
        ) => {
          if (props?.className?.includes("twitter-tweet")) {
            return <Twitter>{props.children}</Twitter>
          }
          return <blockquote {...props} />
        },
        script: (
          props: React.DetailedHTMLProps<
            React.ScriptHTMLAttributes<HTMLScriptElement>,
            HTMLScriptElement
          >,
        ) => {
          if (props) {
            return <Script {...props} />
          }
        },
      },
    })
    .process(html)
    .then((file) => {
      return file.result
    })
  return data
}
