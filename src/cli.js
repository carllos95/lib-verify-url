import chalk from "chalk"
import fs from 'fs'
import getFile from "./index.js"
import listValidation from "./http-validaticao.js"


const routes = process.argv

async function printList(valida, result, listName) {
  if (valida) {
    console.log(chalk.blue('lista validada'), chalk.yellow(listName), await listValidation(result))
  } else {
    console.log(chalk.blue('lista de links'), chalk.yellow(listName), result)
  }
}

async function processText(arg) {
  const route = arg[2]
  const validation = arg[3] === '--valida'

  try {
    fs.lstatSync(route)
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('Arquivo ou diretório não existe!')
      return
    }
  }

  if (fs.lstatSync(route).isFile()) {
    const result = await getFile(route)
    printList(validation, result, route)
  } else if (fs.lstatSync(route).isDirectory()) {
    const files = await fs.promises.readdir(route)
    files.forEach(async file => {
      const list = await getFile(`${route}/${file}`)
      printList(validation, list, file)
    });
  }

}

processText(routes)
