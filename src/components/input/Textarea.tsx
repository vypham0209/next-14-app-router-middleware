//THIRD PARTY MODULES
/* eslint-disable react/display-name */
import classcat from 'classcat'
import { forwardRef } from 'react'

const TextareaBase = forwardRef<HTMLTextAreaElement, Record<string, any>>(
  ({ name, label, placeHolder, ...props }, ref) => {
    return (
      <div
        className={classcat([
          'flex flex-col items-start justify-center text-blu-400 [&>*+*]:mt-[4px]',
        ])}
      >
        {label && (
          <label htmlFor={name} className={classcat(['text-18'])}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          name={name}
          placeholder={placeHolder}
          className={classcat([
            'w-full border-[1px] border-solid border-blu-400 bg-transparent py-3.5 text-16 text-blu-200 pi-3',
          ])}
          {...props}
        />
      </div>
    )
  },
)

export default TextareaBase
