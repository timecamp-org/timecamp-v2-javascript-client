import ApiRequest from '../ApiRequest'
import autobind from 'class-autobind';

const DB_NAME = 'timemcmp2_';

export default class ApiCacheRequest extends ApiRequest {

  constructor (restApiUrlBuilder, PouchDB) {
      super(restApiUrlBuilder)
      autobind(this);

      if(!PouchDB){
        throw new Error(`please import pouchdb manually`)
      }

      this.db = new PouchDB(DB_NAME)

      if (!this.db) {
        throw new Error(`PouchDb did not initialized`)
      }
  }

  async dispatch (method, data, endpoint, isResponsePlainText = false) {
    let response
    try {
      response = await this.dispatchRequest(method, data, endpoint, isResponsePlainText)
    }
    catch(err) {
      // fetch failed
      switch (method) {
        case 'post':
        case 'delete':
        await this.saveRequest(method, data, endpoint)
        break;
      }
      throw err;
    }
    return response
  }

  saveRequest (method, data, endpoint) {
    this.db.post({
      method,
      data,
      endpoint
    })
  }

  async sendAllCachedRequests () {
    try {
      let result = await this.db.allDocs({include_docs: true});
      result.rows.map( async (row) => {
        const {method, data, endpoint} = row.doc

        throw new Error(); // test if catches
        // add comment why reverse order
        await db.remove(row.id, row.value.rev),
        await dispatch(method, data, endpoint)
      })

      return true;
    }
    catch(err) {
      debug(err)
      return false;
    }
  }

  async showAllCachedRequests () {
    const cache = await this.db.allDocs({include_docs: true})
    cache.rows.forEach((request) => {
      const {_id, method, data, endpoint} = request.doc
      console.log({
        _id,
        method,
        data,
        endpoint
      })
    })
  }

}
