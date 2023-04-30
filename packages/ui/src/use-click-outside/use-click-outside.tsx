/* eslint-disable no-unused-vars */
import * as React from "react"
import { useCallbackRef } from "../use-callback-ref"

export interface UseClickOutsideProps {
  enabled?: boolean
  ref: React.RefObject<HTMLElement>
  handler?: (e: Event) => void
}

export function useClickOutside(props: UseClickOutsideProps) {
  const { ref, handler, enabled = true } = props
  const savedHandler = useCallbackRef(handler)

  const stateRef = React.useRef({
    isPointerDown: false,
    ignoreEmulatedMouseEvents: false,
  })

  const state = stateRef.current

  React.useEffect(() => {
    if (!enabled) return
    const onPointerDown: any = (e: PointerEvent) => {
      if (isValidEvent(e, ref)) {
        state.isPointerDown = true
      }
    }

    const onMouseUp: any = (event: MouseEvent) => {
      if (state.ignoreEmulatedMouseEvents) {
        state.ignoreEmulatedMouseEvents = false
        return
      }

      if (state.isPointerDown && handler && isValidEvent(event, ref)) {
        state.isPointerDown = false
        savedHandler(event)
      }
    }

    const onTouchEnd = (event: TouchEvent) => {
      state.ignoreEmulatedMouseEvents = true
      if (handler && state.isPointerDown && isValidEvent(event, ref)) {
        state.isPointerDown = false
        savedHandler(event)
      }
    }

    const doc = getOwnerDocument(ref.current)
    doc.addEventListener("mousedown", onPointerDown, true)
    doc.addEventListener("mouseup", onMouseUp, true)
    doc.addEventListener("touchstart", onPointerDown, true)
    doc.addEventListener("touchend", onTouchEnd, true)

    return () => {
      doc.removeEventListener("mousedown", onPointerDown, true)
      doc.removeEventListener("mouseup", onMouseUp, true)
      doc.removeEventListener("touchstart", onPointerDown, true)
      doc.removeEventListener("touchend", onTouchEnd, true)
    }
  }, [handler, ref, savedHandler, state, enabled])
}

function isValidEvent(event: any, ref: React.RefObject<HTMLElement>) {
  const target = event.target as HTMLElement
  if (event.button > 0) return false
  if (target) {
    const doc = getOwnerDocument(target)
    if (!doc.contains(target)) return false
  }

  return !ref.current?.contains(target)
}

function getOwnerDocument(node?: Element | null): Document {
  return node?.ownerDocument ?? document
}
