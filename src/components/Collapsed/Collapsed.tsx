import { ReactNode, useState } from 'react'
import { cn } from '../../utils/cn'

interface Props {
  className?: string
  children: ReactNode
  renderCollapseBtn: (
    fn: React.Dispatch<React.SetStateAction<boolean>>,
    isCollapsed: boolean
  ) => ReactNode
}

export default function Collapsed({
  className,
  children,
  renderCollapseBtn,
}: Props) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {renderCollapseBtn(setCollapsed, collapsed)}
      <div
        className={cn(
          'grid grid-rows-[0fr] transition-all duration-300 ease overflow-hidden [&>*]:min-h-0 ',
          className,
          {
            'grid-rows-[1fr]': !collapsed,
          }
        )}
      >
        {children}
      </div>
    </>
  )
}
