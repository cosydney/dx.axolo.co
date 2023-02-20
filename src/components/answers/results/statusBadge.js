import { classNames, statusColors } from '../../utils'

export default function StatusBadge({ name }) {
  return (
    <span
      className={classNames(
        'mr-2 rounded  px-2.5 py-0.5 text-xs font-medium ',
        `bg-${statusColors?.[name]?.bg} text-${statusColors?.[name]?.text}`,
      )}
    >
      {name}
    </span>
  )
}
