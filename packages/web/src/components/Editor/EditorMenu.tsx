"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import {
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatStrikethrough,
  MdFormatUnderlined,
  MdHorizontalRule,
  MdImage,
  MdLink,
  MdClose,
  MdAdd,
} from "react-icons/md"
import { SiYoutube } from "react-icons/si"
import { Button } from "@/components/UI/Button"
import { IconButton } from "@/components/UI/Button"

import { BubbleMenu, FloatingMenu } from "@tiptap/react"

export function EditorMenu(props: any) {
  const { editor } = props
  const [showMenu, setShowMenu] = React.useState(false)

  const addImage = () => {
    const url = window.prompt("URL")

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = React.useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href
    const url = window.prompt("URL", previousUrl)

    if (url === null) {
      return
    }

    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }

    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }, [editor])

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL")

    if (url) {
      editor?.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
        allowFullscreen: true,
      })
    }
  }

  return (
    <>
      {editor && (
        <BubbleMenu
          className="border-border bg-background flex w-full space-x-2 rounded-lg p-1 shadow-sm"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <IconButton
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleBold().run()
            }}
            variant={editor.isActive("bold") ? "outline" : "ghost"}
          >
            <MdFormatBold />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleItalic().run()
            }}
            variant={editor.isActive("italic") ? "outline" : "ghost"}
          >
            <MdFormatItalic />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleUnderline().run()
            }}
            variant={editor.isActive("underline") ? "outline" : "ghost"}
          >
            <MdFormatUnderlined />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleStrike().run()
            }}
            variant={editor.isActive("strike") ? "outline" : "ghost"}
          >
            <MdFormatStrikethrough />
          </IconButton>
          <IconButton
            onClick={addLink}
            variant={editor.isActive("link") ? "outline" : "ghost"}
          >
            <MdLink />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleCodeBlock().run()
            }}
            variant={editor.isActive("codeBlock") ? "outline" : "ghost"}
          >
            <MdCode />
          </IconButton>
        </BubbleMenu>
      )}

      {editor && (
        <>
          {
            <FloatingMenu
              tippyOptions={{ duration: 100, maxWidth: 1500 }}
              editor={editor}
            >
              <div className="absolute left-[-70px]">
                <IconButton
                  onClick={(e) => {
                    e.preventDefault()
                    setShowMenu((prevCheck) => !prevCheck)
                  }}
                  variant="ghost"
                  className="!rounded-full !px-0 shadow-sm"
                >
                  {showMenu === true ? <MdClose /> : <MdAdd />}
                </IconButton>
              </div>
              <div
                className={`${
                  showMenu == true ? "flex" : "hidden"
                } bg-background border-border w-full flex-col items-start justify-start space-x-2 space-y-2 rounded-lg px-3 py-3 shadow-sm transition-all`}
              >
                <Button
                  className="ml-2 mt-2"
                  onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }}
                  variant={
                    editor.isActive("heading", { level: 1 })
                      ? "outline"
                      : "ghost"
                  }
                >
                  H1 Heading 1
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }}
                  variant={
                    editor.isActive("heading", { level: 2 })
                      ? "outline"
                      : "ghost"
                  }
                >
                  H2 Heading 2
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }}
                  variant={
                    editor.isActive("heading", { level: 3 })
                      ? "outline"
                      : "ghost"
                  }
                >
                  H3 Heading 3
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleHeading({ level: 4 }).run()
                  }}
                  variant={
                    editor.isActive("heading", { level: 4 })
                      ? "outline"
                      : "ghost"
                  }
                >
                  H4 Heading 4
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleHeading({ level: 5 }).run()
                  }}
                  variant={
                    editor.isActive("heading", { level: 5 })
                      ? "outline"
                      : "ghost"
                  }
                >
                  H5 Heading 5
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleBulletList().run()
                  }}
                  variant={editor.isActive("bulletList") ? "outline" : "ghost"}
                >
                  <MdFormatListBulleted />
                  List Bullet
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleOrderedList().run()
                  }}
                  variant={editor.isActive("orderedList") ? "outline" : "ghost"}
                >
                  <MdFormatListNumbered />
                  List Number
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleBlockquote().run()
                  }}
                  variant={editor.isActive("blockquote") ? "outline" : "ghost"}
                >
                  <MdFormatQuote />
                  Quote
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().setHorizontalRule().run()
                  }}
                  variant={
                    editor.isActive("horizontalRule") ? "outline" : "ghost"
                  }
                >
                  <MdHorizontalRule />
                  Horizontal Rule
                </Button>
                <Button onClick={addImage} variant="ghost">
                  <MdImage />
                  Image
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleCodeBlock().run()
                  }}
                  variant={editor.isActive("codeBlock") ? "outline" : "ghost"}
                >
                  <MdCode />
                  Code
                </Button>
                <Button
                  onClick={addYoutubeVideo}
                  variant={editor.isActive("youtube") ? "outline" : "ghost"}
                >
                  <SiYoutube />
                  Youtube
                </Button>
              </div>
            </FloatingMenu>
          }
        </>
      )}
    </>
  )
}
