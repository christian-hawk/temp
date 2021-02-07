// import { Configuration } from '../entities/Configuration'

import { IConfigurationGateway } from './gateways/IConfigurationGateway'
import { SetConfigurationRequestModel } from './Models/SetConfigurationRequestModel'
import { SetConfigurationResponseModel } from './Models/SetConfigurationResponseModel'

export class SetConfigurationInteractor {
  setConfigurationGateway: IConfigurationGateway

  constructor (setConfigurationGateway: IConfigurationGateway) {
    this.setConfigurationGateway = setConfigurationGateway
  }

  async set (configuration: SetConfigurationRequestModel): Promise<SetConfigurationResponseModel> {
    // const transformedConfiguration: ConfigurationModel = this.deepCopy(configuration)
    return await this.setConfigurationGateway.save(configuration)
  }
}
