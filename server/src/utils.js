import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { glob } from 'glob'

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

const __path = (route) => join(__dirname, route)

const __readdir = async (folder) =>
      await glob(
            folder,
            {
                  stat: true,

                  nodir: true,
            },
            function (er, files) {
                  if (er) {
                        return er
                  }
                  return files
            }
      )

export { __dirname, __path, __readdir }
