import { readdir } from 'node:fs/promises'
import { stat } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import mime from 'mime'

export class BaseError extends Error {
  constructor(message: string) {
    super(message)
  }
}

const __dirname = resolve()

export const validateBase = async (base: string): Promise<void> => {
  const baseExists = (await readdir(__dirname)).includes(base)
  if (!baseExists) throw new BaseError(`El archivo "${base}" no existe`)

  const isFile = await stat(join(__dirname, base))
  const mimeType = mime.getType(join(__dirname, base))

  if (!isFile.isFile()) throw new BaseError('La base tiene que ser un archivo.')
  if (mimeType !== 'text/plain')
    throw new BaseError('La base tiene que ser un archivo .txt')

  return
}

export const verifyRegistrosFolderExists = async (
  registrosFolderName: string,
): Promise<boolean> => {
  const folders = await readdir(__dirname)

  const registrosExists = folders.includes(registrosFolderName)

  return registrosExists
}
