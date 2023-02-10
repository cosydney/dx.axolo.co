export const URLFRONT =
  process.env.NODE_ENV === 'production' ? 'https://dx.axolo.co' : 'http://localhost:3000/'

export const URLBACK =
  process.env.NODE_ENV === 'production'
    ? 'https://dxapi.axolo.co'
    : 'https://axolo-local.ngrok.io/api/'
