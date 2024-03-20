'use client'

//THIRD PARTY MODULES
import classcat from 'classcat'
import { useRef, useState } from 'react'
//TYPES MODULES
import type { ComponentPropsWithoutRef } from 'react'

export type OtpInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'onChange'> & {
  isError?: boolean
  OTP_LENGTH?: number
  onChange?: (value: string) => void
  containerClasses?: string
}

const OtpInput = ({
  isError = false,
  OTP_LENGTH = 4,
  onChange,
  containerClasses,
  ...props
}: OtpInputProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<string[]>([])

  const getInputList = () => {
    return (ref.current ? Array.from(ref.current.children) : []) as HTMLInputElement[]
  }

  const changeValueOnIndex = (index: number, value: string | undefined) => {
    setState((prev) => {
      prev[index] = value || ''
      onChange?.(prev.join(''))
      return [...prev]
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, dataset } = e.target
    const index = Number(dataset.index) || 0
    const inputList = getInputList()
    const currentValue = state[index]

    if (/[^0-9]/g.test(value)) return

    const nextEl = inputList[index + 1]

    const isAdd = value.length === 1
    const isChange = value.length === 2
    const isPaste = value.length >= OTP_LENGTH

    if (isAdd) {
      nextEl?.focus()
      changeValueOnIndex(index, value)
    }

    if (isChange) {
      nextEl?.focus()
      const regex = new RegExp(`[^${currentValue}]`, 'g')
      const newValue = value.match(regex)?.[0]
      changeValueOnIndex(index, newValue || currentValue)
    }

    if (isPaste) {
      const selectionStart = e.target.selectionStart || 0
      const isBack = value.length === selectionStart

      let pasteValue = ''
      if (isBack) {
        const currentValueLength = currentValue?.length || 0
        pasteValue = value.slice(currentValueLength, OTP_LENGTH + currentValueLength)
      } else {
        pasteValue = value.slice(0, OTP_LENGTH)
      }

      pasteValue.split('').forEach((v, i) => {
        changeValueOnIndex(i, v)
      })
      inputList[OTP_LENGTH - 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { target, key } = e
    const index = Number((target as HTMLInputElement).dataset.index) || 0
    const inputList = getInputList()
    const prevEl = inputList[index - 1]
    const nextEl = inputList[index + 1]

    if (key === 'Backspace') {
      prevEl?.focus()
      changeValueOnIndex(index, '')
      changeValueOnIndex(index - 1, '')
    }

    if (key === 'ArrowLeft') {
      prevEl?.focus()
    }

    if (key === 'ArrowRight') {
      nextEl?.focus()
    }
  }

  return (
    <div ref={ref} className={classcat(['space-i-4', containerClasses])}>
      {Array(OTP_LENGTH)
        .fill(1)
        .map((_, index) => (
          <input
            {...props}
            key={index}
            data-index={String(index)}
            autoFocus={index === 0}
            value={state[index] || ''}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={classcat([
              'h-13 w-13 border text-center text-24',
              isError
                ? 'border-red-500 bg-red-100 text-red-500'
                : 'border-blu-100 bg-transparent text-blu-500',
            ])}
          />
        ))}
    </div>
  )
}

export default OtpInput
