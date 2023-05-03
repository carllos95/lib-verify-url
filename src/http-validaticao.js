function extractLinks(array) {
  return array.map((obj) => Object.values(obj).join())
}

function handleError(erro) {
  if (erro.cause.code === 'ENOTFOUND') {
    return 'Link não encontrado'
  } else {
    return 'Ocorreu algo erro'
  }
}

async function checkStatus(list) {
  const arrayStatus = await Promise.all(
    list.map(async url => {
      try {
        const response = await fetch(url)
        return response.status
      } catch (err) {
        return handleError(err)
      }
    })
  )
  return arrayStatus
}

export default async function listValidation(list) {
  const links = extractLinks(list)
  const status = await checkStatus(links)


  return list.map((obj, index) => ({
    ...obj,
    status: status[index]
  }))
}


