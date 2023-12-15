import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import Empty from '../components/MessageNotification/MessageNotification'
import Modal from '../components/Modal/Modal'
import Button, { ButtonVariants } from '../components/ui/Button/Button'

import 'leaflet/dist/leaflet.css'
import AddAddress from '../components/Forms/AddAddress/AddAddress'
import Address from '../components/Address/Address'

interface Props {
  className?: string
}

export default function AccountAddressPage({ className }: Props) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-5 mb-6">
        <h1 className="text-5xl font-bold">Delivery address</h1>
        <Modal>
          <>
            <Modal.Open
              renderButton={open => (
                <Button
                  variant={ButtonVariants.PRIMARY}
                  onClick={() => open('add-address')}
                  className="text-xl"
                >
                  New address +
                </Button>
              )}
            />
            <Modal.Window
              className=""
              name="add-address"
              renderContent={close => <AddAddress close={close} />}
            />
          </>
        </Modal>
      </div>
      <section></section>
    </div>
  )
}
