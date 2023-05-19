/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Extension } from "@tiptap/core"
import { Document } from "@tiptap/extension-document"
import { History, HistoryOptions } from "@tiptap/extension-history"
import { Paragraph, ParagraphOptions } from "@tiptap/extension-paragraph"
import { Placeholder, PlaceholderOptions } from "@tiptap/extension-placeholder"
import { Text } from "@tiptap/extension-text"

export interface EditorKitBasicExtensionOptions {
  document: false
  history: Partial<HistoryOptions> | false
  paragraph: Partial<ParagraphOptions> | false
  placeholder: Partial<PlaceholderOptions> | false
  text: false
}

export const EditorKitBasicExtension =
  Extension.create<EditorKitBasicExtensionOptions>({
    name: "EditorKitExtension",

    addExtensions() {
      const extensions: any[] = []

      if (this.options.document !== false) {
        extensions.push(Document.configure(this.options?.document) as never)
      }

      if (this.options.history !== false) {
        extensions.push(History.configure(this.options?.history) as never)
      }

      if (this.options.paragraph !== false) {
        extensions.push(Paragraph.configure(this.options?.paragraph) as never)
      }

      if (this.options.placeholder !== false) {
        extensions.push(
          Placeholder.configure({
            placeholder: "Write Something ...",
          }) as never,
        )
      }

      if (this.options.text !== false) {
        extensions.push(Text.configure(this.options?.text) as never)
      }

      return extensions
    },
  })
