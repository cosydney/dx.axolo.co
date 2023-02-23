import { OnboardingState, updateOnboarding } from '../../reducers/onboardingReducer'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { updateSettingFromApp, useAxiosWithHeader } from '../utils'
import { Organization } from '../../reducers/organizationReducer'
import { User } from '../../reducers/userReducer'
import { Setting } from '../../reducers/settingReducer'

export default function Onboarding() {
  const onboarding = useSelector(OnboardingState.selectors.getOnboarding)
  const organization = useSelector(Organization.selectors.getOrganization)
  const setting = useSelector(Setting.selectors.getSetting)
  const user = useSelector(User.selectors.selectUser)
  const axios = useAxiosWithHeader()

  let { step1, step2, step3, closed, finished } = onboarding
  const dispatch = useDispatch()
  const steps = [
    { name: 'Onboard developers', href: '/team/manage', status: 'current' },
    {
      name: 'Set up a time to send questions',
      href: '/questions/schedule',
      status: 'upcoming',
    },
    {
      name: 'Checkout answers',
      href: '/answers/results',
      status: 'upcoming',
    },
  ]

  if (step1 === true) {
    steps[0].status = 'complete'
    steps[1].status = 'current'
  }
  if (step2 === true) {
    steps[0].status = 'complete'
    steps[1].status = 'complete'
    steps[2].status = 'current'
  }
  if (step3 === true) {
    steps[0].status = 'complete'
    steps[1].status = 'complete'
    steps[2].status = 'complete'
  }

  let showCongrats = false
  if (step1 && step2 && step3) {
    showCongrats = true
  }

  if (finished || organization?.setting?.finishedOnboarding) {
    return null
  }

  const onClose = async () => {
    dispatch(updateOnboarding({ closed: true }))
    // if he finished all steps we close this forever
    if (step1 && step2 && step3) {
      onFinish()
    }
  }

  const onFinish = async () => {
    await updateSettingFromApp({
      key: 'finishedOnboarding',
      value: true,
      organization,
      setting,
      dispatch,
      axiosWithHeader: axios,
      user,
    })
    dispatch(updateOnboarding({ finished: true }))
  }

  return (
    <>
      {closed ? (
        <div
          onClick={() => dispatch(updateOnboarding({ closed: false }))}
          className="fixed bottom-0 left-0 m-4 rounded-lg bg-gray-200"
        >
          <p className="px-10 py-2">👋 Finish my onboarding</p>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 m-4 rounded-lg bg-gray-200 p-2">
          <div className="absolute top-1 right-1" onClick={onClose}>
            <XCircleIcon
              className="text-grey-600 group-hover:text-grey-800 h-5 w-5"
              aria-hidden="true"
            />
          </div>
          <h1
            className="m-2 mb-6"
            onClick={() => dispatch(updateOnboarding({ closed: false }))}
          >
            <strong>3 Steps Onboarding</strong>
          </h1>
          <ul className="m-2">
            {steps.map((step) => (
              <li key={step.name}>
                {step.status === 'complete' ? (
                  <a href={step.href} className="group">
                    <span className="mb-3 flex items-start">
                      <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                        <CheckCircleIcon
                          className="h-full w-full text-green-600 group-hover:text-green-800"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        {step.name}
                      </span>
                    </span>
                  </a>
                ) : step.status === 'current' ? (
                  <a
                    href={step.href}
                    className="mb-3 flex items-start"
                    aria-current="step"
                  >
                    <span
                      className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
                      aria-hidden="true"
                    >
                      <span className="absolute h-4 w-4 rounded-full bg-green-200" />
                      <span className="relative block h-2 w-2 rounded-full bg-green-600" />
                    </span>
                    <span className="ml-3 text-sm font-medium text-green-600">
                      {step.name}
                    </span>
                  </a>
                ) : (
                  <a href={step.href} className="group">
                    <div className="mb-3 flex items-start">
                      <div
                        className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
                        aria-hidden="true"
                      >
                        <div className="h-2 w-2 rounded-full bg-gray-300 group-hover:bg-gray-400" />
                      </div>
                      <p className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        {step.name}
                      </p>
                    </div>
                  </a>
                )}
              </li>
            ))}
          </ul>
          {showCongrats && (
            <>
              <p className="ml-3 flex text-sm font-medium text-gray-500 group-hover:text-gray-900">
                <p>🎉</p> <p pl-8>&nbsp;&nbsp;&nbsp;Congrats you finished</p>
              </p>
            </>
          )}
        </div>
      )}
    </>
  )
}
