import { createPortal } from 'react-dom'

export default function PageLoader() {
  return createPortal(
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <div className="loader"></div>
    </div>,
    document.body
  )
}
