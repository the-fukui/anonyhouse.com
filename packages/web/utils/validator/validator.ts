import Ajv from 'ajv'

import * as Schema from './validationSchema.json'

const ajv = new Ajv()
ajv.addSchema(Schema)

export const validate = (
  data: Object,
  type: keyof typeof Schema['definitions'],
) => {
  const validator = ajv.getSchema(`#/definitions/${type}`)

  if (validator) {
    const isValid = validator(data)
    if (!isValid)
      console.error(`Validation error: ${type}`, { data }, validator.errors)
    return {
      isValid,
    }
  }

  throw new Error('Validator does not exist')
}
