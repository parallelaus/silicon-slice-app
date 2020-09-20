import Papa from 'papaparse'
import XLSX from 'xlsx'

import { stringToDate } from './convert'

export async function getSpreadsheetInfo(
  file: File,
  preview = 5
): Promise<Import.FileInfo> {
  const getWorkbook = new Promise<XLSX.WorkBook>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function(e) {
      if (e.target) {
        const workbook = XLSX.read(e.target.result, { type: 'binary' })
        resolve(workbook)
      } else {
        reject()
      }
    }
    reader.readAsBinaryString(file)
  })

  const workbook = await getWorkbook
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  const rows: Import.DataSet = XLSX.utils.sheet_to_json(worksheet)

  const fields: Import.Field[] = []
  for (const key in rows[0]) {
    fields.push({
      name: key,
      type: typeof rows[0][key]
    })
  }

  const result: Import.FileInfo = {
    fields,
    preview: rows.slice(1, preview + 1)
  }
  return result
}

/**
 * Extracts file info from the given CSV file
 *
 * By default returns first 5 data rows for preview purposes.
 *
 * @param file: File
 * @param preview: number = 5
 */
export async function getCSVFileInfo(
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
      type: typeof rows[0].data[field]
    })
  })

  const previewDataset: Import.DataSet = []
  rows.forEach(row => {
    previewDataset.push(row.data)
  })

  const result: Import.FileInfo = {
    fields,
    preview: previewDataset
  }
  return result
}

export async function getDataFileInfo(
  file: File,
  preview = 5
): Promise<Import.FileInfo> {
  if (file.type == 'text/csv') {
    return getCSVFileInfo(file, preview)
  }
  return getSpreadsheetInfo(file, preview)
}

/**
 * Attemps to create a field map given the input file info
 * and the required output schema
 *
 * @param inputFileInfo: ImportFileInfo
 * @param schema: Import.OutputSchema
 */
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
      if (map[key].type != fileField.type) {
        map[key].convertTo = map[key].type
      }
      map[key].name = fileField.name
      map[key].type = fileField.type
    }
  }

  return map
}

/**
 * Maps the given data row to the output schema with the given
 * field mapping
 *
 * @param row: Import.DataRow
 * @param fieldMap: Import.FieldMap
 */
export function mapRow(
  row: Import.DataRow,
  fieldMap: Import.FieldMap
): Import.DataRow {
  const outputRow: Import.DataRow = []
  for (const key in fieldMap) {
    if (fieldMap[key].convertTo) {
      switch (fieldMap[key].convertTo) {
        case 'date':
          outputRow[key] = stringToDate(row[fieldMap[key].name]).toISOString()
          break

        case 'string':
          outputRow[key] = String(row[fieldMap[key].name])
          break

        default:
          throw 'type conversion not currently supported'
      }
    } else {
      outputRow[key] = row[fieldMap[key].name]
    }
  }

  return outputRow
}
