import Router from "next/router"

export default function HeroSection() {

  const handleClick = () => {
    Router.push("/bookings/new")
  }

  return (
    <div className="isolate">
      <main>
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div>
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-200 dark:ring-gray-600 dark:hover:ring-gray-200 hover:ring-gray-600">
                  <span>
                    Die Projektarbeit ist jetzt auf {' '}
                    <a href="https://github.com/Nichtmetall/Project" className="font-semibold text-green-600">
                      <span className="absolute inset-0" aria-hidden="true" />
                      GitHub <span aria-hidden="true">&rarr;</span>
                    </a>
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                  Gemeindezentrum <br /> Bad Erzland
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                  amet fugiat veniam occaecat fugiat aliqua.
                </p>
                <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <button onClick={handleClick} className='ml-2 text-white px-4 py-2 text-base font-medium rounded-none bg-green-600 hover:bg-green-500 transition'>
                    Jetzt mieten! &rarr;
                  </button>
                </div>
              </div>
              <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                <svg
                  className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                  viewBox="0 0 1155 678"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                    fillOpacity=".3"
                    d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                  />
                  <defs>
                    <linearGradient
                      id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                      x1="1155.49"
                      x2="-78.208"
                      y1=".177"
                      y2="474.645"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#16a34a" />
                      <stop offset={1} stopColor="#15803d" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
