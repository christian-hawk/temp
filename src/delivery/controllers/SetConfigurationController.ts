import { ISetConfigurationRequest } from '../requests/ISetConfigurationRequest'
import { IValidation } from '../validations/IValidation'
import { IController } from './IController'

export class SetConfigurationController implements IController {
  constructor (
    private readonly validation: IValidation
  ) {

  }

  async handle (request: ISetConfigurationRequest): Promise<void> {
    if (!this.validation.isValid(request)) {
      return await Promise.reject(new Error(''))
    }
  }
}
