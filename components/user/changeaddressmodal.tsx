/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Autocomplete from "react-google-autocomplete";
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

export default function ChangeAddressModal(props: any) {
  const [formatted_address, setFormattedAddress] = useState("")
  const [place_id, setPlaceId] = useState("")
  const [addressError, setAddressError] = useState(false)
  const [placeObj, setPlaceObj] = useState(Object)

  const cancelButtonRef = useRef(null)
  const { changeUserAddress } = useAuth();
  const router = useRouter()

  const onChange = async () => {
    try {
      if (placeObj.address_components[0].types[0] == "street_number") {
        setAddressError(false)
        try {
          await changeUserAddress(formatted_address, place_id);
          router.reload()
          toast.success("Adresse erfolgreich geändert");
        } catch (error: any) {
          console.log(error.message);
          toast.error("Fehler bei der Änderung. Bitte versuchen Sie es erneut.");
        }
      } else {
        setAddressError(true)
      }
    } catch (error) {
      if (error instanceof TypeError) {
        setAddressError(true)
      }
      console.log(error)
    }
  }


  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={props.setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>

                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Adresse ändern
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="relative mt-1 rounded-none shadow-sm">
                      <Autocomplete apiKey={"AIzaSyCY17WLFDKPuYBIl3tzEQ0AWnQ9QFmEZwU"}
                        id="address"
                        onPlaceSelected={(place) => {
                          try {
                            if (place.address_components[0].types[0] == "street_number") {
                              setPlaceObj(place)
                              setFormattedAddress(place.formatted_address)
                              setPlaceId(place.place_id)
                              setAddressError(false)
                            } else {
                              setAddressError(true)
                            }
                          } catch (error) {
                            if (error instanceof TypeError) {
                              setAddressError(true)
                            }
                            console.log(error)
                          }
                          
                        }}
                        options={{
                          types: ['address'],//oder "street_address" weil ist bis jetzt ohne nr siehe https://developers.google.com/maps/documentation/places/web-service/autocomplete
                          componentRestrictions: { country: "de" },
                        }}
                        className="block w-full ring-1 ring-gray-300 h-9 rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                        placeholder="Neue Adresse (Beispielstraße 12, Bonn, Deutschland)"
                      />
                      {addressError && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                      </div>}
                    </div>
                    {addressError && <p className="mt-2 text-sm text-red-600" id="email-error">Bitte geben Sie eine valide Adresse an</p>}                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-none border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:col-start-2 sm:text-sm"
                  onClick={() => onChange()}
                >
                  Speichern
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-none border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => props.setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Zurück
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}