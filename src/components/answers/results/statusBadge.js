import { classNames, statusColors } from '../../utils'

export default function StatusBadge({ name }) {
  return (
    <span
      className={classNames(
        'mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800',
        `bg-${statusColors?.[name]?.bg} text-${statusColors?.[name]?.text}`,
      )}
    >
      {name}
    </span>
  )
}
