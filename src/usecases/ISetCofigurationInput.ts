import { ConfigurationModel } from '../entities/ConfigurationModel'
import { IConfigurationGateway } from './gateways/IConfigurationGateway'
import { ISetConfigurationOutput } from './ISetConfigurationOutput'
import { SetConfigurationRequestModel } from './Models/SetConfigurationRequestModel'

export interface ISetConfigurationInput {
  setConfigurationGateway: IConfigurationGateway
  setConfigurationOutput: ISetConfigurationOutput

  set: (configurationRequest: SetConfigurationRequestModel) => Promise<void>

  transformReqToConfiguration: <T extends object> (request: T) => ConfigurationModel
}
