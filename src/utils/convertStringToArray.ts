export default function convertStringToArray(content?: string) {
  if (!content) return []
  return content.split('\n').filter((item) => item !== '')
}
