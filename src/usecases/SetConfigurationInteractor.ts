// import { Configuration } from '../entities/Configuration'

import { ConfigurationModel } from '../entities/ConfigurationModel'
import { IConfigurationGateway } from './gateways/IConfigurationGateway'
import { ISetConfigurationOutput } from './ISetConfigurationOutput'
import { SetConfigurationRequestModel } from './Models/SetConfigurationRequestModel'

export class SetConfigurationInteractor {
  setConfigurationGateway: IConfigurationGateway
  setConfigurationOutput: ISetConfigurationOutput
  constructor (
    setConfigurationGateway: IConfigurationGateway,
    setConfigurationOutput: ISetConfigurationOutput
  ) {
    this.setConfigurationGateway = setConfigurationGateway
    this.setConfigurationOutput = setConfigurationOutput
  }

  async set (configurationRequest: SetConfigurationRequestModel): Promise<void> {
    const configuration: ConfigurationModel = this.transformReqToConfiguration(configurationRequest)
    const savedConfiguration: ConfigurationModel = await this.setConfigurationGateway.save(configuration)
    this.setConfigurationOutput.presentResponse(savedConfiguration)
  }

  /**
   * Maps request object to configuration objet
   * @param request object
   * @returns configuration object
   */
  transformReqToConfiguration<T extends object> (request: T): ConfigurationModel {
    const configuration: ConfigurationModel = JSON.parse(JSON.stringify(request))
    return configuration
  }
}
