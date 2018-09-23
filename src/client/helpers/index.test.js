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

  describe('formatTracks', () => {
    const unformattedTracks = [
      {
        artists: ['Iron Maiden'],
        name: 'Run to the Hills',
        duration_ms: 666,
        id: 666,
      },
      {
        artists: ['Dream Theater', 'Mike Portnoy'],
        name: 'Pull Me Under',
        duration_ms: 123,
        id: 123,
      },
    ]

    let formattedTracks

    beforeEach(() => {
      formattedTracks = helpers.formatTracks(unformattedTracks)
    })

    afterEach(() => {
      formattedTracks = null
    })

    it('should return an object of the appropriate length', () => {
      expect(formattedTracks.length).toBe(2)
    })
  })
})
