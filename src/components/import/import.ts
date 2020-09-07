import Papa from 'papaparse'

export async function getInputFileInfo(
  file: File,
  preview = 5
): Promise<Import.FileInfo> {
  const getPreviewRows = new Promise<
    Papa.ParseResult<string | number | boolean>[]
  >((resolve, reject) => {
    const rows: Papa.ParseResult<string | number | boolean>[] = []
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      preview: preview,
      step: row => {
        if (row.errors.length == 0) {
          rows.push(row as Papa.ParseResult<string>)
        } else {
          if (row.errors[0].code == 'TooFewFields') resolve(rows)
        }
        if (rows.length == preview) resolve(rows)
      },
      complete: () => {
        resolve(rows)
      },
      error: err => {
        reject(err)
      }
    })
  })

  const rows = await getPreviewRows
  const fields: Import.Field[] = []
  rows[0].meta.fields.forEach(field => {
    fields.push({
      name: field,
      type: typeof rows[0].data[field] // TODO: create clever type detection including dates
    })
  })

  const result: Import.FileInfo = {
    fields,
    preview: []
  }

  rows.forEach(row => {
    result.preview.push(row.data)
  })

  return result
}

export function autoMapFields(
  inputFileInfo: Import.FileInfo,
  schema: Import.OutputSchema
): Import.FieldMap {
  const map: Import.FieldMap = { ...schema }

  for (const key in map) {
    const fileField = inputFileInfo.fields.find(
      field => field.name == schema[key].name
    )
    if (fileField) {
      map[key] = {
        name: fileField.name,
        type: fileField.type
      }
    }
  }

  return map
}
