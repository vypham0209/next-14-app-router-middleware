/**
 * console.log(convertToAltImage("Apple iPhone 12 Pro"));
 * Output: "apple-iphone-12-pro"
 */
export default function convertToAltImage(name?: string | null) {
  return name ? name.toLowerCase().split(' ').join('-') : '';
}
