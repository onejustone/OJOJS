import { isEmptyArray, isEmptyObject, _typeof } from './detectDataType'
import utils from 'utils'

const getCascaderNode = function _getCascaderNode (_value, _options, _props) {
  if (!_value || isEmptyArray(_value)) {
    console.warn('getCascaderNode value is empty')
    return
  }

  if (!_options || isEmptyArray(_options)) {
    console.warn('getCascaderNode options is empty')
    return
  }

  let options = _options

  // const labelKey = _props.label || 'label'
  const childrenKey = _props.children || 'children'
  const valueKey = _props.value || 'value'

  const currentNode = []

  _value.forEach(value => {
    const targetOption = options && options.find(option => option[valueKey] === value)
    if (targetOption) {
      currentNode.push(targetOption)
      options = targetOption[childrenKey]
    }
  })

  return currentNode
}

const debounce = function _debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

const getAncestorNodes = function _getAncestorNodes (currentId, valueKey, titileOptions) {
  let ancestorNodes = []

  const parentNode = getParent(currentId, valueKey, titileOptions)

  if (!parentNode) {
    console.warn('[cathced error at getAncestorNodes valueId is]', currentId)
    return []
  }

  if (parentNode[valueKey] !== currentId) {
    if (utils.hasOwn(parentNode, 'children')) {
      ancestorNodes = [
        ..._getAncestorNodes(currentId, valueKey, parentNode.children)
      ]
    } else {
      console.error('error, not find targetNode')
    }
  }

  ancestorNodes.push(parentNode)

  return ancestorNodes
}

const getParent = function _getParent (currentId, valueKey, titileOptions) {
  let parentNode = null

  parentNode = titileOptions.find(item => {
    if (item[valueKey] === currentId) {
      return true
    } else if (utils.hasOwn(item, 'children')) {
      return _getParent(currentId, valueKey, item.children)
    }
  })

  return parentNode
}

const catIn = function (target, parent) {
  const path = []
  let parentNode = target
  while (parentNode && parentNode !== document.body) {
    path.push(parentNode)
    parentNode = parentNode.parentNode
  }
  return path.indexOf(parent) !== -1
}

function resetObjectToEmpty (targetObj) {
  if (typeof targetObj === 'undefined') return

  const calss2Value = {
    'string': '',
    'number': null,
    'array': [],
    'object': {},
    'null': null
  }

  Object.keys(targetObj).forEach(key => {
    if (_typeof(targetObj[key]) === 'object' && !isEmptyObject(targetObj[key])) {
      resetObjectToEmpty(targetObj[key])
    } else {
      targetObj[key] = calss2Value[_typeof(targetObj[key])]
    }
  })
}

const getPropByPath = function _getPropByPath (obj, path, strict) {
  let tempObj = obj
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')

  const keyArr = path.split('.')
  let i = 0
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break
    const key = keyArr[i]
    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!')
      }
      break
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  }
}

const getValuePropByPath = function _getValuePropByPath (obj, path, strict) {
  return getPropByPath(obj, path, strict).v
}

const hasSpecialTypeInLayout = function _hasSpecialTypeInLayout (layout, specialType) {
  if (!Array.isArray(layout)) return

  let existSpecialType = false

  const checkSpecialType = (layout) => {
    layout.content.forEach(layoutGroup => {
      layoutGroup.forEach(layoutItem => {
        if (layoutItem.type === specialType) {
          existSpecialType = true
        }

        if (layoutItem.type === 'layout') {
          checkSpecialType(layoutItem)
        }
      })
    })
  }

  checkSpecialType(layout)

  return existSpecialType
}

function extractValue (obj, path, defaultValue = null) {
  if (!obj) return defaultValue
  if (typeof obj === 'undefined') {
    return defaultValue
  }
  const p = path.split('.')
  let r = obj
  for (let i = 0; i < p.length; i += 1) {
    if (!r[p[i]]) return defaultValue
    r = r[p[i]]
  }
  return r
}

function fallbackCopyTextToClipboard (text) {
  const textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    const successful = document.execCommand('copy')
    const msg = successful ? 'successful' : 'unsuccessful'
    console.warn('Fallback: Copying text command was ' + msg)
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err)
  }

  document.body.removeChild(textArea)
}

function copyTextToClipboard (text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text)
    return
  }
  navigator.clipboard.writeText(text).then(function () {
    console.warn('Async: Copying to clipboard was successful!')
  }, function (err) {
    console.error('Async: Could not copy text: ', err)
  })
}

function popupCenterWindow (href, title, percent = 0.8, closeCb) {
  const w = window.screen.width * percent
  const h = window.screen.height * percent
  const left = window.screen.width * (1 - percent) / 2
  const top = window.screen.height * (1 - percent) / 2
  const windowHandler = window.open(href, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

  if (closeCb) {
    const timer = setInterval(() => {
      if (windowHandler.closed) {
        clearInterval(timer)
        closeCb()
      }
    }, 100)
  }

  return windowHandler
}

export {
  getCascaderNode,
  debounce,
  getAncestorNodes,
  getParent,
  catIn,
  getValuePropByPath,
  getPropByPath,
  hasSpecialTypeInLayout,
  extractValue,
  copyTextToClipboard,
  resetObjectToEmpty,
  popupCenterWindow
}
