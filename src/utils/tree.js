/**
 * 重组tree 数据结构
 * @param {Array} arr 需要重组的一维数组
 * @param {String} parentid 树结构父级标识
 * @param {String} id 树结构子级标识
 */
export function regroupTree(arr, parentid = 'parentid', id = 'id') {
  const rootArr = []
  const contentArr = []
  arr.map(item => {
    if (item[parentid] === '0') {
      rootArr.push(item)
    } else {
      contentArr.push(item)
    }
  })
  rootArr.map(item => {
    item.children = addChildren(item, item[id], contentArr, parentid, id)
  })
  return rootArr
  // 递归获取子数据
  function addChildren(traget, currentID, contentArr, parentid, id) {
    const surplusArr = []
    traget.children = []
    contentArr.map(item => {
      if (item[parentid] === currentID) {
        traget.children.push(item)
      } else {
        surplusArr.push(item)
      }
    })
    if (surplusArr.length > 0) {
      traget.children.map(item => {
        item.children = addChildren(item, item[id], surplusArr, parentid, id)
      })
    }
    return traget.children
  }
}

/*
 * @method 深度设置数组对象新增字段
 * @param {Array} traget 需要深度设置新增属性的目标数组
 * @param {String} child 下一层的字段名标识
 * @param {Object} obj 需要深度添加的对象
 */
export function setTreeCode(traget, child, obj) {
  if (Object.prototype.toString.call(traget) !== '[object Array]') {
    console.warn('setTreeCode方法需要数组类型!')
    return false
  } else {
    traget.map(item => {
      for (const i in obj) {
        item[i] = obj[i]
      }
      if (item[child] && item[child].length > 0) {
        setTreeCode(item[child], child, obj)
      }
    })
  }
}
/*
 * @param {Array} nodeData tree组件通过 getCheckedNodes 方法获取的数组
 * @param {Array} children tree组件子元素字段
 */
export function getTreeKey(nodeData, children = 'children') {
  const resultData = []
  nodeData.map((item, index, arr) => {
    if (item[children] && item[children].length > 0) {
      let pass = true
      item[children].map(list => {
        if (!arr.includes(list)) {
          pass = false
        }
      })
      if (pass) {
        resultData.push(...item[children])
      }
    }
  })
  return nodeData.filter(item => !resultData.includes(item))
}
