export default function Login() {
    return (
        <div className="justify-center">
            <div className="max-w-sm ">
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <input
                            type="text"
                            id="email"
                            className="block w-full rounded-md border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                            placeholder="email@example.com"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Passwort
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <input
                            type="password"
                            id="password"
                            className="block w-full rounded-md border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                            placeholder="Passwort"
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}