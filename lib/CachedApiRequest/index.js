import ApiRequest from '../ApiRequest'
import ApiResponse from '../ApiResponse'
import autobind from 'class-autobind';
import * as C from '../TimeCampApi/constants'

import {Timer} from '../TimeCampApi/Timer/model'
import {TimeEntry} from '../TimeCampApi/TimeEntry/model'
import {Task} from '../TimeCampApi/Task/model'

const DB_NAME = 'timecamp_v2_cache';

export default class ApiCacheRequest extends ApiRequest {

  constructor (restApiUrlBuilder, PouchDB) {
      super(restApiUrlBuilder)
      autobind(this);

      this.db = new PouchDB(DB_NAME)
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
        case 'post_form':
        case 'put':
        case 'delete':
        case 'delete_form':
        response = new ApiResponse(undefined, this.offlineResult(method, data, endpoint))
        await this.saveRequest(method, data, endpoint, JSON.stringify(response))
        break;
      }
    }
    return response
  }

  offlineResult (method, data, endpoint) {
    switch(endpoint) {
      case C.TIMER: return this.timerResponse(data)
      case C.TIME_ENTRIES: return this.timeEntriesResponse(method, data)
      case C.TASKS: return this.tasksResponse(method, data)
      case C.TASKS_MOBILE: return this.tasksMobileResponse(method, data)
    }

    return null
  }

  timerResponse (data) {
    switch(data.action) {
      case 'start': return {
        new_timer_id: '-0.111'+(new Date().getTime()),
        entry_id: '-0.222'+(new Date().getTime())
      }
      case 'status': throw Error("Cannot fetch timer status")
      case 'stop': return {}
    }
  }

  timeEntriesResponse (method, data) {
    switch(method) {
      case 'post': {
        let newTimeEntry = Object.assign({}, TimeEntry, data)
        newTimeEntry.entry_id = '-0.333'+(new Date().getTime())
        return newTimeEntry
      }
      case 'put': return {}
      case 'delete': return {}
    }
  }

  tasksResponse (method, data) {
    switch(method) {
      case 'post': {
        let newTask = Object.assign({}, Task, data)
        newTask.task_id = '-0.444'+(new Date().getTime())
        return {[newTask.task_id]: newTask}
      }
    }
  }

  tasksMobileResponse (method, data) {
    switch(method) {
      case 'post': {
        let newTask = Object.assign({}, Task, data)
        newTask.task_id = '-0.555'+(new Date().getTime())
        newTask.parent_id = newTask.parent_id+""
        return {[newTask.task_id]: newTask}
      }
    }
  }

  saveRequest (method, data, endpoint, response = null) {
    this.db.post({
      method,
      data,
      endpoint,
      response,
    })
  }

  async sendAllCachedRequests () {
    try {
      let result = await this.db.allDocs({include_docs: true});

      let tasksRequests = {
        post: [],
        put: [],
      }
      let timeEntriesRequests = {
        post: [],
        put: [],
        delete_form: [],
      }
      let timerRequests = {
        start: [],
        stop: [],
      }

      let tasksIds = {}
      let timeEntriesIds = {}

      for (let i=0; i<result.rows.length; i++) {
        const row = result.rows[i]
        const {method, data, endpoint} = row.doc
        const sended = JSON.parse(row.doc.response)

        switch (endpoint) {
          case C.TASKS:
          case C.TASKS_MOBILE: {
            tasksRequests[method].push({method, data, endpoint, sended})
            break;
          }
          case C.TIME_ENTRIES: {
            timeEntriesRequests[method].push({method, data, endpoint, sended})
          }
          case C.TIMER: {
            if (data.action == 'start') {
              timerRequests.start.push({method, data, endpoint, sended})
            }
            else if (data.action == 'stop') {
              timerRequests.stop.push({method, data, endpoint, sended})
            }
          }
        }

        await this.db.remove(row.id, row.value.rev)
      }

      /* START/STOP TIMER REQUESTS */
      for(let i=0; i<timerRequests.start.length; i++) {
        const request = timerRequests.start[i]
        const response = await this.dispatch(request.method, request.data, request.endpoint)
        if (typeof response.error === 'undefined') {
          timeEntriesIds[request.sended.data.entry_id] = response.data.entry_id

          if (typeof timerRequests.stop[i] !== 'undefined') {
            let stopRequest = timerRequests.stop[i]
            stopRequest.data.timer_id = response.data.new_timer_id
            await this.dispatch(stopRequest.method, stopRequest.data, stopRequest.endpoint)
          }
        }
      }

      if (timerRequests.start.length < timerRequests.stop.length) {
        for(let i=0; i<timerRequests.stop.length; i++) {
          const stopRequest = timerRequests.stop[i]
          const response = await this.dispatch(stopRequest.method, stopRequest.data, stopRequest.endpoint)
        }
      }

      /* CREATE TASK REQUESTS */
      for(let i=0; i<tasksRequests.post.length; i++) {
        const request = tasksRequests.post[i]
        const response = await this.dispatch(request.method, request.data, request.endpoint)

        if (!response.error) {
          tasksIds[request.sended.data.task_id] = response.data.task_id
        }
      }

      /* CREATE TIME ENTRY REQUESTS */
      for(let i=0; i<timeEntriesRequests.post.length; i++) {
        const request = timeEntriesRequests.post[i]

        if (request.data.task_id) {
          request.data.task_id = tasksIds[request.data.task_id]
        }

        const response = await this.dispatch(request.method, request.data, request.endpoint)
        if (typeof response.error === 'undefined') {
          timeEntriesIds[request.sended.data.entry_id] = response.data.entry_id
        }
      }

      /* EDIT TIME ENTRY REQUESTS */
      for(let i=0; i<timeEntriesRequests.put.length; i++) {
        const request = timeEntriesRequests.put[i]
        if (request.data.id) {
            if (request.data.id < 0) {
              const entryId = timeEntriesIds[request.data.id]
              request.data.id = entryId
            }

            const response = await this.dispatch(request.method, request.data, request.endpoint)
        }
      }

      /* DELETE TIME ENTRY REQUESTS */
      for(let i=0; i<timeEntriesRequests.delete_form.length; i++) {
        const request = timeEntriesRequests.delete_form[i]
        if (request.data.id) {
          if (request.data.id < 0){
            const entryId = timeEntriesIds[request.data.id]
            request.data.id = entryId
          }

          const response = await this.dispatch(request.method, request.data, request.endpoint)
        }
      }

      return true;
    }
    catch(err) {
      console.log(err)
      return false;
    }
  }

  async showAllCachedRequests () {
    const cache = await this.db.allDocs({include_docs: true})
    cache.rows.forEach((request) => {
      const {_id, method, data, endpoint, response} = request.doc
      console.log({
        _id,
        method,
        data,
        endpoint,
        response
      })
    })
  }

}
