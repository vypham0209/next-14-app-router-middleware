//THIRD PARTY MODULES
import { ReactElement } from 'react'

const Meal = ({ totalShow }: { totalShow: number }): ReactElement => {
  return (
    <div>
      Meal <p>{totalShow}</p>
    </div>
  )
}

export default Meal
