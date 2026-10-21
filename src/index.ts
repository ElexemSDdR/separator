import { BaseError } from './validations'
import { REGISTROS_FOLDER_NAME, BASE_ORIGINAL } from './inputs'
import { createRegistrosFolder, separateBase } from './file-management'

const main = async () => {
  try {
    console.info(`Creando carpeta ${REGISTROS_FOLDER_NAME}.`)
    await createRegistrosFolder(REGISTROS_FOLDER_NAME)
    console.info(`Carpeta ${REGISTROS_FOLDER_NAME} creada.`)

    await separateBase(BASE_ORIGINAL, REGISTROS_FOLDER_NAME)
  } catch (error: unknown) {
    if (error instanceof BaseError) {
      console.error(error.message)
      return
    }
    console.error(`Hubo un error inesperado: ${(error as Error).message}`)
  }
}

await main()
