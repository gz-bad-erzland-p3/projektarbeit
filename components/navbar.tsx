import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BookmarkSquareIcon,
  CalendarIcon,
  LifebuoyIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'

const resources = [
  {
    name: 'Hilfecenter',
    description: 'Get all of your questions answered in our forums or contact support.',
    href: '#',
    icon: LifebuoyIcon,
  },
  {
    name: 'Dokumentation',
    description: 'Learn how to maximize our platform to get the most out of it.',
    href: '#',
    icon: BookmarkSquareIcon,
  },
  {
    name: 'Events',
    description: 'See what meet-ups and other events we might be planning near you.',
    href: '#',
    icon: CalendarIcon,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  return (
    <Popover className="relative z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/">
              <span className="sr-only">Bad Erzlingen</span>
              <Image
                src="/logo.svg"
                alt=""
                width={32}
                height={32}
              />
            </a>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white dark:bg-gray-900 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-200 outline-none transition">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden items-center justify-end md:flex-1 md:flex lg:w-0">
            <Link href='/'>
              <button className='text-gray-900 dark:text-white ml-2 px-4 py-2 inline-flex items-center rounded-md bg-white dark:bg-gray-900 text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-600 outline-none'>
                Startseite
              </button>
            </Link>
            <Link href='#features'>
              <button className='text-gray-900 dark:text-white ml-2 px-4 py-2 inline-flex items-center rounded-md bg-white dark:bg-gray-900 text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-600 outline-none'>
                Features
              </button>
            </Link>
            <Link href='#pricing'>
              <button className='text-gray-900 dark:text-white ml-2 px-4 py-2 inline-flex items-center rounded-md bg-white dark:bg-gray-900 text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-600 outline-none'>
                Preise
              </button>
            </Link>
            
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={'group text-gray-900 dark:text-white ml-2 px-4 py-2 inline-flex items-center rounded-md bg-white dark:bg-gray-900 text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-600 outline-none'}
                  >
                    <span>Mehr</span>
                    <ChevronDownIcon
                      className={'ml-2 h-5 w-5'}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-500"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                      <div className="overflow-hidden rounded-md shadow-2xl">
                        <div className="relative grid gap-6 bg-white dark:bg-gray-800 px-5 py-6 sm:gap-8 sm:p-8">
                          {resources.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 flex items-start rounded-md p-3 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                            >
                              <item.icon className="h-6 w-6 flex-shrink-0 text-green-600" aria-hidden="true" />
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900 dark:text-white">{item.name}</p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-200">{item.description}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                        <div className="p-5 bg-gray-50 dark:bg-gray-700 sm:p-8">
                          <a
                            href="#"
                            className="-m-3 p-3 flow-root rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition ease-in-out duration-150"
                          >
                            <span className="flex items-center">
                              <span className="text-base font-medium">GitHub</span>
                              <span className="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-green-100 text-green-800">
                                New
                              </span>
                            </span>
                            <span className="mt-1 block text-sm">
                            Projektarbeit auf GitHub
                            </span>
                          </a>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            <Link href="/login">
              <button className='ml-2 text-white px-4 py-2 text-base font-medium rounded-md bg-green-600 hover:bg-green-500 transition'>
                Anmelden
              </button>
            </Link>
            <button aria-label="Toggle Dark Mode" type="button" className="ml-2 px-2 py-2 bg-white dark:bg-gray-900 rounded-md flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
              {mounted && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-800 dark:text-white"
                >
                  {resolvedTheme === 'dark' ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  )}
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=600"
                    alt="Your Company"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 outline-none transition">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {resources.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50 transition"
                    >
                      <item.icon className="h-6 w-6 flex-shrink-0 text-green-600" aria-hidden="true" />
                      <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Docs
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-600"
                >
                  Sign up
                </a>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{' '}
                  <a href="#" className="text-green-600 hover:text-green-500">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
