/* This example requires Tailwind CSS v2.0+ */
import { Key, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { setBookingValue } from '../../pages/bookings/new';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { stringLength } from '@firebase/util';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function RadioButtons(props: any) {
    const items: any[] = props.items;
    const [selectedItem, setSelectedItem] = useState("")

    if (selectedItem.length > 0) { props.setValue(selectedItem) }
    else { props.setValue(null) }

    setBookingValue(selectedItem, props.FirebaseKey)

    return (
        <RadioGroup value={selectedItem} onChange={setSelectedItem}>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                {items.map((item) => (
                    <RadioGroup.Option
                        key={item.id}
                        value={item.title}
                        className={({ checked, active }) => classNames(checked ? 'border-transparent' : 'border-gray-300', active ? 'ring-2 ring-green-500' : '', 'relative bg-white border shadow-sm p-4 flex focus:outline-none radio-button')}>
                        {({ checked, active }) => (
                            <>
                                <div className="flex-1 flex">
                                    <div className="flex flex-col">
                                        <div className='flex'>
                                            {item.icon ?
                                                <div>
                                                    <FontAwesomeIcon width={24} height={24} icon={item.icon} className="mr-2" />
                                                </div> : ""
                                            }
                                            <RadioGroup.Label as="p" className="block w-full text-left font-medium text-gray-900">
                                                {item.title}
                                            </RadioGroup.Label>
                                        </div>
                                        <div className='py-2'>
                                            {item.specifications ?
                                                <div>{
                                                    item.specifications.map((specification: any, index: Key | null | undefined) => (
                                                        <div key={index}>
                                                            {specification ?
                                                                <RadioGroup.Description as="span" className="mt-1 flex text-left items-center text-sm text-gray-500">
                                                                    <ChevronRightIcon className='h-4 w-4 mr-1' /> {specification}
                                                                </RadioGroup.Description> : ""}
                                                        </div>
                                                    ))}
                                                </div>
                                                : ""
                                            }
                                            <RadioGroup.Description as="span" className="mt-1 flex text-left items-center text-sm text-gray-500">
                                                {item.description}
                                            </RadioGroup.Description>
                                        </div>
                                        <div className='flex h-full items-end'>
                                            {item.price ?
                                                <RadioGroup.Description as="p" className="mt-6 text-left text-sm font-medium text-gray-900">
                                                    + {item.price}€ / Tag
                                                </RadioGroup.Description> : ""}
                                        </div>
                                    </div>
                                </div>
                                <CheckIcon
                                    className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-green-500')}
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