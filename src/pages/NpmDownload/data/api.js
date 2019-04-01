// @flow
import axios from 'axios'

const downloadUrl = 'https://api.npmjs.org/downloads/range/'

export async function fetchNpmDownload(params: {
  startDate: string,
  endDate: string,
  packageName: string
}) {
  const { startDate, endDate, packageName } = params
  let options = {
    method: 'get',
    url: downloadUrl + `${startDate}:${endDate}/${packageName}`
  }
  let res = await axios(options)
  return res.data
}
