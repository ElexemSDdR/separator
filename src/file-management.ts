import { join, resolve } from 'node:path'
import { mkdir, rm } from 'node:fs/promises'
import { verifyRegistrosFolderExists, validateBase } from './validations'
import { exit } from 'node:process'
import { confirmationAction } from './inputs'
import { readFile } from 'node:fs/promises'
import { appendFile } from 'node:fs/promises'

const __dirname = resolve()

export const createRegistrosFolder = async (folderName: string) => {
  const folderAlreadyExists = await verifyRegistrosFolderExists(folderName)

  if (!folderAlreadyExists) {
    await mkdir(join(__dirname, folderName))
    return
  }

  const userConfirmation = await confirmationAction()

  if (!userConfirmation) {
    console.log('\nNo se separó el archivo')
    exit(1)
  }

  console.info('\nEliminando la carpeta de registros anterior.')

  await rm(join(__dirname, folderName), {
    recursive: true,
    force: true,
  })

  await mkdir(join(__dirname, folderName))
  return
}

export const separateBase = async (base: string, registroFolder: string) => {
  await validateBase(base)

  const SEPARATOR = '=LDR ######nam a22#####4a 4500'

  console.info(`Leyendo la base original del archivo (${base}).`)
  const originalBase = await readFile(join(__dirname, base), 'utf8')

  const splittedFile = originalBase
    .split(SEPARATOR)
    .filter((line) => line !== '')
    .filter((line) => line !== '\r')

  let fileNumber = 1
  let idx = 0

  console.info('Separando el archivo...\n')
  while (fileNumber <= 21) {
    await appendFile(
      join(__dirname, `${registroFolder}/registros-parte-${fileNumber}.txt`),
      `
${SEPARATOR}
${splittedFile[idx]}\n
      `,
      'utf8',
    )

    idx++

    if (idx + 1 === 986 * fileNumber) {
      console.info(`Registro ${fileNumber} escrito`)
      fileNumber++
    }
  }
  console.info('\nSeparación de la base completa.\n')
}
