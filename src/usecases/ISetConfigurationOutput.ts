import { SetConfigurationResponseModel } from './Models/SetConfigurationResponseModel'

export interface ISetConfigurationOutput {
  presentResponse: (response: SetConfigurationResponseModel) => void
}
