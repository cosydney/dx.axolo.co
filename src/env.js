export const URLFRONT =
  process.env.NODE_ENV === 'production' ? 'https://dx.axolo.co' : 'http://localhost:3000/'

export const URLBACK =
  process.env.NODE_ENV === 'production'
    ? 'https://dxapi.axolo.co'
    : `${process.env.REACT_APP_URLBACK}api/`

export const REACT_APP_DX_BOT_SLACK_HOOK_URL =
  'https://hooks.slack.com/services/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'
// DX_BOT_SLACK_HOOK_URL
