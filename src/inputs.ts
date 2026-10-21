import { argv } from 'node:process'
import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const [baseOriginal, registrosFolder] = argv.slice(2)

export const BASE_ORIGINAL = baseOriginal ?? 'base-original.txt'
export const REGISTROS_FOLDER_NAME = registrosFolder ?? 'registros'

export const confirmationAction = async (folderName: string) => {
  const yesOptions = ['y', 'yes']
  const readline = createInterface({ input, output })

  console.log(
    `La carpeta de registros "${folderName}" ya existe, correr el script de separación va a sobreescribir la carpeta.`,
  )

  const answer = await readline.question(
    '¿Vas a sobreescribir la carpeta? y/N\n',
  )

  readline.close()

  const confirmed = yesOptions.includes(answer.toLowerCase().trim())

  return confirmed
}
