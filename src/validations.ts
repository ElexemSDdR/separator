import { readdir } from 'node:fs/promises'
import { exit } from 'node:process'
import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const confirmationAction = async () => {
  const yesOptions = ['y', 'yes']
  const readline = createInterface({ input, output })

  console.log(
    'La carpeta de registros ya existe, correr el script de separación va a sobreescribir la carpeta.',
  )

  const answer = await readline.question(
    '¿Vas a sobreescribir la carpeta? y/N\n',
  )

  readline.close()

  const confirmed = yesOptions.includes(answer.toLowerCase().trim())

  return confirmed
}

export const verifyRegistrosFolder = async () => {
  const folders = await readdir(__dirname, {
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
