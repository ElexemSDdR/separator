import fs from 'node:fs/promises'
import path from 'node:path'
import { createInterface } from 'node:readline/promises'
import { exit, stdin as input, stdout as output } from 'node:process'

const __dirname = path.resolve()
const REGISTROS_FOLDER_NAME = 'registros'
const SEPARATOR = '=LDR ######nam a22#####4a 4500'

const confirmationAction = async () => {
  const yesOptions = ['y', 'yes']
  const readline = createInterface({ input, output })

  console.log(
    'La carpeta de registros ya existe, correr el script de separación va a sobreescribir la carpeta.',
  )

  const answer = await readline.question('¿Deseas continuar? y/N\n')

  readline.close()

  const confirmed = yesOptions.includes(answer.toLowerCase().trim())

  return confirmed
}

const verifyRegistrosFolder = async () => {
  const folders = await fs.readdir(__dirname, {
    encoding: 'utf-8',
  })

  const registrosExists = folders.includes(REGISTROS_FOLDER_NAME)

  if (!registrosExists) return

  const userConfirmation = await confirmationAction()

  if (userConfirmation) {
    console.info('\nEliminando la carpeta de registros anterior.')
    return
  }

  console.log('\nNo se separó el archivo')
  exit(1)
}

const main = async () => {
  await verifyRegistrosFolder()

  await fs.rm(path.join(__dirname, REGISTROS_FOLDER_NAME), {
    recursive: true,
    force: true,
  })

  console.info(`Creando carpeta ${REGISTROS_FOLDER_NAME}.`)
  await fs.mkdir(path.join(__dirname, REGISTROS_FOLDER_NAME))

  console.info('Leyendo la base original del archivo (base-original.txt).')
  const originalBase = await fs.readFile(
    path.join(__dirname, 'base-original.txt'),
    { encoding: 'utf-8' },
  )

  const splittedFile = originalBase
    .split(SEPARATOR)
    .filter((line) => line !== '')
    .filter((line) => line !== '\r')

  let fileNumber = 1
  let idx = 0

  console.info('Separando el archivo...\n')
  while (fileNumber <= 21) {
    await fs.appendFile(
      path.join(
        __dirname,
        `${REGISTROS_FOLDER_NAME}/registros-parte-${fileNumber}.txt`,
      ),
      `
${SEPARATOR}
${splittedFile[idx]}\n
      `,
      { encoding: 'utf-8' },
    )

    idx++

    if (idx + 1 === 986 * fileNumber) {
      console.info(`Registro ${fileNumber} escrito`)
      fileNumber++
    }
  }
  console.info('\nSeparación de la base completa.\n')
}

await main()
