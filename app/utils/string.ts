export function isIcon(value: unknown): value is string {
  if (typeof value !== 'string') return false
  if (!value.startsWith('i-')) return false

  // Remove the `i-` prefix, remaining must be `collection-name(-optional-suffix)`
  const body = value.slice(2)

  // Must have at least one `-` separating collection from icon name
  if (!body.includes('-')) return false

  // Only allow lowercase letters, digits, and hyphens — no leading/trailing/double hyphens
  const valid = /^[a-z0-9]+(-[a-z0-9]+)+$/.test(body)

  return valid
}
