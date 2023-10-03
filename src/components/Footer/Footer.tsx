import { NavLink } from 'react-router-dom'
import Logo from '../ui/Logo/Logo'
import { cn } from '../../utils/cn'
import sprite from '../../assets/icons/sprite.svg'

import visa from '../../assets/credit/visa.png'
import mastercard from '../../assets/credit/mastercard.png'
import paypal from '../../assets/credit/paypal.png'
import applepay from '../../assets/credit/applepay.png'
import googlepay from '../../assets/credit/googlepay.png'

interface Props {
  className?: string
}

export default function Footer({ className }: Props) {
  return (
    <footer className={cn('bg-[#F0F0F0]', className)}>
      <div className="max-w-7xl mx-auto px-clamp pt-36 pb-24 phone:pt-28 phone:pb-14">
        <div className=" flex justify-between  flex-wrap  pb-12 border-b-[1px] border-b-black/10 gap-20 lg-phone:gap-10 phone:gap-5 phone:justify-between mb-5">
          <div className="tablet:w-full">
            <Logo className="block mb-6 phone:mb-[14px]" />
            <p className="text-sm text-black/60 mb-9 max-w-[260px] phone:max-w-full phone:mb-5">
              We have clothes that suits your style and which you’re proud to
              wear. From <br />
              women to men.
            </p>
            <ul className="flex gap-x-3 [&>li>a]:inline-flex [&>li>a]:items-center [&>li>a]:justify-center [&>li>a]:w-7 [&>li>a]:h-7 [&>li>a]:bg-white [&>li>a]:rounded-full [&>li>a]:transition-color  [&>li>a]:duration-300  [&>li>a]:ease  [&>li>a>svg]:transition-color [&>li>a>svg]:duration-300 [&>li>a>svg]:ease ">
              <li>
                <NavLink
                  to="/twitter"
                  target="_blank"
                  className="group hover:bg-black"
                >
                  <svg className="w-1/2 h-full group-hover:fill-white">
                    <use xlinkHref={`${sprite}#twitter`} />
                  </svg>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/facebook"
                  target="_blank"
                  className="group hover:bg-black"
                >
                  <svg className="w-1/2 h-full   group-hover:fill-white">
                    <use  xlinkHref={`${sprite}#facebook`} />
                  </svg>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/instagram"
                  target="_blank"
                  className="group hover:bg-black"
                >
                  <svg className="w-1/2 h-full group-hover:fill-white">
                    <use  xlinkHref={`${sprite}#instagram`} />
                  </svg>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/github"
                  target="_blank"
                  className="group hover:bg-black"
                >
                  <svg className="w-1/2 h-full group-hover:fill-white">
                    <use  xlinkHref={`${sprite}#github`} />
                  </svg>
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <span className="block font-medium mb-[26px] phone:mb-4 uppercase">
              Company
            </span>
            <ul className="[&>li>a]:text-black/60 lg-phone:[&>li>a]:text-sm space-y-4">
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/feautures"> Features</NavLink>
              </li>
              <li>
                <NavLink to="/works">Works</NavLink>
              </li>
              <li>
                <NavLink to="/Career">Career</NavLink>
              </li>
            </ul>
          </div>
          <div>
            <span className="block font-medium mb-[26px] phone:mb-4 uppercase">
              Help
            </span>
            <ul className="[&>li>a]:text-black/60 lg-phone:[&>li>a]:text-sm space-y-4">
              <li>
                <NavLink to="/customer-support"> Customer Support</NavLink>
              </li>
              <li>
                <NavLink to="/delivery-details"> Delivery Details</NavLink>
              </li>
              <li>
                <NavLink to="/terms">Terms & Conditions</NavLink>
              </li>
              <li>
                <NavLink to="/privacy-policy">Privacy Policy</NavLink>
              </li>
            </ul>
          </div>

          <div>
            <span className="block font-medium mb-[26px] phone:mb-4 uppercase">
              FAQ
            </span>
            <ul className="[&>li>a]:text-black/60 lg-phone:[&>li>a]:text-sm space-y-4">
              <li>
                <NavLink to="/about"> Account</NavLink>
              </li>
              <li>
                <NavLink to="/feautures"> Manage Deliveries</NavLink>
              </li>
              <li>
                <NavLink to="/works">Orders</NavLink>
              </li>
              <li>
                <NavLink to="/Career">Payments</NavLink>
              </li>
            </ul>
          </div>

          <div>
            <span className="block font-medium mb-[26px] phone:mb-4 uppercase">
              Resources
            </span>
            <ul className="[&>li>a]:text-black/60 lg-phone:[&>li>a]:text-sm space-y-4">
              <li>
                <NavLink to="/free-eBooks"> Free eBooks</NavLink>
              </li>
              <li>
                <NavLink to="/develompent-tutorial">
                  {' '}
                  Development Tutorial
                </NavLink>
              </li>
              <li>
                <NavLink to="/how-to">How to - Blog</NavLink>
              </li>
              <li>
                <NavLink to="/youtube-playlist">Youtube Playlist</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between flex-wrap gap-5 tablet:justify-center">
          <span className="text-black/60  text-sm ">
            Shop.co © 2000-2023, All Rights Reserved
          </span>
          <ul className="flex gap-x-3">
            <li>
              <img src={visa}alt="Visa" />
            </li>
            <li>
              <img src={mastercard} alt="Mastercard" />
            </li>
            <li>
              <img src={paypal} alt="Paypal" />
            </li>
            <li>
              <img src={applepay} alt="ApplePay" />
            </li>
            <li>
              <img src={googlepay} alt="GooglePay" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
