import chalk from "chalk";
import fs from 'fs'

function extractLinks(text) {
  const regex = /\[([^\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
  const captures = [...text.matchAll(regex)]
  const result = captures.map(cap => ({ [cap[1]]: cap[2] }))
  return result.length !== 0 ? result : 'Não existem links!'
}

function handleError(error) {
  const err = { code: error.code, message: 'Arquivo não encontrado!' }
  throw new Error(chalk.red(JSON.stringify(err)))
}

async function getFile(url) {
  try {
    const encoding = 'utf-8'
    const text = await fs.promises.readFile(url, encoding)
    return extractLinks(text)
  } catch (err) {
    handleError(err)
  }

}

export default getFile
