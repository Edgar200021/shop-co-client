import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import Empty from '../components/Empty/Empty'
import Modal from '../components/Modal/Modal'
import Button, { ButtonVariants } from '../components/ui/Button/Button'

import 'leaflet/dist/leaflet.css'
import AddAddress from '../components/Forms/AddAddress/AddAddress'
import { addressApi } from '../store/address/api'
import Address from '../components/Address/Address'

interface Props {
  className?: string
}

export default function AccountAddressPage({ className }: Props) {
  const { data, isLoading } = addressApi.useGetAddressesQuery({ limit: 5 })

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
                  className="bg-green-500 text-xl"
                >
                  New address +
                </Button>
              )}
            />
            <Modal.Window
              className="bg-gray-300 "
              name="add-address"
              renderContent={close => <AddAddress close={close} />}
            />
          </>
        </Modal>
      </div>
      <section>
        {isLoading && <h1>Loading...</h1>}

        {data && !data.count ? (
          <Empty type="address" />
        ) : (
          <ul className="space-y-4">
            {data?.addresses.map(address => (
              <Address key={address.id} {...address} />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
