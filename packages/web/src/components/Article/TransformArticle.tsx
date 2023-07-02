import * as React from "react"

import rehypeParse from "rehype-parse"
import rehypeReact from "rehype-react"
import { unified } from "unified"
import { Image } from "@/components/Image"

export const TransformContent = async (html: string) => {
  const data = await unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeReact, {
      createElement: React.createElement,
      components: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        img: (props: any) => (
          <div className="relative aspect-video w-full">
            <Image src={props.src} alt={""} />
          </div>
        ),
      },
    })
    .process(html)
    .then((file) => {
      return file.result
    })
  return data
}
