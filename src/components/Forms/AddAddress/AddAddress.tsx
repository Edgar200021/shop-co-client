import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  Marker,
  Popup,
} from 'react-leaflet'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Input, { InputVariants } from '../../ui/Input/Input'
import Button, { ButtonVariants } from '../../ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useGeolocation } from '../../../hooks/useGeolocation'
import { useEffect, useState } from 'react'
import { cn } from '../../../utils/cn'
import { useUrlPosition } from '../../../hooks/useUrlPosition'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddressSchema, addressSchema } from '../../../schemas/address-schema'
import { useGetStreet } from '../../../hooks/useGetStreet'
import PageLoader from '../../ui/PageLoader/PageLoader'
import { addressApi } from '../../../store/address/api'
import toast from 'react-hot-toast'

interface Props {
  className?: string
  close?: () => void
  defaultValues?: AddressSchema & { id: number }
}

export default function AddAddress({ className, close, defaultValues }: Props) {
  const [position, setPosition] = useState<[number, number]>([
    40.1772, 44.50349,
  ])
  const {
    isLoading: isStreetLoading,
    error: streetError,
    street,
  } = useGetStreet(position)

  const {
    isLoading: isGeoLoading,
    error: geoError,
    position: geoPosition,
    getPosition,
  } = useGeolocation()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues:
      {
        street: defaultValues?.street,
        houseNumber: defaultValues?.houseNumber,
        apartment: defaultValues?.apartment,
        entrance: defaultValues?.entrance,
        floor: defaultValues?.floor,
      } || {},
  })

  const { lat, lng } = useUrlPosition()
  const [createAddress, { isLoading }] = addressApi.useCreateAddressMutation()
  const [updateAddress, { isLoading: isUpdateLoading}] =
    addressApi.useUpdateAddressMutation()

  useEffect(() => {
    if (geoPosition) {
      setPosition([geoPosition.lat, geoPosition.lng])
    }
  }, [geoPosition])

  useEffect(() => {
    if (lat && lng) {
      setPosition([parseFloat(lat), parseFloat(lng)])
    }
  }, [lat, lng])

  const onSubmit: SubmitHandler<AddressSchema> = data => {
    if (defaultValues) {
      updateAddress({ address: data, id: defaultValues.id })
        .unwrap()
        .then(() => {
          toast.success('Success', { duration: 5000 })
          reset({
            street: '',
            houseNumber: 0,
            apartment: 0,
            entrance: 0,
            floor: 0,
          })
          close?.()
        })
        .catch(err => toast.error(err.data.msg, { duration: 5000 }))
      return
    }

    createAddress(data)
      .unwrap()
      .then(() => {
        toast.success('Success', { duration: 5000 })
        reset({
          street: '',
          houseNumber: 0,
          apartment: 0,
          entrance: 0,
          floor: 0,
        })
        close?.()
      })
      .catch(err => toast.error(err.data.msg, { duration: 5000 }))
  }

  return (
    <div className={cn('max-w-7xl mx-auto px-clamp py-10 ', className)}>
      <h1 className="font-bold text-5xl mb-10">Adding a shipping address</h1>
      <div className="flex gap-10 items-start">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[380px] min-w-[340px] w-full p-4  bg-white rounded-lg"
        >
          <fieldset
            className="p-0 m-0 border-none space-y-6"
            disabled={isGeoLoading || isStreetLoading || isLoading || isUpdateLoading}
          >
            <span className="block text-center">
              Enter addresses <br /> or select on the map
            </span>

            <div>
              <Controller
                control={control}
                name="street"
                render={({ field }) => (
                  <Input
                    variant={InputVariants.SEARCH}
                    placeholder="Street"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex gap-2">
              <label>
                <span className="block text-[#9E9E9E]">House number</span>
                <Controller
                  control={control}
                  name="houseNumber"
                  render={({ field }) => (
                    <Input
                      variant={InputVariants.PRIMARY}
                      type="number"
                      {...field}
                    />
                  )}
                />
              </label>
              <label>
                <span className="block text-[#9E9E9E]">Entrance</span>
                <Controller
                  control={control}
                  name="entrance"
                  render={({ field }) => (
                    <Input
                      variant={InputVariants.PRIMARY}
                      type="number"
                      {...field}
                    />
                  )}
                />
              </label>
            </div>

            <div className="flex gap-2">
              <label>
                <span className="block text-[#9E9E9E]">Floor</span>

                <Controller
                  control={control}
                  name="floor"
                  render={({ field }) => (
                    <Input
                      variant={InputVariants.PRIMARY}
                      type="number"
                      {...field}
                    />
                  )}
                />
              </label>
              <label>
                <span className="block text-[#9E9E9E]">Apartment</span>

                <Controller
                  control={control}
                  name="apartment"
                  render={({ field }) => (
                    <Input
                      variant={InputVariants.PRIMARY}
                      type="number"
                      {...field}
                    />
                  )}
                />
              </label>
            </div>
            <Button
              disabled={isStreetLoading || isGeoLoading || isLoading}
              variant={ButtonVariants.PRIMARY}
              className="bg-green-500 disabled:bg-green-300 disabled:cursor-not-allowed"
            >
              Save address
            </Button>
          </fieldset>
        </form>
        <MapContainer
          className="h-[700px] w-[1100px] grow rounded-md"
          center={[51.505, -0.09]}
          zoom={15}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <ChangeCenter position={position} />
          <DetectClick />
        </MapContainer>
      </div>
    </div>
  )
}

function ChangeCenter({ position }: { position: [number, number] }) {
  const map = useMap()

  map.setView(position)
  return null
}

function DetectClick() {
  const navigate = useNavigate()

  useMapEvents({
    click: e => {
      navigate(
        `/user/account/addresses?lat=${e.latlng.lat}&lng=${e.latlng.lng}`
      )
    },
  })
  return null
}
