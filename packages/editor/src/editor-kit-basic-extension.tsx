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
      const extensions = []

      if (this.options.document !== false) {
        //@ts-ignore
        extensions.push(Document.configure(this.option?.document))
      }

      if (this.options.history !== false) {
        //@ts-ignore
        extensions.push(History.configure(this.options?.history))
      }

      if (this.options.paragraph !== false) {
        //@ts-ignore
        extensions.push(Paragraph.configure(this.options?.paragraph))
      }

      if (this.options.placeholder !== false) {
        //@ts-ignore
        extensions.push(
          //@ts-ignore
          Placeholder.configure({ placeholder: "Write Something ..." }),
        )
      }

      if (this.options.text !== false) {
        //@ts-ignore
        extensions.push(Text.configure(this.options?.text))
      }

      return extensions
    },
  })
