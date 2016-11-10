import ApiRequest from '../ApiRequest'

const DB_NAME = 'CACHE_REQUST';

export default class ApiCacheRequest extends ApiRequest {

  static db = null

  constructor (restApiUrlBuilder, pouchDB) {
      super(restApiUrlBuilder)
      this.db = new PouchDB(DB_NAME)
  }

  async dispatch (method, data, endpoint) {
    let response = null
    try {
      response = await this.dispatchRequest(method, data, endpoint)
    }
    catch(err) {
      this.saveRequest(method, data, endpoint)
    }
    return response
  }

  saveRequest (method, data, endpoint) {
    if (this.db !== null) {
      try {
        this.db.post({
          method,
          data,
          endpoint
        })
      }
      catch(err) {
        console.log(err)
      }
    }
  }

  async sendAllCachedRequests () {
    if (this.db !== null) {
      try {
        const cache = await this.db.allDocs({include_docs: true})
        cache.rows.forEach((request) => {
          const {_id, method, data, endpoint} = request.doc
          this.db.remove(_id)
          this.dispatch(method, data, endpoint)
        })
      }
      catch(err) {
        console.log(err)
      }
    }
  }

}
