import ky from 'ky'

const url = 'https://en.wikipedia.org/w'

const client = ky.create({
  prefixUrl: url,
  headers: {
    'content-type': 'application/json'
  }
})

const api = {
  getArticles ({ coord, radius = 10000, limit = 10 } = {}) {
    const params = {
      action: 'query',
      list: 'geosearch',
      format: 'json',
      origin: '*'
    }

    if (!coord) {
      console.error('Wikipedia API: no coord passed to getArticles')
    }

    return client
      .get(`api.php?`, {
        searchParams: {
          ...params,
          gscoord: coord.lat + '|' + coord.lng,
          gsradius: radius,
          gslimit: limit
        }
      })
      .json()
  }
}

export default api
