import { SetConfigurationRequestModel } from '../../usecases/Models/SetConfigurationRequestModel'
import { ISetConfigurationRequest } from '../requests/ISetConfigurationRequest'
import { Mapper } from './Mapper'

describe('Helpers/Mappers', () => {
  describe('cfgRequest2RequestModel', () => {
    test('should exist', () => {
      const sut = new Mapper()
      expect(sut.cfgRequest2RequestModel).toBeTruthy()
    })
    test('should be a method', () => {
      const sut = new Mapper()
      expect(typeof sut.cfgRequest2RequestModel).toBe('function')
    })
    test('should return a RequestModel', () => {
      const sut = new Mapper()
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
      const fakeRequest = makeFakeRequest()
      const requestModel = sut.cfgRequest2RequestModel(fakeRequest)
      expect(requestModel).toBeInstanceOf(SetConfigurationRequestModel)
    })
  })
})
