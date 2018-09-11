/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__schema_User__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Base_Model__ = __webpack_require__(24);




/*
  Model operations to User
*/
/*
  Because this class extends to BaseModel we inherit from then all the basics data Operations.
  More specifcs data operetions should be implemented here
*/
class UserModel extends __WEBPACK_IMPORTED_MODULE_1__Base_Model__["a" /* default */] {
  /*
    pass data(req.params or req.body stuff) to our parent class (BaseModel)
  */
  constructor(data) {
    /*
      Calling the constructor from the parent class
      and pass to him all the config that him needs to work

      so ... magic, your crud its done :3
      try with another mongooseSchema, will work 
    */
    super(__WEBPACK_IMPORTED_MODULE_0__schema_User__["a" /* default */], '_id', data)
  }
 
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UserModel;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/**
 * JWT Config Module.
 * @module JWT
 */
/* harmony default export */ __webpack_exports__["a"] = ({
    secret: '704.94.9824.984hbi'
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);



class Database {

  constructor (env) {
    __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Promise = global.Promise
    return env === 'production' ? this.production(): this.local();
  }

  production () {
    let connection
    return connection = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.connect(process.env.MONGODB_URI)
      .then(() => {
        console.log('Database connected successfully')
      }).catch((err) => {
        console.error(err)
      })
  }

  local () {
    let connection
    const localURI = 'mongodb://monitorv1_db:101520monitor@ds251362.mlab.com:51362/heroku_h42hbmvm'
    return connection = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.connect(localURI, (err, db) => {
      if (err) console.log(err);
      if (__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.connection.readyState === 1)
        return connection
    })
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Database;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(19), __webpack_require__(1)))

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_User_Model__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_jwt__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_passport_jwt__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_passport_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_passport_jwt__);
/**
 * @namespace Middleware
 * @property {module:Passport} Passport
 */
/**
 * Each protected route pass through this Module.
 * Passport Module hadle with recive a token authentication
 * from some client that is intent to interact with CUC API and check if the received
 * token is valid. Case its VALID proced to route Case its NOT-VALID return 401 status
 * code and unauthorized message
 * @module Passport
 */

/**
 * Passport Module
 * @const
 */

/**
 * User Model Module
 * @const
 */

/**
 * JWT Config Module
 * @const
 */

/**
 * Passport-JWT Config Module
 * @const
 */


class PassportMiddleware {
	constructor (passport) {
		this.passport = passport
	}
	/**
	 * Protect Middleware Method.
	 *
	 * Receives a token from passport module and checks the token still valid
	 * and belongs an valid User on mongodb User Collection.
	 *
	 * @name Protect
	 * @method protect
	 * @todo Write comments
	*/
	protect () {
		let JwtStrategy = __WEBPACK_IMPORTED_MODULE_3_passport_jwt___default.a.Strategy
		let ExtractJwt = __WEBPACK_IMPORTED_MODULE_3_passport_jwt___default.a.ExtractJwt

		let opts = {
			'jwtFromRequest': ExtractJwt.fromAuthHeaderAsBearerToken(),
			'secretOrKey': __WEBPACK_IMPORTED_MODULE_2__config_jwt__["a" /* default */].secret
		}

		__WEBPACK_IMPORTED_MODULE_0_passport___default.a.use(new JwtStrategy(opts, (payload, done) => {
			let query = {
				_id: payload._id
			}

			let user = new __WEBPACK_IMPORTED_MODULE_1__models_User_Model__["a" /* default */](query).getById()

			Promise.all([
				user
			]).then(data => {
				if (data) {
					done(null, payload)
				} else {
					done(null, false)
				}
			}).catch(err => {
				if (err) {
					return done(err, false)
				}
			})
		}))
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PassportMiddleware;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controllers_Auth_Controller__ = __webpack_require__(21);
/**
 * @namespace Route
 * @property {module:Auth} Auth
 */
/** Authorization Resource Routes
 * 	Routing the Controller Object through resource endpoints
 * @module Auth
 * @requires express
 */

/**
 * express module
 * @const
 */

/**
 * Auth Controller Module
 * @const
 */

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 */
let router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router()
/**
 * Auth Controller Object
 * @type {object}
 * @const
 */
let auth = new __WEBPACK_IMPORTED_MODULE_1__controllers_Auth_Controller__["a" /* default */]()
/**
 * POST /auth/login/
 *
 * @name /auth/login/
 * @function
 * @todo write comments
 */
router.post('/login/', (req, res) => {
	res.header('Access-Control-Expose-Headers', 'authorization')
	auth.login(req, res)
})
/**
 * POST /auth/signup/:type
 *
 * @name /auth/signup/:type
 * @function
 * @todo write comments
 */
router.post('/signup/', (req, res) => {
	res.header('Access-Control-Expose-Headers', 'authorization')
	auth.signup(req, res)
})

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controllers_User_Controller__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_passport__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_passport__);

/*
  Import the resource controller, the code below its pretty intuitive :3
*/


let router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router()
/*
  import student RESOURCE CONTROLLER 
*/
let us = new __WEBPACK_IMPORTED_MODULE_1__controllers_User_Controller__["a" /* default */]()


const protect = __WEBPACK_IMPORTED_MODULE_2_passport___default.a.authenticate('jwt', {
	session: false
})

/*
  routing the controller object through student resource endpoints
*/
router.get('/', protect, (req, res) => {
  res.send({
    response: "hellow"
  })
})
router.post('/', protect, (req, res) => {
  us.save(req, res)
})

router.get('/:id', protect, (req, res) => {
  us.getById(req, res)
})
 
router.put('/:id', protect, (req, res) => {
  us.updateById(req, res)
})

router.delete('/:id', protect, (req, res) => {
  us.removeById(req, res)
})

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname, process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_morgan__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_morgan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_morgan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_cookie_parser__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_cookie_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_body_parser__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_passport__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_cors__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_cors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_config_database__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_routes_User_Router__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_routes_Auth_Router__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_middleware_Passport_Middleware__ = __webpack_require__(8);
/*
  Common
*/









/*
  Database Import
*/


/*
  Import Endpoints
  Ex : import student from './src/routes/Student.Router'
*/



/*
	middleware
*/

const protect = new __WEBPACK_IMPORTED_MODULE_11__src_middleware_Passport_Middleware__["a" /* default */](__WEBPACK_IMPORTED_MODULE_6_passport___default.a)
protect.protect()

let app = __WEBPACK_IMPORTED_MODULE_0_express___default()()

app.use(__WEBPACK_IMPORTED_MODULE_2_morgan___default()('dev'))
app.use(__WEBPACK_IMPORTED_MODULE_4_body_parser___default.a.json())
app.use(__WEBPACK_IMPORTED_MODULE_4_body_parser___default.a.urlencoded({ extended: false }))
app.use(__WEBPACK_IMPORTED_MODULE_3_cookie_parser___default()())
app.use(__WEBPACK_IMPORTED_MODULE_0_express___default.a.static(__WEBPACK_IMPORTED_MODULE_1_path___default.a.join(__dirname, 'public')))
app.use(__WEBPACK_IMPORTED_MODULE_7_cors___default()({origin: 'http://localhost:8080'}));
/*
  [Database conection] -> refactor
*/
const conn = new __WEBPACK_IMPORTED_MODULE_8__src_config_database__["a" /* default */]('local')
/*
  routes to student resource
  ex: app.use('/student', student)
*/
app.use('/auth/', __WEBPACK_IMPORTED_MODULE_10__src_routes_Auth_Router__["a" /* default */]);
app.use('/user/', __WEBPACK_IMPORTED_MODULE_9__src_routes_User_Router__["a" /* default */])
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500);
  res.render('error')
})

var port = process.env.PORT || 3000

app.listen(port, () => {
	console.log('Listening on ' + port)
})

/* harmony default export */ __webpack_exports__["default"] = (app);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "/", __webpack_require__(1)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17)


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {"sha224WithRSAEncryption":{"sign":"rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"RSA-SHA224":{"sign":"ecdsa/rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"sha256WithRSAEncryption":{"sign":"rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"RSA-SHA256":{"sign":"ecdsa/rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"sha384WithRSAEncryption":{"sign":"rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"RSA-SHA384":{"sign":"ecdsa/rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"sha512WithRSAEncryption":{"sign":"rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA512":{"sign":"ecdsa/rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA1":{"sign":"rsa","hash":"sha1","id":"3021300906052b0e03021a05000414"},"ecdsa-with-SHA1":{"sign":"ecdsa","hash":"sha1","id":""},"sha256":{"sign":"ecdsa","hash":"sha256","id":""},"sha224":{"sign":"ecdsa","hash":"sha224","id":""},"sha384":{"sign":"ecdsa","hash":"sha384","id":""},"sha512":{"sign":"ecdsa","hash":"sha512","id":""},"DSA-SHA":{"sign":"dsa","hash":"sha1","id":""},"DSA-SHA1":{"sign":"dsa","hash":"sha1","id":""},"DSA":{"sign":"dsa","hash":"sha1","id":""},"DSA-WITH-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-WITH-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-WITH-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-WITH-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-RIPEMD160":{"sign":"dsa","hash":"rmd160","id":""},"ripemd160WithRSA":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"RSA-RIPEMD160":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"md5WithRSAEncryption":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"},"RSA-MD5":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"}}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.randomBytes = exports.rng = exports.pseudoRandomBytes = exports.prng = __webpack_require__(37)
exports.createHash = exports.Hash = __webpack_require__(30)
exports.createHmac = exports.Hmac = __webpack_require__(31)

var algos = __webpack_require__(16)
var algoKeys = Object.keys(algos)
var hashes = ['sha1', 'sha224', 'sha256', 'sha384', 'sha512', 'md5', 'rmd160'].concat(algoKeys)
exports.getHashes = function () {
  return hashes
}

var p = __webpack_require__(35)
exports.pbkdf2 = p.pbkdf2
exports.pbkdf2Sync = p.pbkdf2Sync

var aes = __webpack_require__(27)

exports.Cipher = aes.Cipher
exports.createCipher = aes.createCipher
exports.Cipheriv = aes.Cipheriv
exports.createCipheriv = aes.createCipheriv
exports.Decipher = aes.Decipher
exports.createDecipher = aes.createDecipher
exports.Decipheriv = aes.Decipheriv
exports.createDecipheriv = aes.createDecipheriv
exports.getCiphers = aes.getCiphers
exports.listCiphers = aes.listCiphers

var dh = __webpack_require__(32)

exports.DiffieHellmanGroup = dh.DiffieHellmanGroup
exports.createDiffieHellmanGroup = dh.createDiffieHellmanGroup
exports.getDiffieHellman = dh.getDiffieHellman
exports.createDiffieHellman = dh.createDiffieHellman
exports.DiffieHellman = dh.DiffieHellman

var sign = __webpack_require__(28)

exports.createSign = sign.createSign
exports.Sign = sign.Sign
exports.createVerify = sign.createVerify
exports.Verify = sign.Verify

exports.createECDH = __webpack_require__(29)

var publicEncrypt = __webpack_require__(36)

exports.publicEncrypt = publicEncrypt.publicEncrypt
exports.privateEncrypt = publicEncrypt.privateEncrypt
exports.publicDecrypt = publicEncrypt.publicDecrypt
exports.privateDecrypt = publicEncrypt.privateDecrypt

// the least I can do is make error messages for the rest of the node.js/crypto api.
// ;[
//   'createCredentials'
// ].forEach(function (name) {
//   exports[name] = function () {
//     throw new Error([
//       'sorry, ' + name + ' is not implemented yet',
//       'we accept pull requests',
//       'https://github.com/crypto-browserify/crypto-browserify'
//     ].join('\n'))
//   }
// })

var rf = __webpack_require__(38)

exports.randomFill = rf.randomFill
exports.randomFillSync = rf.randomFillSync

exports.createCredentials = function () {
  throw new Error([
    'sorry, createCredentials is not implemented yet',
    'we accept pull requests',
    'https://github.com/crypto-browserify/crypto-browserify'
  ].join('\n'))
}

exports.constants = {
  'DH_CHECK_P_NOT_SAFE_PRIME': 2,
  'DH_CHECK_P_NOT_PRIME': 1,
  'DH_UNABLE_TO_CHECK_GENERATOR': 4,
  'DH_NOT_SUITABLE_GENERATOR': 8,
  'NPN_ENABLED': 1,
  'ALPN_ENABLED': 1,
  'RSA_PKCS1_PADDING': 1,
  'RSA_SSLV23_PADDING': 2,
  'RSA_NO_PADDING': 3,
  'RSA_PKCS1_OAEP_PADDING': 4,
  'RSA_X931_PADDING': 5,
  'RSA_PKCS1_PSS_PADDING': 6,
  'POINT_CONVERSION_COMPRESSED': 2,
  'POINT_CONVERSION_UNCOMPRESSED': 4,
  'POINT_CONVERSION_HYBRID': 6
}


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Hash Algorthm Config Module.
 * @module Hash
 */
/* harmony default export */ __webpack_exports__["a"] = ({
    algorithm: 'aes-256-ctr', 
    password: 'd6F3Efeq'
});

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_User_Model__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_jwt__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_HashPassword__ = __webpack_require__(26);
/**
 * AuthController handle with login and signup process.
 * @module AuthController
 */







class AuthController {

	signup (req, res) {
		let data = req.body;
		/*
			Todo: encrypt Hash
		*/
		data.password = __WEBPACK_IMPORTED_MODULE_3__services_HashPassword__["a" /* default */].encrypt(req.body.password)

		new __WEBPACK_IMPORTED_MODULE_0__models_User_Model__["a" /* default */](data).persist().then(user => {
			if (user) {
				let token = this._generateToken(user)
				res.set('authorization', `${token.type_token} ${token.acess_token}`)
				user.password = null
				let data = {
					token: token,
					user: user
				}
				res.status(201).json(data).end();
			} else {
				throw new Error('user_not_saved')
			}
		}).catch (err => {
			let errorMsg
			if (err.code === 11000) {
				if (err.errmsg.match(/email_1/)) errorMsg = 'duplicate_email'
				else if (err.errmsg.match(/login_1/)) errorMsg = 'duplicate_login'
			} else errorMsg = err.message
			res.status(400).json(errorMsg).end()
		})
	}

	login (req, res) {
		const data = {
			login: req.body.login
		}
		new __WEBPACK_IMPORTED_MODULE_0__models_User_Model__["a" /* default */](data).getByField().then(user => {
			if (user.lenght !== 0){
				user = user[0];
				if (__WEBPACK_IMPORTED_MODULE_3__services_HashPassword__["a" /* default */].encrypt(req.body.password) === __WEBPACK_IMPORTED_MODULE_3__services_HashPassword__["a" /* default */].encrypt(user.password)) {
					let token = this._generateToken(user)
					res.set('authorization', `${token.type_token} ${token.acess_token}`)
					user.password = null
					let data = {
						token: token,
						user: user
					}
					res.status(200).json(data).end();
				} else {
					throw new Error('invalid_login_password')
				}
			} else {
				throw new Error('invalid_login_username')
			}
		}).catch(err => {
			console.log(err)
		})
	}

	_generateToken (data) {
		let tokenInfo = {
			'email': data.email,
			'login': data.login,
			'_id': data._id
		}
		return {
			'acess_token': __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default.a.sign(tokenInfo, __WEBPACK_IMPORTED_MODULE_1__config_jwt__["a" /* default */].secret, {
				expiresIn: 10080 // in seconds
			}),
			'type_token': 'Bearer'
		}
	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = AuthController;


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/*
  Base Controller Operations
*/
class BaseController {
  /*
    The Constructor recives
    @model => mongoose Schema {
      sharing model context with the parent class
    }
  */
  constructor (model) {
    this.model = model
  }

  /*
    recives
    @req => express.Router() req context
    @req => express.Router() res context
  */
  /*
    Basics crud -> ID bases
  */

  /*
    All the methods working in the same way -> 
      resolve a promise given by mongoDB call
  */
  /*
    eg: save()
      req -> express.Router() context
      res -> express.Router() context

      so we resolve a promise call to any model (the model this is given by our child class)
      and before resolve we send the response to the client
  */
  save (req, res) {

    let modelPromise = new this.model(req.body).persist()
    
    Promise.all([
			modelPromise
		]).then((data) => {
			if(data) {
        res.send(data[0])
        res.status(201);
        res.end()
      }
		}).catch(err => {
			res.json(err);
      res.status(400);
      res.end();
		})
  }

  getById (req, res) {
    let modelPromise = new 
		this.model({
			_id: req.params.id
		}).getById();
		
		Promise.all([
			modelPromise
		]).then((data) => {
			if(data) {
        res.send(data[0])
        res.status(200);
        res.end()
      }
		}).catch(err => {
			console.log(err)
		})
  }

  updateById (req, res) {
		
    let modelPromise = this.model(req.body).updateById()

		Promise.all([
			modelPromise
		]).then((data) => {
			if(data) {
        res.send(data[0])
        res.status(200);
        res.end()
      }
		}).catch(err => {
			res.json(err);
      res.status(400);
      res.end();
		})
  }

  removeById (req, res) {

    let data = {
			_id: req.params.id
  	}	
		
    let modelPromise = this.model(data).deleteById()

		Promise.all([
			modelPromise
		]).then((data) => {
			if(data) {
        res.send(data[0])
        res.status(200);
        res.end()
      }
		}).catch(err => {
			res.json(err);
      res.status(400);
      res.end();
		})

  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = BaseController;


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base_Controller__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_User_Model__ = __webpack_require__(4);



/*
  Model operations to Student
*/
/*
  Because this class extends to Controller we inherit from then all the basics data Operations.
  More specifcs RESOURCES CONTROL OPERATIONS should be implemented here
*/
class UserController extends __WEBPACK_IMPORTED_MODULE_0__Base_Controller__["a" /* default */] {

  constructor() {
    /*
      Calling the constructor from the parent class
      and pass to him all the config that him needs to work

      so ... magic, your crud its done :3
      try with another mongooseSchema, will work,
      
      if its dont make sense map a mongooseSchema to 
      a resource controller just dont override the constructor method
      this open the possibility to bring another resources controllers(BookController, ChapterController)
      and compose one operation with them together
    */
    super(__WEBPACK_IMPORTED_MODULE_1__models_User_Model__["a" /* default */])
  }

  /*
    Below its a exemple of specifcs RESOURCES CONTROL OPERATIONS that
    only make sense a Student have
  */

  updateByLogin(req, res) {
    let query = {
      login: req.params.login
    }

    let student = new StudentModel(req.body).updateByField(query)

    Promise.all([
			student
		]).then((data) => { 
			if(data) {
        res.send(data[0])
        res.status(200);
        res.end()
      }
		}).catch(err => {
			res.json(err);
      res.status(400);
      res.end();
		})
  }

  removeByLogin(req, res) {
    let query = {
      login: req.params.login
    }
    
    let student = new StudentModel().deleteByField(query)

    Promise.all([
			student
		]).then((data) => {
			if(data) {
        res.send(data[0])
        res.status(200);
        res.end()
      }
		}).catch(err => {
			res.json(err);
      res.status(400);
      res.end();
		})
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = UserController;


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);


/*
  Base model Operations
*/
class BaseModel {
  /*
    The constructor recives 
    @model => mongoose Schema
    @key   => string of Mongoose Object ID
    @data  => transitional data object {
      the purpose of this attribute its to be a two way data bind between the requisition object 
      that we could store in mongodb or result of query in data stored on mongoDB  
    }
  */
  constructor(model, key, data) {
    __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Promise = Promise;
    this.model = model;
    this.key = key;
    this.data = data;
  }

  /*
    Basics crud -> ID bases
  */

  /*
    All the methods working in the same way -> 
      return a promise from the action that we try 
      to make
  */
  /*
    eg: persist()
      this.data  === req.body -> object that we want to store
      this.model === StudentSchema, BookSchema, anyStuffSchema ...

      so we return a promise to who calls the persist method and who 
      calls(that is who actually intend to save data) 
      must have to resolve this `create` promise

  */
  persist () {
    let modelObj = new this.model(this.data);
    return this.model.create(modelObj)
  }

  getById () {
    return this.model.find({_id: this.data._id}).exec()
  }

  updateById () {
    return this.model.findByIdAndUpdate(this.data._id, this.data)
  }

  /*
    this its return the number of rows afecteds by the data update,
    not the updated objects
  */
  deleteById(){
    return this.model.findByIdAndRemove(this.data._id)
  }

  /*
    advanced API -> Simple query on modelObjects coverage
  */
  getByField (data) {
    return this.model.find(data).exec()
  }

  deleteByField (query) {
    return this.model.findOneAndRemove(query).exec()
  }

  updateByField (query) {
    return this.model.update(query, this.data)
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = BaseModel;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);


/**
 * Restrictions
 */

const nameRestriction = {
  type: String,
  required: [true, 'No name given'],
  minlength: [3, 'Name too short'],
  maxlength: [100, 'Name too big'],
}

const emailRestriction = {
  type: String,
  required: [true, 'No email given'],
  index: [{unique: true}, 'Duplicate '],
}

// todo: make login unique
const loginRestriction = {
  type: String,
  required: [true, 'No login given'],
  index: { unique: true },
}

const passwordRestriction = {
  type: String,
  required: [true, 'No password given'],
}

/**
 * Student Schema
 */

const userSchema = new __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema({
  first_name: nameRestriction,
  last_name: nameRestriction,
  email: emailRestriction,
  login: loginRestriction,
  password: passwordRestriction,
})

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('User', userSchema));

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_crypto__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_hash__ = __webpack_require__(20);

/**
 * Hash Config Module
 * @const
 */


class HashPassword {
	/**
	 * Encrypt a given string
	 *
	 * @name Encrypt
	 * @param {string} password - String to Hash.
	 * @return {string} - The String Hash.
	 * @method encrypt
	 * @static
	 * @todo Write comments
	*/
	static encrypt (password) {
		let cipher = __WEBPACK_IMPORTED_MODULE_0_crypto___default.a.createCipher(__WEBPACK_IMPORTED_MODULE_1__config_hash__["a" /* default */].algorithm, __WEBPACK_IMPORTED_MODULE_1__config_hash__["a" /* default */].password)
		let crypted = cipher.update(password, 'utf8', 'hex')
		crypted += cipher.final('hex')
		return crypted
	}
	/**
	 * Decrypt a given string
	 *
	 * @name Decrypt
	 * @param {string} password - String to Decrypt.
	 * @return {string} - The String Decrypt.
	 * @method decrypt
	 * @static
	 * @todo Write comments
	*/
	static decrypt (password) {
		let decipher = __WEBPACK_IMPORTED_MODULE_0_crypto___default.a.createDecipher(__WEBPACK_IMPORTED_MODULE_1__config_hash__["a" /* default */].algorithm, __WEBPACK_IMPORTED_MODULE_1__config_hash__["a" /* default */].password)
		let dec = decipher.update(password, 'hex', 'utf8')
		dec += decipher.final('utf8')
		return dec
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HashPassword;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("browserify-cipher");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("browserify-sign");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("create-ecdh");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("create-hash");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("create-hmac");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("diffie-hellman");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("pbkdf2");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("public-encrypt");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("randombytes");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("randomfill");

/***/ })
/******/ ]);