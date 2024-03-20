export const formatEmail = (email: string) => {
  const [name, domain] = email.split('@')

  return `${name.slice(0, 3)}...@${domain}`
}
