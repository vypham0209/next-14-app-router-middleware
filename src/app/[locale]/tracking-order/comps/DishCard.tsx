//THIRD PARTY MODULES
import Image from 'next/image'
import * as AspectRatio from '@radix-ui/react-aspect-ratio'

type DishCardProps = {
  id: string
  name: string
  image: string
  description: string
}

const DishCard = (props: DishCardProps) => {
  return (
    <div>
      <h3 className="mb-2 text-14 text-blu-500 md:mb-3">{props.name}</h3>
      <div className="space-i-2 flex">
        <div className="w-20 md:w-30">
          <AspectRatio.Root ratio={6 / 5}>
            <Image src="/img/meal-card/6_5.png" alt="image" fill />
          </AspectRatio.Root>
        </div>
        <p className="flex-1 text-14lig text-blu-400">{props.description}</p>
      </div>
    </div>
  )
}

export default DishCard
