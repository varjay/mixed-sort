import sortzh from './sortzh'

function switchkey (obj, sortName, sortName2) {
  let r
  let witch = obj[sortName]?sortName:sortName2
  if (!witch) {
    return ''
  }
  if (/^[a-zA-Z]/.test(obj[witch] ? obj[witch] : '没有')) {
    r = obj.en2zh
  } else {
    r = obj[witch]
  }
  if (!r) {
    return obj.zh
  }
  return r
}

function main (arr, [sortName, sortName2], isTag = 1) {
  arr = arr.concat(sortzh)
  // 暂时无法对i u v 排序
  const LETTERS = 'abcdefghjklmnopqrstwxyz'.split('')
  const ZH = '安贝苍邓妸范葛胡杰科黎迈倪噢潘全呥萨特王希杨扎'.split('')
  let iArr = [{zh: '存在', le: 'i'}]
  let uArr = [{zh: '存在', le: 'u'}]
  let vArr = [{zh: '存在', le: 'v'}]
  for (var i = arr.length - 1; i >= 0; i--) {
    let witch = arr[i][sortName]?sortName:sortName2
    if (arr[i][witch] && /^[a-zA-Z]/.test(arr[i][witch])) {
      let a = LETTERS.indexOf(arr[i][witch][0].toLowerCase())
      if (a > -1) {
        arr[i]['en2zh'] = ZH[a]
        arr[i]['le'] = arr[i][witch][0]
      } else {
        let letter = arr[i][witch][0]
        let isIUV = 0
        switch (letter) {
          case 'I':
          case 'i': iArr.push(arr[i]); isIUV = 1; break
          case 'U':
          case 'u': uArr.push(arr[i]); isIUV = 1; break
          case 'V':
          case 'v': vArr.push(arr[i]); isIUV = 1; break
        }
        if (isIUV) {
          arr.splice(i, 1)
        }
      }
    }
  }

  arr.sort(
    function compareFunction (param1, param2) {
      let one = switchkey(param1, sortName, sortName2)
      let two = switchkey(param2, sortName, sortName2)
      let r = one.localeCompare(two, 'zh-CN')
      return r
    }
  )

  // 处理iuv
  let numI = sortzh[8]
  let positionI = arr.indexOf(numI)
  for (let i = iArr.length - 1; i >= 0; i--) {
    arr.splice(positionI, 0, iArr[i])
  }
  let UV = uArr.concat(vArr)
  let numV = sortzh[19]
  let positionV = arr.indexOf(numV)
  for (let i = UV.length - 1; i >= 0; i--) {
    arr.splice(positionV, 0, UV[i])
  }

  // 分离无法识别的项目
  let noSort = []
  let delPosition = -1
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].le === 'a') {
      break
    }
    noSort.push(arr[i])
    delPosition = i
  }
  arr.splice(0, delPosition + 1)
  for (let i = arr.length - 1; i >= 0; i--) {
    if (/^[\u4e00-\u9fa5a-zA-Z]/.test(arr[i][sortName])) {
      break
    }
    noSort.push(arr[i])
    arr.splice(i, 1)
  }
  if (noSort.length > 0) {
    arr = arr.concat({zh: '#', le: '#'}, noSort)
  }

  if (isTag) {
    // 删除空的项目
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i].zh && arr[i + 1] && arr[i + 1].zh) {
        arr.splice(i, 1)
      }
    }
  } else {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i].zh) {
        arr.splice(i, 1)
      }
    }
  }
  return arr
}

main.Version = '0.0.1'

export default main
