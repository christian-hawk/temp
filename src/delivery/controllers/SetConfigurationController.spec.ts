import { ISetConfigurationRequest } from '../requests/ISetConfigurationRequest'
import { IValidation } from '../validations/IValidation'
import { SetConfigurationController } from './SetConfigurationController'

// Receives request object
// validates request object
// creates a RequestModel (DTO)
// send RequestModel to Interactor do its stuff

const fakeRequestValues = {
  serverUri: 'https://any.host.com',
  serverWebPort: 8090,
  spTLSCrtPath: '/etc/certs/passport-sp.crt',
  spTLSKeyPath: '/etc/certs/passport-sp.key',
  logging: {
    logLevel: 'info',
    consoleLogOnly: false,
    activeMQConf: {
      enabled: false,
      host: 'mq.anyhost.com',
      port: 61616,
      username: 'any_username',
      password: 'any_password'
    }
  },
  idpInitiated: {
    oidcClient: {
      authorizationEndpoint: 'https://t1.techno24x7.com/oxauth/restv1/authorize',
      clientId: '1503.b9862289-9d1c-4bd3-9197-3bb69c86ffda',
      acrValues: 'any_acr_value'
    }
  }
}

const makeFakeRequest = (): ISetConfigurationRequest => (fakeRequestValues)

describe('SetConfiguration Controller', () => {
  test('should call isValid onc', async () => {
    class ValidationStub implements IValidation {
      isValid (input: any): boolean {
        return true // default is valid
      }
    }
    const validationStub = new ValidationStub()
    const isValidSpy = jest.spyOn(validationStub, 'isValid')
    const sut = new SetConfigurationController(validationStub)
    const request: ISetConfigurationRequest = makeFakeRequest()
    await sut.handle(request)
    expect(isValidSpy).toBeCalledTimes(1)
  })
})
