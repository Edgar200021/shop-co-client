import { ReactElement, createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'
import { useOutsideClick } from '../../hooks/useOutsideClick'

interface IModalContext {
  handleCloseModal: () => void
  open: (name: string) => void
  modalName: string
}

const ModalContext = createContext<IModalContext | null>(null)

interface Props {
  children: ReactElement
}

export default function Modal({ children }: Props) {
  const [modalName, setModalName] = useState('')

  const open = (name: string) => {
    setModalName(name)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseModal = () => {
    setModalName('')
    document.body.style.overflow = 'auto'
  }

  return (
    <ModalContext.Provider value={{ open, handleCloseModal, modalName }}>
      {children}
    </ModalContext.Provider>
  )
}

interface OpenProps {
  renderButton: (arg: (name: string) => void) => ReactElement
}

const Open = ({ renderButton }: OpenProps) => {
  const { open } = useContext(ModalContext)!

  return renderButton(open)
}

interface WindowProps {
  renderContent: (arg: () => void) => ReactElement
  className?: string
  name: string
}

const Window = ({ renderContent, className, name }: WindowProps) => {
  const { modalName, handleCloseModal } = useContext(ModalContext)!
  const ref = useOutsideClick(handleCloseModal, true)
  if (modalName !== name) return null

  return createPortal(
    <div
      className={cn(
        'fixed left-0 top-0 w-full h-full backdrop-blur-lg flex justify-center items-center ',
        className
      )}
    >
      <div ref={ref} className={cn('bg-gray-300 rounded-3xl')}>
        {renderContent(handleCloseModal)}
      </div>
    </div>,
    document.body
  )
}

Modal.Open = Open
Modal.Window = Window
