//THIRD PARTY MODULES
import classcat from 'classcat'
import { Controller, useFormContext } from 'react-hook-form'
import { categoryOptions } from '_@landing/constants/meal-plan'
//RELATIVE MODULES

function CategorySelect({ name }: { name?: string }) {
  const { control } = useFormContext()
  if (!name) return
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { value, onChange, ref, ..._field } = field
        return (
          <div
            ref={ref}
            className={classcat(['grid grid-cols-3 gap-2', 'sm:my-6 sm:grid-cols-6 sm:gap-6'])}
            {..._field}
          >
            {categoryOptions.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.value}
                  className={classcat([
                    'px-auto flex items-center justify-center py-2 hover-hover:cursor-pointer',
                    'md:px-6 md:py-4',
                    value === option.value
                      ? 'border border-solid border-yel-500 bg-yel-200 shadow-input hover-hover:bg-yel-300'
                      : 'border border-transparent bg-transparent hover-hover:border-yel-500 hover-hover:bg-yel-200',
                  ])}
                  onClick={() => onChange(option.value)}
                >
                  <div className="grid justify-items-center md:gap-2">
                    <Icon className="h-12 w-12 md:h-20 md:w-20" />
                    <p className={classcat(['text-14 font-bold text-blu-400'])}>{option.label}</p>
                  </div>
                </button>
              )
            })}
          </div>
        )
      }}
    />
  )
}

export default CategorySelect
