import { useEffect, useState } from 'react'
import { Popover } from '@headlessui/react'
import {
  Bars3Icon
} from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '../../context/AuthContext'

export default function BookingNavbar() {

  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const user = useAuth();
  const { logOut } = useAuth();

  return (
    <Popover className="navbar">
      <div className="mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <span className="sr-only">Bad Erzlingen</span>
              <Image src="/logo.svg" alt="" width={32} height={32} />
            </Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-none p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-200 outline-none transition">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden items-center justify-end md:flex-1 md:flex lg:w-0">
            {user.user.uid &&
              <div className=''>
                {user.user.email}
              </div>
            }
            <button aria-label="Toggle Dark Mode" type="button" className="ml-2 px-2 py-2 bg-white dark:bg-gray-900 rounded-none flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
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
    </Popover>
  )
}
