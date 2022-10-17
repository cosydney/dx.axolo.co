export const URLFRONT =
  process.env.NODE_ENV === 'production'
    ? 'https://regular-humans-monitoring.vercel.app/'
    : 'http://localhost:3000/'

export const URLBACK =
  process.env.NODE_ENV === 'production'
    ? 'https://prod-regular-humans-monitoring-8e55o.ondigitalocean.app/api/'
    : 'https://axolo-local.ngrok.io/api/'
