import waves from './waves/waves.js'
import corner from './corner/corner.js'
import drag from './drag/drag.js'
const loadmore = {
  bind(el, binding) {
    const selectWrap = el.querySelector('.el-table__body-wrapper')
    selectWrap.addEventListener('scroll', function() {
      var sign = 100
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= sign) {
        binding.value()
      }
    })
  }
}
export default { waves, loadmore, corner, drag }
