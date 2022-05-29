import type { PickerProps as OldPickerProps } from 'emoji-mart'
import React, { useEffect, useRef } from 'react'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
  onSelect: (emoji: string) => void
}

type PickerProps = {
  ref: React.RefObject<Element>
  onEmojiSelect: OldPickerProps['onSelect']
} & OldPickerProps

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  className,
  pickerRef,
}) => <div className={`${className}`} ref={pickerRef}></div>

const Container = (props: ContainerProps) => {
  const { onSelect } = props
  const pickerRef = useRef<HTMLDivElement>(null)
  const isMounted = useRef<boolean>(false)

  useEffect(() => {
    if (isMounted.current) return

    import('emoji-mart').then(({ Picker }) => {
      new Picker({
        ref: pickerRef,
        onEmojiSelect: (data) => {
          'native' in data && onSelect(data.native)
        },
      } as PickerProps) //公式TS対応待ち
    })
    isMounted.current = true
  }, [])

  const presenterProps = {
    pickerRef,
  }
  return { ...props, ...presenterProps }
}

export default function emojiPicker(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
