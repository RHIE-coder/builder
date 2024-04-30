import * as nodePath from 'path'
import * as FS from 'fs'
import * as strip from 'strip-comments'

function getConfig(): any {
  const tsconfigPath = nodePath.join(process.cwd(), 'tsconfig.json')
  const data = FS.readFileSync(tsconfigPath)
  const commentRemovedString = strip(data.toString())
  return JSON.parse(commentRemovedString)
}

function parseConfig(tsconfig: any): any {
  const compilerOptions: any = tsconfig.compilerOptions

  if (compilerOptions === undefined) {
    return null
  }

  const baseUrl: any = compilerOptions.baseUrl ?? '.'
  const paths: object = compilerOptions.paths ?? {}

  if (Object.keys(paths).length === 0) {
    return null
  }

  console.log(baseUrl)
  console.log(paths)
}

const tsconfig = getConfig()
parseConfig(tsconfig)
