const createAndDownloadFile = (fileName, blob) => {
  let aTag = document.createElement('a')
  aTag.download = fileName
  aTag.href = URL.createObjectURL(blob)
  aTag.click()
  URL.revokeObjectURL(blob)
}

export {
  createAndDownloadFile
}
