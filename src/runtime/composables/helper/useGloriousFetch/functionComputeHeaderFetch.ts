export default async (options: object) => {
  const fetch = import.meta.glob('/glorious/fetch.ts')
  let data: any = {}
  if (typeof fetch['/glorious/fetch.ts'] !== 'undefined') {
    data = await fetch['/glorious/fetch.ts']()
    data = data.fetchHandler.headers(options)
  }

  return data
}
