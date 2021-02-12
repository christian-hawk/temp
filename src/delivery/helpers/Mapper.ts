import { SetConfigurationRequestModel } from '../../usecases/Models/SetConfigurationRequestModel'
import { ISetConfigurationRequest } from '../requests/ISetConfigurationRequest'

export class Mapper {
  cfgRequest2RequestModel (request: ISetConfigurationRequest): object {
    const request2 = new SetConfigurationRequestModel()
    return request2
  }
}
