import { Mapper } from './Mapper'

describe('Helpers/Mappers', () => {
  describe('cfgRequest2RequestModel', () => {
    test('should exist', () => {
      const sut = new Mapper()
      expect(sut.cfgRequest2RequestModel).toBeTruthy()
    })
  })
})
