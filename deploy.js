const Web3Storage = require('web3.storage')

const token = process.env.API_TOKEN
const mode = process.env.DEPLOYMENT_MODE

if (!(mode == 'landscape' || mode == 'landingpage')) {
  console.log('Invalid mode')
  exit(1)
}

const client = new Web3Storage.Web3Storage({ token })

async function storeFiles (files) {
  const cid = await client.put(files, { wrapWithDirectory: false })
  return cid
}

async function deploy() {
  if (mode == 'landscape') {
    const files = await Web3Storage.getFilesFromPath('build/index.html')
    const cid = await storeFiles(files)
    console.log("Deployed landscape to: " + cid)
  }

  if (mode == 'landingpage') {
    const files = await Web3Storage.getFilesFromPath('landingpage')
    const cid = await storeFiles(files)
    console.log("Deployed landingpage to: " + cid)
  }
}

deploy()