import Ajv, { type JSONSchemaType } from 'ajv'
const ajv = new Ajv()

interface MyData {
  foo: number
  bar?: string
}

const schema: JSONSchemaType<MyData> = {
  type: 'object',
  properties: {
    foo: { type: 'integer' },
    bar: { type: 'string', nullable: true },
  },
  required: ['foo'],
  additionalProperties: false,
}

// validate is a type guard for MyData - type is inferred from schema type
const validate = ajv.compile(schema)

export { validate }
