import ky from 'ky'

const url = 'https://pl.wikipedia.org/w'

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
  },
  getArticle ({ title }) {
    const params = {
      action: 'query',
      format: 'json',
      titles: title,
      prop: 'info',
      inprop: 'url',
      origin: '*'
    }

    if (!title) {
      console.error('Wikipedia API: no title passed to getArticle')
    }

    return client
      .get(`api.php?`, {
        searchParams: {
          ...params
        }
      })
      .json()
  }
}

export default api
