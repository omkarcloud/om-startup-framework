import search from './search.mjs'

async function postbuild() {
  await Promise.all([ search()])
}

postbuild()
