import { Notification } from 'element-ui'
import { MessageBox } from 'element-ui'
export const notify = ({ title, msg, type = 'info' }) => {
  Notification({
    title: title,
    message: msg,
    type: type
  })
}
export const confirm = ({ message, title = '提示', type = 'warning' }) => {
  return new Promise((resolve, reject) => {
    MessageBox.confirm(message, title, {
      type,
      callback (res) {
        if (res === 'confirm') {
          resolve()
        }
      }
    })
  })
}