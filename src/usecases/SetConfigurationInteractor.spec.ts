import { ConfigurationModel } from '../entities/ConfigurationModel'
import { SetConfigurationInteractor } from './SetConfigurationInteractor'

/*
 * - Receive request
 * - Save in persistance
 * - Return response
 */

const fakeConfigurationRequest: ConfigurationModel = {
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

// const makeConfigurationGateway = () => {
//   class ConfigurationGatewayStub implements IConfigurationGateway {
//     async save (configuration: ConfigurationModel): Promise<ConfigurationModel> {
//       const fakeConfigurationResponse: SetConfigurationResponseModel = fakeConfigurationRequest
//       return await new Promise(resolve => resolve(fakeConfigurationRequest))
//     }
//   }
// }

describe('SetConfigurationInteractor', () => {
  test('should return configurationResponse', async () => {
    const sut = new SetConfigurationInteractor()
    const response = await sut.set(fakeConfigurationRequest)
    expect(response).toEqual(fakeConfigurationRequest)
  })
})
