import { ISetConfigurationRequest } from '../requests/ISetConfigurationRequest'
import { IValidation } from '../validations/IValidation'
import { IController } from './IController'

export class SetConfigurationController implements IController {
  constructor (
    private readonly validation: IValidation
  ) {

  }

  async handle (request: ISetConfigurationRequest): Promise<void> {
    this.validation.isValid('')
  }
  // handle (httpRequest: any): any {
  //   return {
  //     statusCode: 400,
  //     body: new Error('Missing param: serverUri')
  //   }
  // }
}
