export default (gKey: String | undefined, url: string) => {
  return typeof gKey !== 'undefined'
    ? gKey
    : url.split('/')[url.split('/').length - 1]
}
