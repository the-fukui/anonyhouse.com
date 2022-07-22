import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

/**
 * 絵文字以外の文字が含まれていないかチェックする
 */
@ValidatorConstraint({ name: 'Emoji', async: false })
export class Emoji implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return text.match(/[^\p{Emoji}]/gu).length === 0 // 絵文字以外の文字を探す
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Only emoji is allowed for this field.'
  }
}
