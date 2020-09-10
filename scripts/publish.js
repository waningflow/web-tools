const fs = require('fs')
const glob = require('glob')
const path = require('path')

const OSS = require('ali-oss')
const { REGION, BUCKET, ACCESS_ID, ACCESS_SECRET } = require('./secret')

const client = new OSS({
  region: REGION,
  accessKeyId: ACCESS_ID,
  accessKeySecret: ACCESS_SECRET,
  bucket: BUCKET,
})

async function putStream(filepath, filename) {
  let stream = fs.createReadStream(filepath)
  await client.putStream(filename, stream)
}

async function upload() {
  const files = glob.sync(
    'build/**/!(precache)*.{js,html,css,png,jpg,json,ico,txt,svg,xml,woff,woff2}'
  )
  for (let i = 0; i < files.length; i++) {
    const filename = files[i].replace('build/', '')
    const filepath = path.resolve(__dirname, `../build/${filename}`)
    try {
      await putStream(filepath, `tools/${filename}`)
      console.log('upload success:', filename)
    } catch (e) {
      console.log('upload error:', filename, e)
      break
    }
  }
}

upload()
