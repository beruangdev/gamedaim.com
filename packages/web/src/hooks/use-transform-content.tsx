import * as React from "react"

import rehypeParse from "rehype-parse"
import rehypeReact from "rehype-react"
import { unified } from "unified"
import { Image } from "@/components/Image"
import { cn } from "@/utils/classname"

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
      },
    })
    .process(html)
    .then((file) => {
      return file.result
    })
  return data
}
