/* This example requires Tailwind CSS v2.0+ */
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import { setBookingValue } from '../../pages/bookings/new';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function RadioButtons(props: any) {
    const items: any[] = props.items;
    const [selectedMailingLists, setSelectedMailingLists] = useState()
    setBookingValue(selectedMailingLists, props.FirebaseKey)

    return (
        <RadioGroup value={selectedMailingLists} onChange={setSelectedMailingLists}>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                {items.map((item) => (
                    <RadioGroup.Option
                        key={item.id}
                        value={item.title}
                        className={({ checked, active }) =>
                            classNames(checked ? 'border-transparent' : 'border-gray-300', active ? 'ring-2 ring-green-500' : '','relative bg-white border shadow-sm p-4 flex focus:outline-none radio-button')}
                    >
                        {({ checked, active }) => (
                            <>
                                <div className="flex-1 flex">
                                    <div className="flex flex-col">
                                        <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                            {item.title}
                                        </RadioGroup.Label>
                                        <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm text-gray-500">
                                            {item.description}
                                        </RadioGroup.Description>
                                        {item.price ?
                                            <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-900">
                                                + {item.price}€ / Tag
                                            </RadioGroup.Description> : ""}
                                    </div>
                                </div>
                                <CheckBadgeIcon
                                    className={classNames(!checked ? 'invisible' : '', 'h-5 w-5')}
                                    aria-hidden="true"
                                />
                                <div
                                    className={classNames(
                                        active ? 'border-2' : 'border-2',
                                        checked ? 'border-green-500' : 'border-transparent',
                                        'absolute -inset-px rounded-none pointer-events-none'
                                    )}
                                    aria-hidden="true"
                                />
                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    )
}