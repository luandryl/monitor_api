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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 3 */
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

  getAll() {
    return this.model.find({})
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__schema_User__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Base_Model__ = __webpack_require__(3);




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

  getAll (req, res) {

    let modelPromise = new this.model().getAll()
    
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
    let data  = Object.assign(req.body, req.params)
    
    let modelPromise = new this.model(data).updateById()

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
    let modelPromise = new this.model(data).deleteById()

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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
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


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_User_Model__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_jwt__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_passport_jwt__ = __webpack_require__(30);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controllers_Auth_Controller__ = __webpack_require__(19);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controllers_Patient_Controller__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_passport__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_passport__);




let router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router()

let pt = new __WEBPACK_IMPORTED_MODULE_1__controllers_Patient_Controller__["a" /* default */]()


const protect = __WEBPACK_IMPORTED_MODULE_2_passport___default.a.authenticate('jwt', {
	session: false
})

router.post('/bpm/', (req, res) => {
  pt.saveBpm(req, res)
})

router.post('/', protect, (req, res) => {
  pt.save(req, res)
})

router.get('/monitor/:id', protect, (req, res) => {
  pt.loadDataFromSensorTag(req, res);
})

router.get('/doctor/:id', protect, (req, res) => {
  pt.getByDoc(req, res);
})

router.get('/', protect, (req, res) => {
  pt.getAll(req, res);
})

router.get('/:id', protect, (req, res) => {
  pt.getById(req, res)
})
 
router.put('/:_id', protect, (req, res) => {
  pt.updateById(req, res)
})

router.delete('/:id', protect, (req, res) => {
  pt.removeById(req, res)
})

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controllers_User_Controller__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_passport__ = __webpack_require__(2);
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
/* 12 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_morgan__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_morgan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_morgan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_cookie_parser__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_cookie_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_body_parser__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_passport__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_cors__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_cors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_config_database__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_routes_User_Router__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_routes_Auth_Router__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_routes_Patient_Router__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_middleware_Passport_Middleware__ = __webpack_require__(8);
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

const protect = new __WEBPACK_IMPORTED_MODULE_12__src_middleware_Passport_Middleware__["a" /* default */](__WEBPACK_IMPORTED_MODULE_6_passport___default.a)
protect.protect()

let app = __WEBPACK_IMPORTED_MODULE_0_express___default()()

app.use(__WEBPACK_IMPORTED_MODULE_2_morgan___default()('dev'))
app.use(__WEBPACK_IMPORTED_MODULE_4_body_parser___default.a.json())
app.use(__WEBPACK_IMPORTED_MODULE_4_body_parser___default.a.urlencoded({ extended: false }))
app.use(__WEBPACK_IMPORTED_MODULE_3_cookie_parser___default()())
app.use(__WEBPACK_IMPORTED_MODULE_0_express___default.a.static(__WEBPACK_IMPORTED_MODULE_1_path___default.a.join(__dirname, 'public')))
app.use(__WEBPACK_IMPORTED_MODULE_7_cors___default()());
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
app.use('/patient', __WEBPACK_IMPORTED_MODULE_11__src_routes_Patient_Router__["a" /* default */])
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
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "/"))

/***/ }),
/* 18 */
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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_User_Model__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_jwt__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_HashPassword__ = __webpack_require__(27);
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
		new __WEBPACK_IMPORTED_MODULE_0__models_User_Model__["a" /* default */]().getByField(data).then(user => {
			if (user.lenght !== 0){
				user = user[0];
				if (__WEBPACK_IMPORTED_MODULE_3__services_HashPassword__["a" /* default */].encrypt(req.body.password) === user.password) {
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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base_Controller__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_Patient_Model__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_Sensor_Model__ = __webpack_require__(23);





class UserController extends __WEBPACK_IMPORTED_MODULE_0__Base_Controller__["a" /* default */] {

  constructor() {
    super(__WEBPACK_IMPORTED_MODULE_1__models_Patient_Model__["a" /* default */])
  }

  loadDataFromSensorTag(req, res) {
    let data = {
      sensorTag: req.params.id
    }
    console.log(data)
    new __WEBPACK_IMPORTED_MODULE_2__models_Sensor_Model__["a" /* default */]().getByField(data).then(data => {
      if (data) {
        res.json(data).status(200).end()
      }
    }).catch(err => {
      console.log(err)
    })
  }

  saveBpm (req, res) {
    if (req.body) {
      const sensorTag = req.body.sensorTag.split('\\')[0]
      let bpm = req.body.bpm.split('\\')[0]
      let data = {
        sensorTag: sensorTag,
        bpm: bpm
      }
      new __WEBPACK_IMPORTED_MODULE_2__models_Sensor_Model__["a" /* default */](data).persist().then((savedObj) => {
        res.send(savedObj[0]).status(201).end()
      }).catch(err => {
        console.log(err)
      })
      res.end();
    }
  }

  getByDoc (req, res) {
    let data = {
      _user: req.params.id
    }
    let patientPromise = new __WEBPACK_IMPORTED_MODULE_1__models_Patient_Model__["a" /* default */]().getByField(data)

    Promise.all([
      patientPromise
    ]).then((data) => {
      if (data) {
        res.status(200).json(data[0]).end();
      }
    }).catch (err => {
      console.log(err)
    })
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UserController;


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base_Controller__ = __webpack_require__(6);
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
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__schema_Patient__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Base_Model__ = __webpack_require__(3);




class UserModel extends __WEBPACK_IMPORTED_MODULE_1__Base_Model__["a" /* default */] {

  constructor(data) {
    super(__WEBPACK_IMPORTED_MODULE_0__schema_Patient__["a" /* default */], '_id', data)
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UserModel;


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__schema_Sensor__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Base_Model__ = __webpack_require__(3);




class UserModel extends __WEBPACK_IMPORTED_MODULE_1__Base_Model__["a" /* default */] {

  constructor(data) {
    super(__WEBPACK_IMPORTED_MODULE_0__schema_Sensor__["a" /* default */], '_id', data)
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UserModel;


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);


/**
 * Restrictions
 */

const userRestriction = {
	type: __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema.Types.ObjectId,
	ref: 'User',
	required: true
}

const nameRestriction = {
  type: String,
  required: [true, 'No name given'],
  minlength: [3, 'Name too short'],
  maxlength: [100, 'Name too big'],
}

const emailRestriction = {
  type: String,
  required: [true, 'No email given'],
}

const ageRestricion = {
    type: Number,
    required: [true, 'No Age given']
}
const weightRestricion = {
    type: Number,
    required: [true, 'No weight given']
}

const sexRestriction = {
  type: String,
  required: [true, 'no sex given']
}

const sendentaryRestriction = {
  type: String,
  required: [true, 'please inform the situation of physics atv']
}

const sensorRestricion = {
  type: Number,
  required: [true, 'No weight given']
}


/**
 * Student Schema
 */

const patientSchema = new __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema({
  _user: userRestriction,
  first_name: nameRestriction,
  last_name: nameRestriction,
  email: emailRestriction,
  age: ageRestricion,
  weight: weightRestricion,
  sex: sexRestriction,
  sedentary: sendentaryRestriction,
  medicines: nameRestriction,
  sensor: sensorRestricion
})

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('Patient', patientSchema));

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);


const bpmRestricion = {
    type: Number,
    required: [true, 'No bpm given']
}

const sensorTagRestricion = {
    type: Number,
    required: [true, 'No bpm given']
}

const sensorSchema = new __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema({
    bpm: bpmRestricion,
    sensorTag: sensorTagRestricion
})

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('Sensor', sensorSchema));
  


/***/ }),
/* 26 */
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_crypto__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_hash__ = __webpack_require__(18);

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
/* 28 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ })
/******/ ]);