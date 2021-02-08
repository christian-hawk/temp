import { ConfigurationModel } from '../entities/ConfigurationModel'
import { IConfigurationGateway } from './gateways/IConfigurationGateway'
import { ISetConfigurationOutput } from './ISetConfigurationOutput'
import { SetConfigurationRequestModel } from './Models/SetConfigurationRequestModel'
import { SetConfigurationResponseModel } from './Models/SetConfigurationResponseModel'
import { SetConfigurationInteractor } from './SetConfigurationInteractor'

/*
 * - Receive request
 * - Save in persistance
 * - Return response promise
 */

interface SutTypes {
  sut: SetConfigurationInteractor
  gatewayStub: IConfigurationGateway
  presenterStub: ISetConfigurationOutput
}

const makeSut = (): SutTypes => {
  const presenterStub = makePresenter()
  const gatewayStub = makeConfigurationGateway()
  const sut = new SetConfigurationInteractor(gatewayStub, presenterStub)
  return {
    sut,
    gatewayStub,
    presenterStub
  }
}

const makePresenter = (): ISetConfigurationOutput => {
  class PresenterStub implements ISetConfigurationOutput {
    presentResponse (response: SetConfigurationResponseModel): void {
      // nothing yet
    }
  }
  return new PresenterStub()
}

const fakeConfiguration: ConfigurationModel = {
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

const makeConfigurationGateway = (): IConfigurationGateway => {
  class ConfigurationGatewayStub implements IConfigurationGateway {
    async save (configuration: ConfigurationModel): Promise<ConfigurationModel> {
      const fakeConfigurationResponse: SetConfigurationResponseModel = fakeConfiguration
      return await new Promise(resolve => resolve(fakeConfigurationResponse))
    }
  }
  return new ConfigurationGatewayStub()
}

describe('SetConfigurationInteractor', () => {
  describe('set() method', () => {
    test('should call presentResponse an instance of ISetConfigurationOutput with response', async () => {
      const { sut, presenterStub } = makeSut()
      const presentResponseSpy = jest.spyOn(presenterStub, 'presentResponse')
      await sut.set(fakeConfiguration)

      const fakeConfigurationResponse: SetConfigurationResponseModel = fakeConfiguration

      expect(presentResponseSpy).toHaveBeenLastCalledWith(fakeConfigurationResponse)
    })

    test('void should return undefined', async () => {
      const { sut } = makeSut()

      const response = await sut.set(fakeConfiguration)
      expect(response).toBeUndefined()
    })

    test('should call gateway save once', async () => {
      const { sut, gatewayStub } = makeSut()
      const saveSpy = jest.spyOn(gatewayStub, 'save')

      await sut.set(fakeConfiguration)
      expect(saveSpy).toHaveBeenLastCalledWith(fakeConfiguration)
    })

    describe('transformToConfiguration', () => {
      test('should exist', () => {
        const { sut } = makeSut()
        expect(sut).toHaveProperty('transformReqToConfiguration')
      })
      test('should be a function', () => {
        const { sut } = makeSut()
        expect(typeof sut.transformReqToConfiguration).toBe('function')
      })
      test('should return configuration', () => {
        const { sut } = makeSut()
        // so far SetConfigurationRequestModel extends ConfigurationModel (they are the same)
        const fakeConfigurationRequest: SetConfigurationRequestModel = fakeConfiguration
        const configuration = sut.transformReqToConfiguration(fakeConfigurationRequest)
        expect(configuration).toStrictEqual(fakeConfiguration)
      })
    })
  })
})
