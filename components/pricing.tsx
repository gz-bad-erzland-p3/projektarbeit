/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from '@heroicons/react/24/outline'

const pricing = {
  tiers: [
    {
      title: 'Freelancer',
      price: 24,
      frequency: '/month',
      description: 'The essentials to provide your best work for clients.',
      features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
      cta: 'Monthly billing',
      mostPopular: false,
    },
    {
      title: 'Startup',
      price: 32,
      frequency: '/month',
      description: 'A plan that scales with your rapidly growing business.',
      features: [
        '25 products',
        'Up to 10,000 subscribers',
        'Advanced analytics',
        '24-hour support response time',
        'Marketing automations',
      ],
      cta: 'Monthly billing',
      mostPopular: true,
    },
    {
      title: 'Enterprise',
      price: 48,
      frequency: '/month',
      description: 'Dedicated support and infrastructure for your company.',
      features: [
        'Unlimited products',
        'Unlimited subscribers',
        'Advanced analytics',
        '1-hour, dedicated support response time',
        'Marketing automations',
        'Custom integrations',
      ],
      cta: 'Monthly billing',
      mostPopular: false,
    },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Pricing() {
  return (
    <div id='pricing' className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-base font-semibold tracking-wider uppercase">Deploy faster</h2>
      <h2 className="text-lg text-center font-extrabold sm:leading-none sm:tracking-tight text-5xl">
        Pricing plans for te ams of all sizes
      </h2>

      {/* Tiers */}
      <div className="mt-24 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
        {pricing.tiers.map((tier) => (
          <div
            key={tier.title}
            className="relative p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col"
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{tier.title}</h3>
              {tier.mostPopular ? (
                <p className="absolute top-0 py-1.5 px-4 bg-green-600 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
                  Most popular
                </p>
              ) : null}
              <p className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold tracking-tight">${tier.price}</span>
                <span className="ml-1 text-xl font-semibold">{tier.frequency}</span>
              </p>
              <p className="mt-6">{tier.description}</p>

              {/* Feature list */}
              <ul role="list" className="mt-6 space-y-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-green-600" aria-hidden="true" />
                    <span className="ml-3">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#"
              className={classNames(
                tier.mostPopular
                  ? 'bg-green-600 text-white hover:bg-green-500'
                  : 'bg-green-50 dark:bg-white text-green-600 hover:bg-green-500 dark:hover:bg-green-500 hover:text-white',
                'mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium transition'
              )}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}