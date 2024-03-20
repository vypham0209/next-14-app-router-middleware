//THIRD PARTY MODULES
import React from 'react'
//LAYOUT, COMPONENTS
import Stepper from '_@shared/components/Stepper'
//SHARED
import CheckCircleIcon from '_@shared/icons/CheckCircleIcon'
//RELATIVE MODULES
import ModalExample from './ModalExample'

const StyleGuide = () => {
  return (
    <div className="m-auto grid h-screen max-w-7xl grid-cols-2 gap-6 p-10">
      <div>
        <Stepper steps={data} />
      </div>
      <div>
        <ModalExample />
      </div>
    </div>
  )
}

export default StyleGuide

const data = [
  {
    id: 1,
    content: 'order',
    isActive: false,
  },
  {
    id: 2,
    content: 'delivery',
    isActive: false,
  },
  {
    id: 3,
    content: (
      <div className="space-i-2 flex">
        <CheckCircleIcon className="text-gre-300" />
        <span>Done</span>
      </div>
    ),
    isActive: true,
  },
]
