import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function DropDown(props: any) {

    const items:string[] = props.items;

    const [title, setTitle] = useState(props.title)
    
    const handleTitleChange = (title: string) =>{
        setTitle(title)
    }

    return (
        <Menu as="div" className="relative inline-block text-left w-full form-input">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 outline-none form-dropdown">
                    {title}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="overflow-scroll h-96 absolute text-center z-10 w-full mt-2 origin-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {items.map((item, index) => (
                            <Menu.Item key={index}>
                                {({ active }) => (
                                    <button onClick={() => handleTitleChange(item)}className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block w-full px-4 py-2 text-sm'
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