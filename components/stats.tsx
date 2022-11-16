import CountUp from 'react-countup';
import Counter from './counter';

export default function Stats() {
    return (
        <section>
            <div className="pt-12 sm:pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Trusted by developers from over 80 planets
                        </h2>
                        <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus repellat laudantium.
                        </p>
                    </div>
                </div>
                <div className="mt-10 pb-12 sm:pb-16">
                    <div className="relative">
                        <div className="absolute inset-0 h-1/2" />
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-4xl mx-auto">
                                <dl className="rounded-lg shadow-lg sm:grid sm:grid-cols-3">
                                    <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                                        <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Ökostrom</dt>
                                        <dd className="order-1 text-5xl font-extrabold text-green-600">
                                            <Counter target={100} title="%" duration={2.0} />
                                        </dd>
                                    </div>
                                    <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                                        <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Delivery</dt>
                                        <dd className="order-1 text-5xl font-extrabold text-indigo-600">24/7</dd>
                                    </div>
                                    <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                                        <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Calories</dt>
                                        <dd className="order-1 text-5xl font-extrabold text-green-600">
                                            <Counter target={1000} title="" duration={2.0} />
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}