import Link from "next/link";

export default function Login() {
    return (
        <div className="grid justify-center h-screen items-center">
            <div className="space-y-4">
                <div>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <input
                            type="text"
                            id="email"
                            className="block text-gray-900 dark:text-white bg-white dark:bg-gray-800 w-full rounded-md pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                            placeholder="Email"
                        />
                    </div>
                </div>
                <div>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <input
                            type="password"
                            id="password"
                            className="block text-gray-900 dark:text-white bg-white dark:bg-gray-800 w-full rounded-md pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                            placeholder="Passwort"
                        />
                    </div>
                </div>
                <div>
                    <button id="btnLogin" className='w-full text-white px-4 py-2 text-base font-medium rounded-lg bg-green-600 hover:bg-green-500 transition'>
                        Anmelden
                    </button>
                </div>
                <div className="text-center">
                    <Link href="#" className="font-medium text-green-600 hover:text-green-500 transition">
                        Ich habe noch keinen Account &rarr;
                    </Link>
                </div>
            </div>
        </div>

    )
}