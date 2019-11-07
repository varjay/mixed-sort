/*!
 * mixed-sort
 * @version 1.0.1
 * @see https://github.com/varjay/
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MSort"] = factory();
	else
		root["MSort"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sortzh__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


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
  arr = arr.concat(_sortzh__WEBPACK_IMPORTED_MODULE_0__["default"])
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
  let numI = _sortzh__WEBPACK_IMPORTED_MODULE_0__["default"][8]
  let positionI = arr.indexOf(numI)
  for (let i = iArr.length - 1; i >= 0; i--) {
    arr.splice(positionI, 0, iArr[i])
  }
  let UV = uArr.concat(vArr)
  let numV = _sortzh__WEBPACK_IMPORTED_MODULE_0__["default"][19]
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

/* harmony default export */ __webpack_exports__["default"] = (main);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([
  {
    zh: '阿',
    le: 'a'
  },
  {
    zh: '八',
    le: 'b'
  },
  {
    zh: '嚓',
    le: 'c'
  },
  {
    zh: '哒',
    le: 'd'
  },
  {
    zh: '妸',
    le: 'e'
  },
  {
    zh: '发',
    le: 'f'
  },
  {
    zh: '旮',
    le: 'g'
  },
  {
    zh: '哈',
    le: 'h'
  },
  {
    zh: '讥',
    le: 'j'
  },
  {
    zh: '咔',
    le: 'k'
  },
  {
    zh: '垃',
    le: 'l'
  },
  {
    zh: '麻',
    le: 'm'
  },
  {
    zh: '拏',
    le: 'n'
  },
  {
    zh: '噢',
    le: 'o'
  },
  {
    zh: '妑',
    le: 'p'
  },
  {
    zh: '七',
    le: 'q'
  },
  {
    zh: '呥',
    le: 'r'
  },
  {
    zh: '扨',
    le: 's'
  },
  {
    zh: '它',
    le: 't'
  },
  {
    zh: '穵',
    le: 'w'
  },
  {
    zh: '夕',
    le: 'x'
  },
  {
    zh: '丫',
    le: 'y'
  },
  {
    zh: '帀',
    le: 'z'
  }
]);


/***/ })
/******/ ])["default"];
});