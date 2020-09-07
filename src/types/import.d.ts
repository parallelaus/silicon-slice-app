declare namespace Import {
  type Field = {
    name: string
    type: string
  }

  interface FileInfo {
    fields: Field[]
    preview: Array<object>
  }

  type OutputSchema = {
    [key: string]: Field
  }

  type FieldMap = OutputSchema
}
