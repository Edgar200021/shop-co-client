import { cn } from '../../utils/cn'

import { IResponseAddress } from '../../store/address/types'

import locationIcon from '../../assets/icons/location.svg'
import pencilIcon from '../../assets/icons/pencil.svg'
import deleteIcon from '../../assets/icons/delete-address.svg'
import Button, { ButtonVariants } from '../ui/Button/Button'
import { addressApi } from '../../store/address/api'
import Modal from '../Modal/Modal'
import AddAddress from '../Forms/AddAddress/AddAddress'

interface Props extends IResponseAddress {
  className?: string
}

export default function Address({
  className,
  street,
  house_number,
  apartment,
  entrance,
  floor,
  id,
}: Props) {
  const [deleteAddress, { isLoading: isDeleteLoading }] =
    addressApi.useDeleteAddressMutation()

  function handleDelete() {
    deleteAddress(id)
  }

  return (
    <li className={cn('p-4 rounded-lg flex items-center gap-x-4 bg-gray-100', className)}>
      <img src={locationIcon} alt="location" />
      <div>
        <span className="block text-base font-medium">{street}</span>
        <span className="text-[#686870] text-sm mr-1">Entrance {entrance},</span>
        <span className="text-[#686870] text-sm mr-1">Floor {floor},</span>
        <span className="text-[#686870] text-sm">Aparment {apartment}</span>
      </div>
      <div className="flex gap-3 ml-auto">
        <Modal>
          <>
            <Modal.Open
              renderButton={open => (
                <Button
                  className="w-[30px] h-[30px] rounded-lg bg-gray-200 inline-flex items-center justify-center hover:-translate-y-1 duration-300 transform-translate ease"
                  variant={ButtonVariants.CLEAR}
                  disabled={isDeleteLoading}
                  onClick={() => open('update-address')}
                >
                  <img
                    width={14}
                    height={14}
                    src={pencilIcon}
                    alt="Update Address"
                  />
                </Button>
              )}
            />
            <Modal.Window
              renderContent={close => (
                <AddAddress
                  defaultValues={{
                    id,
                    street,
                    floor,
                    apartment,
                    entrance,
                    houseNumber: house_number,
                  }}
                  close={close}
                />
              )}
              name="update-address"
            />
          </>
        </Modal>
        <Button
          className="w-[30px] h-[30px] rounded-lg bg-gray-200 inline-flex items-center justify-center hover:-translate-y-1 duration-300 transform-translate ease"
          variant={ButtonVariants.CLEAR}
          disabled={isDeleteLoading}
          onClick={handleDelete}
        >
          <img width={14} height={14} src={deleteIcon} alt="Delete Address" />
        </Button>
      </div>
    </li>
  )
}
