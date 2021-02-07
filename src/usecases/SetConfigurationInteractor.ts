// import { Configuration } from '../entities/Configuration'

import { SetConfigurationRequestModel } from './Models/SetConfigurationRequestModel'
import { SetConfigurationResponseModel } from './Models/SetConfigurationResponseModel'

export class SetConfigurationInteractor {
  set (configuration: SetConfigurationRequestModel): SetConfigurationResponseModel {
    const setConfigurationResponse: SetConfigurationResponseModel = configuration
    return new Promise(resolve => resolve(setConfigurationResponse))
  }
}
