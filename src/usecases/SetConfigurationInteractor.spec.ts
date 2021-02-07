import { ConfigurationModel } from '../entities/ConfigurationModel'
import { IConfigurationGateway } from './gateways/IConfigurationGateway'
import { SetConfigurationResponseModel } from './Models/SetConfigurationResponseModel'
import { SetConfigurationInteractor } from './SetConfigurationInteractor'

/*
 * - Receive request
 * - Save in persistance
 * - Return response
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

describe('SetConfigurationInteractor', () => {
  test('should return configurationResponse', async () => {
    const gatewayStub = makeConfigurationGateway()
    const sut = new SetConfigurationInteractor(gatewayStub)

    const response = await sut.set(fakeConfiguration)
    expect(response).toEqual(fakeConfiguration)
  })

  test('should call gateway save once', async () => {
    const gatewayStub = makeConfigurationGateway()
    const sut = new SetConfigurationInteractor(gatewayStub)

    const saveSpy = jest.spyOn(gatewayStub, 'save')

    await sut.set(fakeConfiguration)
    expect(saveSpy).toHaveBeenLastCalledWith(fakeConfiguration)
  })
})
