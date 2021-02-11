import { IRequest } from './IRequest'
// DTO

// interface ActiveMQConf {
//   enabled: boolean
//   host: string
//   port: number
//   username: string
//   password: string
// }

// interface Logging {
//   logLevel: string
//   consoleLogOnly: boolean
//   activeMQConf: ActiveMQConf
// }

// interface IdpInitiated {
//   oidcClient: {
//     authorizationEndpoint: string
//     clientId: string
//     acrValues: string
//   }
// }

export interface ISetConfigurationRequest extends IRequest {
  // serverUri: string
  // serverWebPort: number
  // spTLSCrtPath: string
  // spTLSKeyPath: string
  // logging: Logging
  // idpInitiated: IdpInitiated
}
