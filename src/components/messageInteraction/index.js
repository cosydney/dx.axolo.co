import { message } from 'antd'

const className = 'rounded-lg'

export default function messageInteraction({ content, duration = 5, type = 'info' }) {
  if (type === 'info') {
    return message.info({ className, content, duration })
  }
  if (type === 'error') {
    return message.error({ className, content, duration })
  }
  if (type === 'success') {
    return message.success({ className, content, duration })
  }
  if (type === 'loading') {
    return message.loading({ className, content, duration })
  }
  if (type === 'warning') {
    return message.warning({ className, content, duration })
  }
}
