import ProductForm from '../components/Forms/ProductForm/ProductForm'
import Modal from '../components/Modal/Modal'

interface Props {
  className?: string
}

export default function AdminProductsPage({ className }: Props) {
  return (
    <main className={className}>
      <ProductForm />
      <Modal>
        <Modal.Open
          renderButton={open => (
            <button onClick={() => open('modal')}>Open</button>
          )}
        />
        <Modal.Window
          name="modal"
          renderContent={close => (
            <div className="text-white">
              Content<button onClick={close}>Close</button>
            </div>
          )}
        />
      </Modal>
    </main>
  )
}
