import { ConfigurationModel } from '../../entities/ConfigurationModel'

export interface IConfigurationGateway {
  save: (configuration: ConfigurationModel) => Promise<ConfigurationModel>
}
