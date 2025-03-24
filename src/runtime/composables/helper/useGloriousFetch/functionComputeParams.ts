export default (params: Object): Object => {
  const computeParams: any = {}
  Object.entries(params).map((item: any) => {
    if (item[1] !== null && item[1] !== '') computeParams[item[0]] = item[1]
  })

  return computeParams
}
