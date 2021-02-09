import { ISetConfigurationRequest } from '../requests/ISetConfigurationRequest'
import { IValidation } from '../validations/IValidation'
import { SetConfigurationController } from './SetConfigurationController'

// Receives request object
// validates request object
// creates a RequestModel (DTO)
// send RequestModel to Interactor do its stuff

const makeFakeRequest = (): ISetConfigurationRequest => ({
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
})

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    isValid (input: any): boolean {
      return true // default is valid
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: SetConfigurationController
  validationStub: IValidation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new SetConfigurationController(validationStub)
  return {
    validationStub,
    sut
  }
}

describe('SetConfigurationController', () => {
  describe('handle()', () => {
    test('should call isValid once', async () => {
      const { validationStub, sut } = makeSut()
      const isValidSpy = jest.spyOn(validationStub, 'isValid')

      const fakeRequest: ISetConfigurationRequest = makeFakeRequest()
      await sut.handle(fakeRequest)
      expect(isValidSpy).toBeCalledTimes(1)
    })
    test('shoud call isValid with request object', async () => {
      const { validationStub, sut } = makeSut()
      const isValidSpy = jest.spyOn(validationStub, 'isValid')

      const fakeRequest: ISetConfigurationRequest = makeFakeRequest()
      await sut.handle(fakeRequest)
      expect(isValidSpy).toBeCalledWith(fakeRequest)
    })
  })
})
