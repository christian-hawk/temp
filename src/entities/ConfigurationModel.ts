interface ActiveMQConf {
  enabled: false
  host: 'mq.anyhost.com'
  port: 61616
  username: 'any_username'
  password: 'any_password'
}

interface Logging {
  logLevel: string
  consoleLogOnly: boolean
  activeMQConf: ActiveMQConf
}

interface IdpInitiated {
  oidcClient: {
    authorizationEndpoint: string
    clientId: string
    acrValues: string
  }
}

export interface ConfigurationModel {
  serverUri: string
  serverWebPort: number
  spTLSCrtPath: string
  spTLSKeyPath: string
  logging: Logging
  idpInitiated: IdpInitiated
}
