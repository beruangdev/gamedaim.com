import * as React from "react"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { Textarea } from "@/components/UI/Textarea"

interface TopUpEditableParagraphProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  text: string
  onSave: (arg: { id: string; text: string }) => void
  onCancel?: () => void
  isEditing?: boolean
}

export const TopUpEditableParagraph = React.forwardRef<
  HTMLDivElement,
  TopUpEditableParagraphProps
>((props, ref) => {
  const {
    id,
    text: initialText,
    onSave,
    onCancel,
    isEditing: isEditingProp = false,
  } = props

  const [isEditing, setIsEditing] = React.useState(isEditingProp)
  const [text, setText] = React.useState(initialText)
  const [currentRows, setCurrentRows] = React.useState(1)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    setCurrentRows(text.split("\n").length || 1)
  }, [text])

  React.useEffect(() => {
    setIsEditing(isEditingProp)
  }, [isEditingProp])

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const handleSave = () => {
    setIsEditing(false)
    onSave({
      id,
      text,
    })
  }

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  return (
    <div ref={ref} className="flex space-x-1">
      {isEditing ? (
        <Textarea
          rows={currentRows < 1 ? 1 : currentRows > 3 ? 3 : currentRows}
          value={text}
          onChange={handleChange}
          ref={inputRef}
          placeholder="Write comment…"
          variant="solid"
        />
      ) : (
        <p style={{ whiteSpace: "pre-line" }} onDoubleClick={handleDoubleClick}>
          {text}
        </p>
      )}
      {isEditing && (
        <div className="flex space-x-1">
          <Button
            aria-label="Edit"
            type="button"
            className="flex aspect-square h-10 w-10 items-center justify-center px-1"
            onClick={() => {
              setIsEditing(false)
              if (onCancel) onCancel()
            }}
          >
            <Icon.TimesCircle aria-label="Edit" />
          </Button>
          <Button
            aria-label="Save"
            type="button"
            className="flex aspect-square h-10 w-10 items-center justify-center px-1"
            onClick={handleSave}
          >
            <Icon.Save aria-label="Save" />
          </Button>
        </div>
      )}
    </div>
  )
})
