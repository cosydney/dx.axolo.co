import * as Sentry from '@sentry/react'
import posthog from 'posthog-js'
import { Integrations } from '@sentry/tracing'
import { Login } from './components/login'
import HomeFooter from './components/homeFooter'

window.$crisp = []
window.CRISP_WEBSITE_ID = 'e55d5c33-8163-469b-8799-071e4bb34d9f'
;(function () {
  var d = document
  var s = d.createElement('script')
  s.src = 'https://client.crisp.chat/l.js'
  s.async = 1
  d.getElementsByTagName('head')[0].appendChild(s)
})()
window.$crisp.push(['safe', true])

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://3af51e4ffe364600a1682a83a3a72413@o992721.ingest.sentry.io/6105769',
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  })
  posthog.init('phc_L9f6Uj1bRNHNEBe4QDQkLwzq8iAtzszkwzrvXw90wjV', {
    api_host: 'https://app.posthog.com',
    enable_recording_console_log: true,
  })
}

function SignUpPage() {
  return (
    <div className="h-[100vh] bg-white">
      <Login />
      <HomeFooter />
    </div>
  )
}

export default SignUpPage
