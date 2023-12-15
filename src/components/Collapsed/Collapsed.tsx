import { ReactNode, useState } from 'react'
import { cn } from '../../utils/cn'

interface Props {
  className?: string
  children: ReactNode
  renderCollapseBtn: (
    fn: React.Dispatch<React.SetStateAction<boolean>>,
    isCollapsed: boolean
  ) => ReactNode
  isCollapsed?: boolean
}

export default function Collapsed({
  className,
  children,
  renderCollapseBtn,
  isCollapsed = false,
}: Props) {
  const [collapsed, setCollapsed] = useState(isCollapsed)

  return (
    <div className={cn('text-center', className)}>
      {renderCollapseBtn(setCollapsed, collapsed)}
      <div
        className={cn(
          'grid grid-rows-[0fr] transition-all duration-300 ease overflow-hidden [&>*]:min-h-0 ',
          {
            'grid-rows-[1fr]': !collapsed,
          }
        )}
      >
        {children}
      </div>
    </div>
  )
}
