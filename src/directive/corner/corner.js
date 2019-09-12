import './corner.css'
export default {
  bind(el, binding) {
    const parentDom = document.createElement('div')
    const childDom_l = document.createElement('span')
    const childDom_r = document.createElement('span')
    parentDom.className = 'corner_wrap'
    childDom_r.className = 'corner_list corner_l'
    childDom_l.className = 'corner_list corner_r'
    // parentDom.style.visibility = binding.value ? 'visible' : 'hidden'
    el.appendChild(parentDom)
    parentDom.appendChild(childDom_r)
    parentDom.appendChild(childDom_l)
    console.log(binding)
    if (!binding.modifiers.active) {
      childDom_l.style.animation = 'none'
      childDom_r.style.animation = 'none'
    }
  }
}
