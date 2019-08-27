import Vue from 'vue'
import store from '../store'
import server from '@/server'
let ws, tt, lockReconnect
const heartCheck = {
  timeout: 5000,
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function() {
    clearTimeout(this.timeoutObj)
    clearTimeout(this.serverTimeoutObj)
    return this
  },
  start: function(id) {
    this.timeoutObj && clearTimeout(this.timeoutObj)
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
    this.timeoutObj = setTimeout(() => {
      ws.send('heartbeat-' + id)
      console.log('发送了心跳')
      this.serverTimeoutObj = setTimeout(function() {
        ws.close()
      }, this.timeout)
    }, this.timeout)
  }
}
const createWebSocket = (id) => {
  try {
    ws = new WebSocket(server.websoket + 'f739cI5M6gbzGfS2950J2MF0wVnygHDfGRA6gvTeNQ/stat?uid=' + id)
    init(id)
  } catch (e) {
    console.log('catch')
    reconnect(id)
  }
}
function init(id) {
  ws.onclose = (event) => {
    console.log('websoket链接关闭了')
    reconnect(id)
  }
  ws.onmessage = (response) => {
    heartCheck.reset().start(id)
    const res = JSON.parse(response.data)
    if (res.data === 'open' && res.server_id) {
      store.commit('SET_SERVER_ID', res.server_id)
      return false
    }
    if (res.data) {
      if (res.data.status === 'complete') {
        store.commit('SET_INFODIALOG', false)
        const app = Vue.prototype.$instantion.$children[0]
        app.reload && app.reload()
      }
      addData(res)
    }
  }
  ws.onerror = (response) => {
    console.log('websoket连接失败')
  }
  ws.onopen = (response) => {
    console.log('websoketl连接打开')
    heartCheck.reset().start(id)
  }
  window.onbeforeunload = function() {
    ws.close()
  }
}
function reconnect(id) {
  console.log('重连')
  if (lockReconnect) {
    return
  }
  lockReconnect = true
  tt && clearTimeout(tt)
  tt = setTimeout(() => {
    createWebSocket(id)
    lockReconnect = false
  }, 4000)
}
// websoket 推送消息
function addData(res) {
  if (res.data.id) {
    const uploadArr = [...store.state.user.uploadList]
    const json = {
      msg: res.msg,
      time: res.data.time,
      status: res.data.status
    }
    const arr = [{
      name: res.data.name,
      id: res.data.id,
      status: res.data.status,
      items: [json]
    }]
    if (uploadArr.length > 0) {
      let has = false
      uploadArr.map(item => {
        if (item.id === res.data.id) {
          item.status = res.data.status
          has = true
          item.items.push(json)
        }
      })
      if (!has) {
        uploadArr.push(arr[0])
        store.commit('SET_UPLOADINFO', res.data.id)
      }
      store.commit('SET_UPLOADLIST', uploadArr)
    } else {
      store.commit('SET_UPLOADLIST', arr)
      store.commit('SET_UPLOADINFO', res.data.id)
    }
  }
}
export { createWebSocket, addData }
