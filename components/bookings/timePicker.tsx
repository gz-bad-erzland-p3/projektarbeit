import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { bookingTimes } from '../data/data'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function TimePicker() {

    const [title, setTitle] = useState("--:--")
    
    const handleTitleChange = (title: string) =>{
        setTitle(title)
    }

    return (
        <Menu as="div" className="relative inline-block text-left w-full">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white text-sm font-medium text-gray-700 shadow-sm outline-none form-input form-input-dropdown ">
                    {title}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 translate-y-4"
                enterTo="transform opacity-100 translate-y-0"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 translate-y-0"
                leaveTo="transform opacity-0 translate-y-4"
            >
                <Menu.Items className="overflow-scroll h-96 absolute text-center z-10 w-full mt-2 origin-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div>
                        {bookingTimes.map((item, index) => (
                            <Menu.Item key={index}>
                                {({ active }) => (
                                    <button onClick={() => handleTitleChange(item)}className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block w-full px-4 py-4 text-base'
                                        )}
                                    >
                                        {item}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}