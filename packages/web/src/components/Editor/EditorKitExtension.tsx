/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Extension } from "@tiptap/core"
import { Blockquote, BlockquoteOptions } from "@tiptap/extension-blockquote"
import { Bold, BoldOptions } from "@tiptap/extension-bold"
import { BulletList, BulletListOptions } from "@tiptap/extension-bullet-list"
import {
  CharacterCount,
  CharacterCountOptions,
} from "@tiptap/extension-character-count"
import { Code, CodeOptions } from "@tiptap/extension-code"
import {
  CodeBlockLowlight,
  CodeBlockLowlightOptions,
} from "@tiptap/extension-code-block-lowlight"
import { Document } from "@tiptap/extension-document"
import { Dropcursor, DropcursorOptions } from "@tiptap/extension-dropcursor"
import { Gapcursor } from "@tiptap/extension-gapcursor"
import { HardBreak, HardBreakOptions } from "@tiptap/extension-hard-break"
import { Heading, HeadingOptions } from "@tiptap/extension-heading"
import { History, HistoryOptions } from "@tiptap/extension-history"
import {
  HorizontalRule,
  HorizontalRuleOptions,
} from "@tiptap/extension-horizontal-rule"
import { Image, ImageOptions } from "@tiptap/extension-image"
import { Italic, ItalicOptions } from "@tiptap/extension-italic"
import { Link, LinkOptions } from "@tiptap/extension-link"
import { ListItem, ListItemOptions } from "@tiptap/extension-list-item"
import { OrderedList, OrderedListOptions } from "@tiptap/extension-ordered-list"
import { Paragraph, ParagraphOptions } from "@tiptap/extension-paragraph"
import { Placeholder, PlaceholderOptions } from "@tiptap/extension-placeholder"
import { Strike, StrikeOptions } from "@tiptap/extension-strike"
import { Text } from "@tiptap/extension-text"
import { Underline, UnderlineOptions } from "@tiptap/extension-underline"
import { Youtube, YoutubeOptions } from "@tiptap/extension-youtube"

import css from "highlight.js/lib/languages/css"
import js from "highlight.js/lib/languages/javascript"
import ts from "highlight.js/lib/languages/typescript"
import html from "highlight.js/lib/languages/xml"
import { lowlight } from "lowlight"

export interface EditorKitExtensionOptions {
  blockquote: Partial<BlockquoteOptions> | false
  bold: Partial<BoldOptions> | false
  bulletList: Partial<BulletListOptions> | false
  characterCount: Partial<CharacterCountOptions> | false
  code: Partial<CodeOptions> | false
  codeBlockLowlight: Partial<CodeBlockLowlightOptions> | false
  document: false
  dropcursor: Partial<DropcursorOptions> | false
  gapcursor: false
  hardBreak: Partial<HardBreakOptions> | false
  heading: Partial<HeadingOptions> | false
  history: Partial<HistoryOptions> | false
  horizontalRule: Partial<HorizontalRuleOptions> | false
  image: Partial<ImageOptions> | false
  italic: Partial<ItalicOptions> | false
  link: Partial<LinkOptions> | false
  listItem: Partial<ListItemOptions> | false
  orderedList: Partial<OrderedListOptions> | false
  paragraph: Partial<ParagraphOptions> | false
  placeholder: Partial<PlaceholderOptions> | false
  strike: Partial<StrikeOptions> | false
  text: false
  underline: Partial<UnderlineOptions> | false
  youtube: Partial<YoutubeOptions> | false
}

lowlight.registerLanguage("html", html)
lowlight.registerLanguage("css", css)
lowlight.registerLanguage("js", js)
lowlight.registerLanguage("ts", ts)

export const EditorKitExtension = Extension.create<EditorKitExtensionOptions>({
  name: "EditorKitExtension",

  addExtensions() {
    const extensions: any[] = []

    if (this.options.blockquote !== false) {
      extensions.push(Blockquote.configure(this.options?.blockquote) as never)
    }

    if (this.options.bold !== false) {
      extensions.push(Bold.configure(this.options?.bold) as never)
    }

    if (this.options.bulletList !== false) {
      extensions.push(BulletList.configure(this.options?.bulletList) as never)
    }

    if (this.options.characterCount !== false) {
      extensions.push(
        CharacterCount.configure(this.options?.characterCount) as never,
      )
    }

    if (this.options.code !== false) {
      extensions.push(Code.configure(this.options?.code) as never)
    }

    if (this.options.codeBlockLowlight !== false) {
      extensions.push(
        CodeBlockLowlight.configure({
          lowlight,
        }) as never,
      )
    }

    if (this.options.document !== false) {
      extensions.push(Document.configure(this.options?.document) as never)
    }

    if (this.options.dropcursor !== false) {
      extensions.push(Dropcursor.configure(this.options?.dropcursor) as never)
    }

    if (this.options.gapcursor !== false) {
      extensions.push(Gapcursor.configure(this.options?.gapcursor) as never)
    }

    if (this.options.hardBreak !== false) {
      extensions.push(HardBreak.configure(this.options?.hardBreak) as never)
    }

    if (this.options.heading !== false) {
      extensions.push(Heading.configure(this.options?.heading) as never)
    }

    if (this.options.history !== false) {
      extensions.push(History.configure(this.options?.history) as never)
    }

    if (this.options.horizontalRule !== false) {
      extensions.push(
        HorizontalRule.configure(this.options?.horizontalRule) as never,
      )
    }

    if (this.options.image !== false) {
      extensions.push(Image.configure(this.options?.image) as never)
    }

    if (this.options.italic !== false) {
      extensions.push(Italic.configure(this.options?.italic) as never)
    }

    if (this.options.link !== false) {
      extensions.push(Link.configure({ openOnClick: false }) as never)
    }

    if (this.options.listItem !== false) {
      extensions.push(ListItem.configure(this.options?.listItem) as never)
    }

    if (this.options.orderedList !== false) {
      extensions.push(OrderedList.configure(this.options?.orderedList) as never)
    }

    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure(this.options?.paragraph) as never)
    }

    if (this.options.placeholder !== false) {
      extensions.push(
        Placeholder.configure({ placeholder: "Write Something ..." }) as never,
      )
    }

    if (this.options.strike !== false) {
      extensions.push(Strike.configure(this.options?.strike) as never)
    }

    if (this.options.text !== false) {
      extensions.push(Text.configure(this.options?.text) as never)
    }

    if (this.options.underline !== false) {
      extensions.push(Underline.configure(this.options?.underline) as never)
    }

    if (this.options.youtube !== false) {
      extensions.push(Youtube.configure(this.options?.youtube) as never)
    }

    return extensions
  },
})
