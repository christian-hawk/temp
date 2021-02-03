import { SetConfigurationController } from './setconfiguration'

describe('SetConfiguration Controller', () => {
  test('should return 400 if no server uri is provided', () => {
    const sut = new SetConfigurationController()
    const httpRequest = {
      body: {
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
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: serverUri'))
  })
})
