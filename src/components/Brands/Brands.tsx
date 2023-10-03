import calvin from '../../assets/images/brands/calvin.png'
import gucci from '../../assets/images/brands/gucci.png'
import prada from '../../assets/images/brands/prada.png'
import versace from '../../assets/images/brands/versace.png'
import zara from '../../assets/images/brands/zara.png'
import { cn } from '../../utils/cn'

interface Props {
  className?: string
}

export default function Brands({ className }: Props) {
  return (
    <article className={cn('bg-black', className)}>
      <ul className="max-w-7xl mx-auto px-clamp py-[44px] flex justify-between gap-10 flex-wrap tablet:justify-evenly  phone:gap-4">
        <li>
          <img
            className="w-[clamp(120px,15vw,160px)]"
            src={calvin}
            alt="Calvin Klein"
          />
        </li>
        <li>
          <img
            className="w-[clamp(120px,15vw,160px)]"
            src={gucci}
            alt="Gucci"
          />
        </li>
        <li>
          <img
            className="w-[clamp(120px,15vw,160px)]"
            src={prada}
            alt="Prada"
          />
        </li>
        <li className="lg-tablet:justify-self-center">
          <img
            className="w-[clamp(120px,15vw,160px)]"
            src={versace}
            alt="Versace"
          />
        </li>
        <li className="lg-tablet:justify-self-center">
          <img className="w-[clamp(60px,5vw,130px)]" src={zara} alt="Zara" />
        </li>
      </ul>
    </article>
  )
}
