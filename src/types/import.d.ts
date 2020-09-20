declare namespace Import {
  type Field = {
    name: string
    type: string
    convertTo?: string
  }

  type DataRow = Array<string | number | boolean>
  type DataSet = Array<DataRow>

  interface FileInfo {
    fields: Field[]
    preview: Dataset
  }

  type OutputSchema = {
    [key: string]: Field
  }

  type FieldMap = OutputSchema

  type FieldMapId = string | number

  interface FieldMapItem {
    id?: FieldMapId
    name: string
    fieldMap: FieldMap
  }
}
