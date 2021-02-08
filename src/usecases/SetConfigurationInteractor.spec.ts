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

class PresenterStub implements ISetConfigurationOutput {
  presentResponse (response: SetConfigurationResponseModel): void {
    // nothing yet
  }
}

describe('SetConfigurationInteractor', () => {
  describe('set() method', () => {
    test('should call presentResponse an instance of ISetConfigurationOutput with response', async () => {
      const gatewayStub = makeConfigurationGateway()

      const presenterStub = new PresenterStub()
      const presentResponseSpy = jest.spyOn(presenterStub, 'presentResponse')

      const sut = new SetConfigurationInteractor(gatewayStub, presenterStub)
      await sut.set(fakeConfiguration)

      const fakeConfigurationResponse: SetConfigurationResponseModel = fakeConfiguration

      expect(presentResponseSpy).toHaveBeenLastCalledWith(fakeConfigurationResponse)
    })

    test('void should return undefined', async () => {
      const gatewayStub = makeConfigurationGateway()
      const presenterStub = new PresenterStub()
      const sut = new SetConfigurationInteractor(gatewayStub, presenterStub)

      const response = await sut.set(fakeConfiguration)
      expect(response).toBeUndefined()
    })

    test('should call gateway save once', async () => {
      const gatewayStub = makeConfigurationGateway()
      const presenterStub = new PresenterStub()
      const sut = new SetConfigurationInteractor(gatewayStub, presenterStub)

      const saveSpy = jest.spyOn(gatewayStub, 'save')

      await sut.set(fakeConfiguration)
      expect(saveSpy).toHaveBeenLastCalledWith(fakeConfiguration)
    })

    describe('transformToConfiguration', () => {
      test('should exist', () => {
        const gatewayStub = makeConfigurationGateway()
        const presenterStub = new PresenterStub()
        const sut = new SetConfigurationInteractor(gatewayStub, presenterStub)
        expect(sut).toHaveProperty('transformReqToConfiguration')
      })
      test('should be a function', () => {
        const gatewayStub = makeConfigurationGateway()
        const presenterStub = new PresenterStub()
        const sut = new SetConfigurationInteractor(gatewayStub, presenterStub)
        expect(typeof sut.transformReqToConfiguration).toBe('function')
      })
      test('should return configuration', () => {
        const gatewayStub = makeConfigurationGateway()
        const presenterStub = new PresenterStub()
        const sut = new SetConfigurationInteractor(gatewayStub, presenterStub)
        // so far SetConfigurationRequestModel extends ConfigurationModel (they are the same)
        const fakeConfigurationRequest: SetConfigurationRequestModel = fakeConfiguration
        const configuration = sut.transformReqToConfiguration(fakeConfigurationRequest)
        expect(configuration).toStrictEqual(fakeConfiguration)
      })
    })
  })
})
