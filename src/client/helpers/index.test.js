import * as helpers from './'

describe('helpers', () => {
  describe('parseIds', () => {
    let parsedIds

    beforeEach(() => {
      parsedIds = helpers.parseIds('spotify:track:2r0H9GPWHqxlopFd9WAEdF\nspotify:track:0N2NPFcJNVLQziIBn5LWZi')
    })

    afterEach(() => {
      parsedIds = null
    })

    it('should return an array of the appropriate length', () => {
      expect(parsedIds.length).toBe(2)
    })

    it('should trim whitespace', () => {
      expect(parsedIds.length).toBe(2)
    })

    it('should produce the correct output', () => {
      expect(parsedIds).toEqual(['2r0H9GPWHqxlopFd9WAEdF', '0N2NPFcJNVLQziIBn5LWZi'])
    })
  })
})
