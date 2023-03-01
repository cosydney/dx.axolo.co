import { OnboardingState, updateOnboarding } from '../../reducers/onboardingReducer'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { updateSettingFromApp, useAxiosWithHeader } from '../utils'
import { Organization } from '../../reducers/organizationReducer'
import { User } from '../../reducers/userReducer'
import { Setting } from '../../reducers/settingReducer'
import { useNavigate } from 'react-router-dom'

export default function Onboarding() {
  const onboarding = useSelector(OnboardingState.selectors.getOnboarding)
  const organization = useSelector(Organization.selectors.getOrganization)
  const setting = useSelector(Setting.selectors.getSetting)
  const user = useSelector(User.selectors.selectUser)
  const axios = useAxiosWithHeader()
  const navigate = useNavigate()

  let { step1, step2, step3, step4, closed, finished } = onboarding
  const dispatch = useDispatch()
  const steps = [
    { name: 'Onboard your developers', href: '/team/manage', status: 'current', id: 1 },
    {
      name: 'Schedule the time of your survey',
      href: '/questions/schedule',
      status: 'upcoming',
      id: 2,
    },
    {
      name: 'Launch your first sequence now',
      href: '/answers/results',
      status: 'upcoming',
      id: 3,
    },
    {
      name: 'Checkout answers',
      href: '/answers/results',
      status: 'upcoming',
      id: 4,
    },
  ]
  if (step1 === true) {
    steps[0].status = 'complete'
    steps[1].status = 'current'
  }
  if (step2 === true) {
    steps[1].status = 'complete'
    steps[2].status = 'current'
  }
  if (step3 === true) {
    steps[2].status = 'complete'
    steps[3].status = 'current'
  }
  if (step4 === true) {
    steps[3].status = 'complete'
  }

  let showCongrats = false
  if (step1 && step2 && step3 && step4) {
    showCongrats = true
  }

  if (finished || organization?.setting?.finishedOnboarding) {
    return null
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

  const onClose = async () => {
    dispatch(updateOnboarding({ closed: true }))
    // if he finished all steps we close this forever
    if (step1 && step2 && step3 && step4) {
      onFinish()
    }
  }

  return (
    <>
      {closed ? (
        <div
          onClick={() => dispatch(updateOnboarding({ closed: false }))}
          className="fixed bottom-0 left-0 m-4 cursor-pointer rounded-lg bg-gray-100 shadow-lg"
        >
          <p className="px-10 py-2">👋 Finish my onboarding</p>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 m-4 rounded-lg bg-gray-100 p-2 shadow-lg">
          <div
            className="absolute top-1 right-1 cursor-pointer"
            onClick={() => onClose()}
          >
            <XCircleIcon
              className="text-grey-600 group-hover:text-grey-800 h-5 w-5"
              aria-hidden="true"
            />
          </div>
          <h1
            className="m-2 mb-6 font-bold"
            onClick={() => dispatch(updateOnboarding({ closed: false }))}
          >
            Onboarding
          </h1>
          <ul className="m-2">
            {steps.map((step) => (
              <li key={step.name}>
                {step.status === 'complete' ? (
                  <button className="group" onClick={() => navigate(step.href)}>
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
                  </button>
                ) : step.status === 'current' ? (
                  <button
                    onClick={() => navigate(step.href)}
                    className="mb-3 flex items-start"
                    aria-current="step"
                  >
                    <span
                      className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
                      aria-hidden="true"
                    >
                      <span className="absolute h-4 w-4 animate-ping rounded-full bg-green-200" />
                      <span className="relative block h-2 w-2 rounded-full bg-green-600 " />
                    </span>
                    <span className="ml-3 text-sm font-medium text-green-600">
                      {step.name}
                    </span>
                  </button>
                ) : (
                  <button onClick={() => navigate(step.href)} className="group">
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
                  </button>
                )}
              </li>
            ))}
          </ul>
          {showCongrats && (
            <>
              <p className="ml-3 flex text-sm font-medium text-gray-500 group-hover:text-gray-900">
                <p>🎉</p> <p>&nbsp;&nbsp;&nbsp;Congrats you finished</p>
              </p>
            </>
          )}
        </div>
      )}
    </>
  )
}
