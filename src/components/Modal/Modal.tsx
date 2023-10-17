import { ReactElement, createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'

interface IModalContext {
  handleCloseModal: () => void
  open: React.Dispatch<React.SetStateAction<string>>
  modalName: string
}

const ModalContext = createContext<IModalContext | null>(null)

interface Props {
  children: string
}

export default function Modal({ children }: Props) {
  const [modalName, setModalName] = useState('')

  const open = setModalName

  const handleCloseModal = () => {
    setModalName('')
  }

  return (
    <ModalContext.Provider value={{ open, handleCloseModal, modalName }}>
      {children}
    </ModalContext.Provider>
  )
}

interface OpenProps {
  renderButton: (
    arg: React.Dispatch<React.SetStateAction<string>>
  ) => ReactElement
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

  if (modalName !== name) return null

  return createPortal(
    <div className="absolute left-0 top-0 w-full h-full backdrop-blur-2xl flex justify-center items-center">
      <div className={cn('bg-black rounded-3xl p-4', className)}>
        {renderContent(handleCloseModal)}
      </div>
    </div>,
    document.body
  )
}

Modal.Open = Open
Modal.Window = Window
