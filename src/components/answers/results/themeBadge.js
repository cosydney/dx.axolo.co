import { themeColors } from '../../utils'

export default function ThemeBadge({ name }) {
  return (
    <span
      className={`mr-2 rounded  px-2.5 py-0.5 text-xs font-medium ${themeColors?.[name]?.bg} ${themeColors?.[name]?.text}`}
    >
      {name}
    </span>
  )
}
