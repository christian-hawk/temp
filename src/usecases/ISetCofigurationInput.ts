export interface ISetConfigurationInput {
  setConfigurationGateway: IConfigurationGateway
  setConfigurationOutput: ISetConfigurationOutput

  set: (configurationRequest: SetConfigurationRequestModel) => Promise<void>

  transformReqToConfiguration: <T extends object> (request: T) => ConfigurationModel
}
