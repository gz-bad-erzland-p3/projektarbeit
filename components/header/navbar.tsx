import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BookmarkSquareIcon,
  CalendarIcon,
  LifebuoyIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/router'

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

export default function Navbar() {

  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // just trigger this so that the initial state 
    // is updated as soon as the component is mounted
    // related: https://stackoverflow.com/a/63408216
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const user = useAuth();
  const {logOut} = useAuth();
  const router = useRouter();

  return (
    <Popover className={classNames(scrollY > 0 ? "navbar-sl" : "navbar-tr", "navbar")}>
      <div className="mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className='flex space-x-2'>
              <Image src="/logo.svg" alt="" width={32} height={32} />
              <div className='text-xl font-bold'>BAD ERZLAND</div>
            </Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-none p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-200 outline-none transition">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden items-center justify-end md:flex-1 md:flex lg:w-0">
            {
              user.user.email == null && <Link href='/login'>
              <button className='ml-2 px-4 py-2 inline-flex items-center rounded-none text-base font-medium hover:bg-gray-200 outline-none'>
                Anmelden
              </button>
            </Link>
            }
            {user.user.email && <div><Link href="/user" className='link-main'>{user.user.email}</Link><button className='button-secondary ml-2' onClick={() => {logOut(); router.push("/")}}>Logout</button></div>}
            <Link href="/bookings/new">
              <button className='ml-2 text-white px-4 py-2 text-base font-medium rounded-none bg-green-600 hover:bg-green-500 transition'>
                Jetzt buchen
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Popover>
  )
}
