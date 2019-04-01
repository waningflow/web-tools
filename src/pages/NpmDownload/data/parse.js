// @flow
import moment from 'moment'
import _ from 'lodash'

const dateFormat = {
  day: 'YYYY-MM-DD',
  week: 'YYYY-[W]WW',
  month: 'YYYY-MM',
  year: 'YYYY'
}
export function formatDownloadData(
  data: Array<Object>,
  breakdown?: string = 'day'
) {
  let result: Array<Object> = _.cloneDeep(data).map(v => {
    let d = v.downloads.map(dv => {
      dv.group = moment.utc(dv.day).format(dateFormat[breakdown])
      return dv
    })
    d = _.groupBy(d, 'group')
    console.log(d)
    let downloads = Object.entries(d).map(([group, groupData]) => {
      return {
        day: group,
        downloads: _.sumBy(groupData, 'downloads')
      }
    })
    v.downloads = downloads
    return v
  })
  console.log(result)
  return result
}
