(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-login-module"],{

/***/ "./node_modules/rxjs/internal/Observable.js":
/*!**************************************************!*\
  !*** ./node_modules/rxjs/internal/Observable.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var canReportError_1 = __webpack_require__(/*! ./util/canReportError */ "./node_modules/rxjs/internal/util/canReportError.js");
var toSubscriber_1 = __webpack_require__(/*! ./util/toSubscriber */ "./node_modules/rxjs/internal/util/toSubscriber.js");
var observable_1 = __webpack_require__(/*! ./symbol/observable */ "./node_modules/rxjs/internal/symbol/observable.js");
var pipe_1 = __webpack_require__(/*! ./util/pipe */ "./node_modules/rxjs/internal/util/pipe.js");
var config_1 = __webpack_require__(/*! ./config */ "./node_modules/rxjs/internal/config.js");
var Observable = (function () {
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            sink.add(operator.call(sink, this.source));
        }
        else {
            sink.add(this.source || (config_1.config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable) ?
                this._subscribe(sink) :
                this._trySubscribe(sink));
        }
        if (config_1.config.useDeprecatedSynchronousErrorHandling) {
            if (sink.syncErrorThrowable) {
                sink.syncErrorThrowable = false;
                if (sink.syncErrorThrown) {
                    throw sink.syncErrorValue;
                }
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            if (config_1.config.useDeprecatedSynchronousErrorHandling) {
                sink.syncErrorThrown = true;
                sink.syncErrorValue = err;
            }
            if (canReportError_1.canReportError(sink)) {
                sink.error(err);
            }
            else {
                console.warn(err);
            }
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscription;
            subscription = _this.subscribe(function (value) {
                try {
                    next(value);
                }
                catch (err) {
                    reject(err);
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var source = this.source;
        return source && source.subscribe(subscriber);
    };
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipe_1.pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
function getPromiseCtor(promiseCtor) {
    if (!promiseCtor) {
        promiseCtor = config_1.config.Promise || Promise;
    }
    if (!promiseCtor) {
        throw new Error('no Promise impl found');
    }
    return promiseCtor;
}
//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/Observer.js":
/*!************************************************!*\
  !*** ./node_modules/rxjs/internal/Observer.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __webpack_require__(/*! ./config */ "./node_modules/rxjs/internal/config.js");
var hostReportError_1 = __webpack_require__(/*! ./util/hostReportError */ "./node_modules/rxjs/internal/util/hostReportError.js");
exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) {
        if (config_1.config.useDeprecatedSynchronousErrorHandling) {
            throw err;
        }
        else {
            hostReportError_1.hostReportError(err);
        }
    },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/Subscriber.js":
/*!**************************************************!*\
  !*** ./node_modules/rxjs/internal/Subscriber.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var isFunction_1 = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/internal/util/isFunction.js");
var Observer_1 = __webpack_require__(/*! ./Observer */ "./node_modules/rxjs/internal/Observer.js");
var Subscription_1 = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/internal/Subscription.js");
var rxSubscriber_1 = __webpack_require__(/*! ../internal/symbol/rxSubscriber */ "./node_modules/rxjs/internal/symbol/rxSubscriber.js");
var config_1 = __webpack_require__(/*! ./config */ "./node_modules/rxjs/internal/config.js");
var hostReportError_1 = __webpack_require__(/*! ./util/hostReportError */ "./node_modules/rxjs/internal/util/hostReportError.js");
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destinationOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this.syncErrorValue = null;
        _this.syncErrorThrown = false;
        _this.syncErrorThrowable = false;
        _this.isStopped = false;
        switch (arguments.length) {
            case 0:
                _this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    _this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                        _this.destination = destinationOrNext;
                        destinationOrNext.add(_this);
                    }
                    else {
                        _this.syncErrorThrowable = true;
                        _this.destination = new SafeSubscriber(_this, destinationOrNext);
                    }
                    break;
                }
            default:
                _this.syncErrorThrowable = true;
                _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
                break;
        }
        return _this;
    }
    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () { return this; };
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _parentOrParents = this._parentOrParents;
        this._parentOrParents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parentOrParents = _parentOrParents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this._parentSubscriber = _parentSubscriber;
        var next;
        var context = _this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer_1.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    _this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = _this.unsubscribe.bind(_this);
            }
        }
        _this._context = context;
        _this._next = next;
        _this._error = error;
        _this._complete = complete;
        return _this;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!config_1.config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            var useDeprecatedSynchronousErrorHandling = config_1.config.useDeprecatedSynchronousErrorHandling;
            if (this._error) {
                if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                if (useDeprecatedSynchronousErrorHandling) {
                    throw err;
                }
                hostReportError_1.hostReportError(err);
            }
            else {
                if (useDeprecatedSynchronousErrorHandling) {
                    _parentSubscriber.syncErrorValue = err;
                    _parentSubscriber.syncErrorThrown = true;
                }
                else {
                    hostReportError_1.hostReportError(err);
                }
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!config_1.config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            if (config_1.config.useDeprecatedSynchronousErrorHandling) {
                throw err;
            }
            else {
                hostReportError_1.hostReportError(err);
            }
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        if (!config_1.config.useDeprecatedSynchronousErrorHandling) {
            throw new Error('bad call');
        }
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            if (config_1.config.useDeprecatedSynchronousErrorHandling) {
                parent.syncErrorValue = err;
                parent.syncErrorThrown = true;
                return true;
            }
            else {
                hostReportError_1.hostReportError(err);
                return true;
            }
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
exports.SafeSubscriber = SafeSubscriber;
//# sourceMappingURL=Subscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/Subscription.js":
/*!****************************************************!*\
  !*** ./node_modules/rxjs/internal/Subscription.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var isArray_1 = __webpack_require__(/*! ./util/isArray */ "./node_modules/rxjs/internal/util/isArray.js");
var isObject_1 = __webpack_require__(/*! ./util/isObject */ "./node_modules/rxjs/internal/util/isObject.js");
var isFunction_1 = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/internal/util/isFunction.js");
var UnsubscriptionError_1 = __webpack_require__(/*! ./util/UnsubscriptionError */ "./node_modules/rxjs/internal/util/UnsubscriptionError.js");
var Subscription = (function () {
    function Subscription(unsubscribe) {
        this.closed = false;
        this._parentOrParents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    Subscription.prototype.unsubscribe = function () {
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parentOrParents = _a._parentOrParents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parentOrParents = null;
        this._subscriptions = null;
        if (_parentOrParents instanceof Subscription) {
            _parentOrParents.remove(this);
        }
        else if (_parentOrParents !== null) {
            for (var index = 0; index < _parentOrParents.length; ++index) {
                var parent_1 = _parentOrParents[index];
                parent_1.remove(this);
            }
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            try {
                _unsubscribe.call(this);
            }
            catch (e) {
                errors = e instanceof UnsubscriptionError_1.UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            var index = -1;
            var len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    try {
                        sub.unsubscribe();
                    }
                    catch (e) {
                        errors = errors || [];
                        if (e instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
                        }
                        else {
                            errors.push(e);
                        }
                    }
                }
            }
        }
        if (errors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    Subscription.prototype.add = function (teardown) {
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (!(subscription instanceof Subscription)) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default: {
                if (!teardown) {
                    return Subscription.EMPTY;
                }
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
            }
        }
        var _parentOrParents = subscription._parentOrParents;
        if (_parentOrParents === null) {
            subscription._parentOrParents = this;
        }
        else if (_parentOrParents instanceof Subscription) {
            if (_parentOrParents === this) {
                return subscription;
            }
            subscription._parentOrParents = [_parentOrParents, this];
        }
        else if (_parentOrParents.indexOf(this) === -1) {
            _parentOrParents.push(this);
        }
        else {
            return subscription;
        }
        var subscriptions = this._subscriptions;
        if (subscriptions === null) {
            this._subscriptions = [subscription];
        }
        else {
            subscriptions.push(subscription);
        }
        return subscription;
    };
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/config.js":
/*!**********************************************!*\
  !*** ./node_modules/rxjs/internal/config.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _enable_super_gross_mode_that_will_cause_bad_things = false;
exports.config = {
    Promise: undefined,
    set useDeprecatedSynchronousErrorHandling(value) {
        if (value) {
            var error = new Error();
            console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
        }
        else if (_enable_super_gross_mode_that_will_cause_bad_things) {
            console.log('RxJS: Back to a better error behavior. Thank you. <3');
        }
        _enable_super_gross_mode_that_will_cause_bad_things = value;
    },
    get useDeprecatedSynchronousErrorHandling() {
        return _enable_super_gross_mode_that_will_cause_bad_things;
    },
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/symbol/observable.js":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs/internal/symbol/observable.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.observable = typeof Symbol === 'function' && Symbol.observable || '@@observable';
//# sourceMappingURL=observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/symbol/rxSubscriber.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/internal/symbol/rxSubscriber.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.rxSubscriber = typeof Symbol === 'function'
    ? Symbol('rxSubscriber')
    : '@@rxSubscriber_' + Math.random();
exports.$$rxSubscriber = exports.rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/UnsubscriptionError.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/internal/util/UnsubscriptionError.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function UnsubscriptionErrorImpl(errors) {
    Error.call(this);
    this.message = errors ?
        errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '';
    this.name = 'UnsubscriptionError';
    this.errors = errors;
    return this;
}
UnsubscriptionErrorImpl.prototype = Object.create(Error.prototype);
exports.UnsubscriptionError = UnsubscriptionErrorImpl;
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/canReportError.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/internal/util/canReportError.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/internal/Subscriber.js");
function canReportError(observer) {
    while (observer) {
        var _a = observer, closed_1 = _a.closed, destination = _a.destination, isStopped = _a.isStopped;
        if (closed_1 || isStopped) {
            return false;
        }
        else if (destination && destination instanceof Subscriber_1.Subscriber) {
            observer = destination;
        }
        else {
            observer = null;
        }
    }
    return true;
}
exports.canReportError = canReportError;
//# sourceMappingURL=canReportError.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/hostReportError.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/internal/util/hostReportError.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function hostReportError(err) {
    setTimeout(function () { throw err; }, 0);
}
exports.hostReportError = hostReportError;
//# sourceMappingURL=hostReportError.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/isArray.js":
/*!****************************************************!*\
  !*** ./node_modules/rxjs/internal/util/isArray.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/isFunction.js":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs/internal/util/isFunction.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;
//# sourceMappingURL=isFunction.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/isObject.js":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs/internal/util/isObject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isObject(x) {
    return x !== null && typeof x === 'object';
}
exports.isObject = isObject;
//# sourceMappingURL=isObject.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/noop.js":
/*!*************************************************!*\
  !*** ./node_modules/rxjs/internal/util/noop.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function noop() { }
exports.noop = noop;
//# sourceMappingURL=noop.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/pipe.js":
/*!*************************************************!*\
  !*** ./node_modules/rxjs/internal/util/pipe.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var noop_1 = __webpack_require__(/*! ./noop */ "./node_modules/rxjs/internal/util/noop.js");
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
exports.pipe = pipe;
function pipeFromArray(fns) {
    if (!fns) {
        return noop_1.noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
exports.pipeFromArray = pipeFromArray;
//# sourceMappingURL=pipe.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/toSubscriber.js":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs/internal/util/toSubscriber.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/internal/Subscriber.js");
var rxSubscriber_1 = __webpack_require__(/*! ../symbol/rxSubscriber */ "./node_modules/rxjs/internal/symbol/rxSubscriber.js");
var Observer_1 = __webpack_require__(/*! ../Observer */ "./node_modules/rxjs/internal/Observer.js");
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;
//# sourceMappingURL=toSubscriber.js.map

/***/ }),

/***/ "./src/app/components/pagina/pagina.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/pagina/pagina.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form class=\"float\">\n  <div class=\"container go-up delay-1\">\n    <div class=\"header\">\n      <img src=\"assets/logotipo_full_web.png\" alt=\"\" width=\"120px\"/>\n\n      <ion-icon name=\"close\" color=\"primary\" size=\"large\" (click)=\"fechar()\"></ion-icon>\n      <a (click)=\"fechar()\">Fechar</a>\n    </div>\n\n    <ng-content></ng-content>\n  </div>\n</form>\n"

/***/ }),

/***/ "./src/app/components/pagina/pagina.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/components/pagina/pagina.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "html.ios{--ion-default-font: -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", \"Roboto\", sans-serif}html.md{--ion-default-font: \"Roboto\", \"Helvetica Neue\", sans-serif}html{--ion-font-family: var(--ion-default-font)}body{background:var(--ion-background-color)}body.backdrop-no-scroll{overflow:hidden}.ion-color-primary{--ion-color-base: var(--ion-color-primary, #3880ff) !important;--ion-color-base-rgb: var(--ion-color-primary-rgb, 56,128,255) !important;--ion-color-contrast: var(--ion-color-primary-contrast, #fff) !important;--ion-color-contrast-rgb: var(--ion-color-primary-contrast-rgb, 255,255,255) !important;--ion-color-shade: var(--ion-color-primary-shade, #3171e0) !important;--ion-color-tint: var(--ion-color-primary-tint, #4c8dff) !important}.ion-color-secondary{--ion-color-base: var(--ion-color-secondary, #0cd1e8) !important;--ion-color-base-rgb: var(--ion-color-secondary-rgb, 12,209,232) !important;--ion-color-contrast: var(--ion-color-secondary-contrast, #fff) !important;--ion-color-contrast-rgb: var(--ion-color-secondary-contrast-rgb, 255,255,255) !important;--ion-color-shade: var(--ion-color-secondary-shade, #0bb8cc) !important;--ion-color-tint: var(--ion-color-secondary-tint, #24d6ea) !important}.ion-color-tertiary{--ion-color-base: var(--ion-color-tertiary, #7044ff) !important;--ion-color-base-rgb: var(--ion-color-tertiary-rgb, 112,68,255) !important;--ion-color-contrast: var(--ion-color-tertiary-contrast, #fff) !important;--ion-color-contrast-rgb: var(--ion-color-tertiary-contrast-rgb, 255,255,255) !important;--ion-color-shade: var(--ion-color-tertiary-shade, #633ce0) !important;--ion-color-tint: var(--ion-color-tertiary-tint, #7e57ff) !important}.ion-color-success{--ion-color-base: var(--ion-color-success, #10dc60) !important;--ion-color-base-rgb: var(--ion-color-success-rgb, 16,220,96) !important;--ion-color-contrast: var(--ion-color-success-contrast, #fff) !important;--ion-color-contrast-rgb: var(--ion-color-success-contrast-rgb, 255,255,255) !important;--ion-color-shade: var(--ion-color-success-shade, #0ec254) !important;--ion-color-tint: var(--ion-color-success-tint, #28e070) !important}.ion-color-warning{--ion-color-base: var(--ion-color-warning, #ffce00) !important;--ion-color-base-rgb: var(--ion-color-warning-rgb, 255,206,0) !important;--ion-color-contrast: var(--ion-color-warning-contrast, #fff) !important;--ion-color-contrast-rgb: var(--ion-color-warning-contrast-rgb, 255,255,255) !important;--ion-color-shade: var(--ion-color-warning-shade, #e0b500) !important;--ion-color-tint: var(--ion-color-warning-tint, #ffd31a) !important}.ion-color-danger{--ion-color-base: var(--ion-color-danger, #f04141) !important;--ion-color-base-rgb: var(--ion-color-danger-rgb, 240,65,65) !important;--ion-color-contrast: var(--ion-color-danger-contrast, #fff) !important;--ion-color-contrast-rgb: var(--ion-color-danger-contrast-rgb, 255,255,255) !important;--ion-color-shade: var(--ion-color-danger-shade, #d33939) !important;--ion-color-tint: var(--ion-color-danger-tint, #f25454) !important}.ion-color-light{--ion-color-base: var(--ion-color-light, #f4f5f8) !important;--ion-color-base-rgb: var(--ion-color-light-rgb, 244,245,248) !important;--ion-color-contrast: var(--ion-color-light-contrast, #000) !important;--ion-color-contrast-rgb: var(--ion-color-light-contrast-rgb, 0,0,0) !important;--ion-color-shade: var(--ion-color-light-shade, #d7d8da) !important;--ion-color-tint: var(--ion-color-light-tint, #f5f6f9) !important}.ion-color-medium{--ion-color-base: var(--ion-color-medium, #989aa2) !important;--ion-color-base-rgb: var(--ion-color-medium-rgb, 152,154,162) !important;--ion-color-contrast: var(--ion-color-medium-contrast, #fff) !important;--ion-color-contrast-rgb: var(--ion-color-medium-contrast-rgb, 255,255,255) !important;--ion-color-shade: var(--ion-color-medium-shade, #86888f) !important;--ion-color-tint: var(--ion-color-medium-tint, #a2a4ab) !important}.ion-color-dark{--ion-color-base: var(--ion-color-dark, #222428) !important;--ion-color-base-rgb: var(--ion-color-dark-rgb, 34,36,40) !important;--ion-color-contrast: var(--ion-color-dark-contrast, #fff) !important;--ion-color-contrast-rgb: var(--ion-color-dark-contrast-rgb, 255,255,255) !important;--ion-color-shade: var(--ion-color-dark-shade, #1e2023) !important;--ion-color-tint: var(--ion-color-dark-tint, #383a3e) !important}.ion-page{left:0;right:0;top:0;bottom:0;display:flex;position:absolute;flex-direction:column;justify-content:space-between;contain:layout size style;overflow:hidden;z-index:0}ion-route,ion-route-redirect,ion-router,ion-select-option,ion-nav-controller,ion-menu-controller,ion-action-sheet-controller,ion-alert-controller,ion-loading-controller,ion-modal-controller,ion-picker-controller,ion-popover-controller,ion-toast-controller,.ion-page-hidden,[hidden]{display:none !important}.ion-page-invisible{opacity:0}html.plt-ios.plt-hybrid,html.plt-ios.plt-pwa{--ion-statusbar-padding: 20px}@supports (padding-top: 20px){html{--ion-safe-area-top: var(--ion-statusbar-padding)}}@supports (padding-top: constant(safe-area-inset-top)){html{--ion-safe-area-top: constant(safe-area-inset-top);--ion-safe-area-bottom: constant(safe-area-inset-bottom);--ion-safe-area-left: constant(safe-area-inset-left);--ion-safe-area-right: constant(safe-area-inset-right)}}@supports (padding-top: env(safe-area-inset-top)){html{--ion-safe-area-top: env(safe-area-inset-top);--ion-safe-area-bottom: env(safe-area-inset-bottom);--ion-safe-area-left: env(safe-area-inset-left);--ion-safe-area-right: env(safe-area-inset-right)}}audio,canvas,progress,video{vertical-align:baseline}audio:not([controls]){display:none;height:0}b,strong{font-weight:bold}img{max-width:100%;border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{height:1px;border-width:0;box-sizing:content-box}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace, monospace;font-size:1em}label,input,select,textarea{font-family:inherit;line-height:normal}textarea{overflow:auto;height:auto;font:inherit;color:inherit}textarea::-webkit-input-placeholder{padding-left:2px}textarea::-moz-placeholder{padding-left:2px}textarea:-ms-input-placeholder{padding-left:2px}textarea::-ms-input-placeholder{padding-left:2px}textarea::placeholder{padding-left:2px}form,input,optgroup,select{margin:0;font:inherit;color:inherit}html input[type=\"button\"],input[type=\"reset\"],input[type=\"submit\"]{cursor:pointer;-webkit-appearance:button}a,a div,a span,a ion-icon,a ion-label,button,button div,button span,button ion-icon,button ion-label,.ion-tappable,[tappable],[tappable] div,[tappable] span,[tappable] ion-icon,[tappable] ion-label,input,textarea{touch-action:manipulation}a ion-label,button ion-label{pointer-events:none}button{border:0;border-radius:0;font-family:inherit;font-style:inherit;font-variant:inherit;line-height:1;text-transform:none;cursor:pointer;-webkit-appearance:button}[tappable]{cursor:pointer}a[disabled],button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0}input[type=\"checkbox\"],input[type=\"radio\"]{padding:0;box-sizing:border-box}input[type=\"number\"]::-webkit-inner-spin-button,input[type=\"number\"]::-webkit-outer-spin-button{height:auto}input[type=\"search\"]::-webkit-search-cancel-button,input[type=\"search\"]::-webkit-search-decoration{-webkit-appearance:none}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}*{box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none}html{width:100%;height:100%;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%}html.plt-pwa{height:100vh}body{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;position:fixed;width:100%;max-width:100%;height:100%;max-height:100%;text-rendering:optimizeLegibility;overflow:hidden;touch-action:manipulation;-webkit-user-drag:none;-ms-content-zooming:none;word-wrap:break-word;overscroll-behavior-y:none;-webkit-text-size-adjust:none;-moz-text-size-adjust:none;-ms-text-size-adjust:none;text-size-adjust:none}html{font-family:var(--ion-font-family)}a{background-color:transparent;color:var(--ion-color-primary, #3880ff)}h1,h2,h3,h4,h5,h6{margin-top:16px;margin-bottom:10px;font-weight:500;line-height:1.2}h1{margin-top:20px;font-size:26px}h2{margin-top:18px;font-size:24px}h3{font-size:22px}h4{font-size:20px}h5{font-size:18px}h6{font-size:16px}small{font-size:75%}sub,sup{position:relative;font-size:75%;line-height:0;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}.ion-hide{display:none !important}.ion-hide-up{display:none !important}@media (max-width: 575px){.ion-hide-down{display:none !important}}@media (min-width: 576px){.ion-hide-sm-up{display:none !important}}@media (max-width: 767px){.ion-hide-sm-down{display:none !important}}@media (min-width: 768px){.ion-hide-md-up{display:none !important}}@media (max-width: 991px){.ion-hide-md-down{display:none !important}}@media (min-width: 992px){.ion-hide-lg-up{display:none !important}}@media (max-width: 1199px){.ion-hide-lg-down{display:none !important}}@media (min-width: 1200px){.ion-hide-xl-up{display:none !important}}.ion-hide-xl-down{display:none !important}.ion-no-padding,[no-padding]{--padding-start: 0;--padding-end: 0;--padding-top: 0;--padding-bottom: 0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0}.ion-padding,[padding]{--padding-start: var(--ion-padding, 16px);--padding-end: var(--ion-padding, 16px);--padding-top: var(--ion-padding, 16px);--padding-bottom: var(--ion-padding, 16px);padding-left:var(--ion-padding, 16px);padding-right:var(--ion-padding, 16px);padding-top:var(--ion-padding, 16px);padding-bottom:var(--ion-padding, 16px)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.ion-padding,[padding]{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-padding, 16px);padding-inline-start:var(--ion-padding, 16px);-webkit-padding-end:var(--ion-padding, 16px);padding-inline-end:var(--ion-padding, 16px)}}.ion-padding-top,[padding-top]{--padding-top: var(--ion-padding, 16px);padding-top:var(--ion-padding, 16px)}.ion-padding-start,[padding-start]{--padding-start: var(--ion-padding, 16px);padding-left:var(--ion-padding, 16px)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.ion-padding-start,[padding-start]{padding-left:unset;-webkit-padding-start:var(--ion-padding, 16px);padding-inline-start:var(--ion-padding, 16px)}}.ion-padding-end,[padding-end]{--padding-end: var(--ion-padding, 16px);padding-right:var(--ion-padding, 16px)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.ion-padding-end,[padding-end]{padding-right:unset;-webkit-padding-end:var(--ion-padding, 16px);padding-inline-end:var(--ion-padding, 16px)}}.ion-padding-bottom,[padding-bottom]{--padding-bottom: var(--ion-padding, 16px);padding-bottom:var(--ion-padding, 16px)}.ion-padding-vertical,[padding-vertical]{--padding-top: var(--ion-padding, 16px);--padding-bottom: var(--ion-padding, 16px);padding-top:var(--ion-padding, 16px);padding-bottom:var(--ion-padding, 16px)}.ion-padding-horizontal,[padding-horizontal]{--padding-start: var(--ion-padding, 16px);--padding-end: var(--ion-padding, 16px);padding-left:var(--ion-padding, 16px);padding-right:var(--ion-padding, 16px)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.ion-padding-horizontal,[padding-horizontal]{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-padding, 16px);padding-inline-start:var(--ion-padding, 16px);-webkit-padding-end:var(--ion-padding, 16px);padding-inline-end:var(--ion-padding, 16px)}}.ion-no-margin,[no-margin]{--margin-start: 0;--margin-end: 0;--margin-top: 0;--margin-bottom: 0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}.ion-margin,[margin]{--margin-start: var(--ion-margin, 16px);--margin-end: var(--ion-margin, 16px);--margin-top: var(--ion-margin, 16px);--margin-bottom: var(--ion-margin, 16px);margin-left:var(--ion-margin, 16px);margin-right:var(--ion-margin, 16px);margin-top:var(--ion-margin, 16px);margin-bottom:var(--ion-margin, 16px)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.ion-margin,[margin]{margin-left:unset;margin-right:unset;-webkit-margin-start:var(--ion-margin, 16px);margin-inline-start:var(--ion-margin, 16px);-webkit-margin-end:var(--ion-margin, 16px);margin-inline-end:var(--ion-margin, 16px)}}.ion-margin-top,[margin-top]{--margin-top: var(--ion-margin, 16px);margin-top:var(--ion-margin, 16px)}.ion-margin-start,[margin-start]{--margin-start: var(--ion-margin, 16px);margin-left:var(--ion-margin, 16px)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.ion-margin-start,[margin-start]{margin-left:unset;-webkit-margin-start:var(--ion-margin, 16px);margin-inline-start:var(--ion-margin, 16px)}}.ion-margin-end,[margin-end]{--margin-end: var(--ion-margin, 16px);margin-right:var(--ion-margin, 16px)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.ion-margin-end,[margin-end]{margin-right:unset;-webkit-margin-end:var(--ion-margin, 16px);margin-inline-end:var(--ion-margin, 16px)}}.ion-margin-bottom,[margin-bottom]{--margin-bottom: var(--ion-margin, 16px);margin-bottom:var(--ion-margin, 16px)}.ion-margin-vertical,[margin-vertical]{--margin-top: var(--ion-margin, 16px);--margin-bottom: var(--ion-margin, 16px);margin-top:var(--ion-margin, 16px);margin-bottom:var(--ion-margin, 16px)}.ion-margin-horizontal,[margin-horizontal]{--margin-start: var(--ion-margin, 16px);--margin-end: var(--ion-margin, 16px);margin-left:var(--ion-margin, 16px);margin-right:var(--ion-margin, 16px)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.ion-margin-horizontal,[margin-horizontal]{margin-left:unset;margin-right:unset;-webkit-margin-start:var(--ion-margin, 16px);margin-inline-start:var(--ion-margin, 16px);-webkit-margin-end:var(--ion-margin, 16px);margin-inline-end:var(--ion-margin, 16px)}}.ion-float-left,[float-left]{float:left !important}.ion-float-right,[float-right]{float:right !important}.ion-float-start,[float-start]{float:left !important}:host-context([dir=rtl]) .ion-float-start,:host-context([dir=rtl]) [float-start]{float:right !important}.ion-float-end,[float-end]{float:right !important}:host-context([dir=rtl]) .ion-float-end,:host-context([dir=rtl]) [float-end]{float:left !important}@media (min-width: 576px){.ion-float-sm-left,[float-sm-left]{float:left !important}.ion-float-sm-right,[float-sm-right]{float:right !important}.ion-float-sm-start,[float-sm-start]{float:left !important}:host-context([dir=rtl]) .ion-float-sm-start,:host-context([dir=rtl]) [float-sm-start]{float:right !important}.ion-float-sm-end,[float-sm-end]{float:right !important}:host-context([dir=rtl]) .ion-float-sm-end,:host-context([dir=rtl]) [float-sm-end]{float:left !important}}@media (min-width: 768px){.ion-float-md-left,[float-md-left]{float:left !important}.ion-float-md-right,[float-md-right]{float:right !important}.ion-float-md-start,[float-md-start]{float:left !important}:host-context([dir=rtl]) .ion-float-md-start,:host-context([dir=rtl]) [float-md-start]{float:right !important}.ion-float-md-end,[float-md-end]{float:right !important}:host-context([dir=rtl]) .ion-float-md-end,:host-context([dir=rtl]) [float-md-end]{float:left !important}}@media (min-width: 992px){.ion-float-lg-left,[float-lg-left]{float:left !important}.ion-float-lg-right,[float-lg-right]{float:right !important}.ion-float-lg-start,[float-lg-start]{float:left !important}:host-context([dir=rtl]) .ion-float-lg-start,:host-context([dir=rtl]) [float-lg-start]{float:right !important}.ion-float-lg-end,[float-lg-end]{float:right !important}:host-context([dir=rtl]) .ion-float-lg-end,:host-context([dir=rtl]) [float-lg-end]{float:left !important}}@media (min-width: 1200px){.ion-float-xl-left,[float-xl-left]{float:left !important}.ion-float-xl-right,[float-xl-right]{float:right !important}.ion-float-xl-start,[float-xl-start]{float:left !important}:host-context([dir=rtl]) .ion-float-xl-start,:host-context([dir=rtl]) [float-xl-start]{float:right !important}.ion-float-xl-end,[float-xl-end]{float:right !important}:host-context([dir=rtl]) .ion-float-xl-end,:host-context([dir=rtl]) [float-xl-end]{float:left !important}}.ion-text-center,[text-center]{text-align:center !important}.ion-text-justify,[text-justify]{text-align:justify !important}.ion-text-start,[text-start]{text-align:start !important}.ion-text-end,[text-end]{text-align:end !important}.ion-text-left,[text-left]{text-align:left !important}.ion-text-right,[text-right]{text-align:right !important}.ion-text-nowrap,[text-nowrap]{white-space:nowrap !important}.ion-text-wrap,[text-wrap]{white-space:normal !important}@media (min-width: 576px){.ion-text-sm-center,[text-sm-center]{text-align:center !important}.ion-text-sm-justify,[text-sm-justify]{text-align:justify !important}.ion-text-sm-start,[text-sm-start]{text-align:start !important}.ion-text-sm-end,[text-sm-end]{text-align:end !important}.ion-text-sm-left,[text-sm-left]{text-align:left !important}.ion-text-sm-right,[text-sm-right]{text-align:right !important}.ion-text-sm-nowrap,[text-sm-nowrap]{white-space:nowrap !important}.ion-text-sm-wrap,[text-sm-wrap]{white-space:normal !important}}@media (min-width: 768px){.ion-text-md-center,[text-md-center]{text-align:center !important}.ion-text-md-justify,[text-md-justify]{text-align:justify !important}.ion-text-md-start,[text-md-start]{text-align:start !important}.ion-text-md-end,[text-md-end]{text-align:end !important}.ion-text-md-left,[text-md-left]{text-align:left !important}.ion-text-md-right,[text-md-right]{text-align:right !important}.ion-text-md-nowrap,[text-md-nowrap]{white-space:nowrap !important}.ion-text-md-wrap,[text-md-wrap]{white-space:normal !important}}@media (min-width: 992px){.ion-text-lg-center,[text-lg-center]{text-align:center !important}.ion-text-lg-justify,[text-lg-justify]{text-align:justify !important}.ion-text-lg-start,[text-lg-start]{text-align:start !important}.ion-text-lg-end,[text-lg-end]{text-align:end !important}.ion-text-lg-left,[text-lg-left]{text-align:left !important}.ion-text-lg-right,[text-lg-right]{text-align:right !important}.ion-text-lg-nowrap,[text-lg-nowrap]{white-space:nowrap !important}.ion-text-lg-wrap,[text-lg-wrap]{white-space:normal !important}}@media (min-width: 1200px){.ion-text-xl-center,[text-xl-center]{text-align:center !important}.ion-text-xl-justify,[text-xl-justify]{text-align:justify !important}.ion-text-xl-start,[text-xl-start]{text-align:start !important}.ion-text-xl-end,[text-xl-end]{text-align:end !important}.ion-text-xl-left,[text-xl-left]{text-align:left !important}.ion-text-xl-right,[text-xl-right]{text-align:right !important}.ion-text-xl-nowrap,[text-xl-nowrap]{white-space:nowrap !important}.ion-text-xl-wrap,[text-xl-wrap]{white-space:normal !important}}.ion-text-uppercase,[text-uppercase]{text-transform:uppercase !important}.ion-text-lowercase,[text-lowercase]{text-transform:lowercase !important}.ion-text-capitalize,[text-capitalize]{text-transform:capitalize !important}@media (min-width: 576px){.ion-text-sm-uppercase,[text-sm-uppercase]{text-transform:uppercase !important}.ion-text-sm-lowercase,[text-sm-lowercase]{text-transform:lowercase !important}.ion-text-sm-capitalize,[text-sm-capitalize]{text-transform:capitalize !important}}@media (min-width: 768px){.ion-text-md-uppercase,[text-md-uppercase]{text-transform:uppercase !important}.ion-text-md-lowercase,[text-md-lowercase]{text-transform:lowercase !important}.ion-text-md-capitalize,[text-md-capitalize]{text-transform:capitalize !important}}@media (min-width: 992px){.ion-text-lg-uppercase,[text-lg-uppercase]{text-transform:uppercase !important}.ion-text-lg-lowercase,[text-lg-lowercase]{text-transform:lowercase !important}.ion-text-lg-capitalize,[text-lg-capitalize]{text-transform:capitalize !important}}@media (min-width: 1200px){.ion-text-xl-uppercase,[text-xl-uppercase]{text-transform:uppercase !important}.ion-text-xl-lowercase,[text-xl-lowercase]{text-transform:lowercase !important}.ion-text-xl-capitalize,[text-xl-capitalize]{text-transform:capitalize !important}}.ion-align-self-start,[align-self-start]{align-self:flex-start !important}.ion-align-self-end,[align-self-end]{align-self:flex-end !important}.ion-align-self-center,[align-self-center]{align-self:center !important}.ion-align-self-stretch,[align-self-stretch]{align-self:stretch !important}.ion-align-self-baseline,[align-self-baseline]{align-self:baseline !important}.ion-align-self-auto,[align-self-auto]{align-self:auto !important}.ion-wrap,[wrap]{flex-wrap:wrap !important}.ion-nowrap,[nowrap]{flex-wrap:nowrap !important}.ion-wrap-reverse,[wrap-reverse]{flex-wrap:wrap-reverse !important}.ion-justify-content-start,[justify-content-start]{justify-content:flex-start !important}.ion-justify-content-center,[justify-content-center]{justify-content:center !important}.ion-justify-content-end,[justify-content-end]{justify-content:flex-end !important}.ion-justify-content-around,[justify-content-around]{justify-content:space-around !important}.ion-justify-content-between,[justify-content-between]{justify-content:space-between !important}.ion-justify-content-evenly,[justify-content-evenly]{justify-content:space-evenly !important}.ion-align-items-start,[align-items-start]{align-items:flex-start !important}.ion-align-items-center,[align-items-center]{align-items:center !important}.ion-align-items-end,[align-items-end]{align-items:flex-end !important}.ion-align-items-stretch,[align-items-stretch]{align-items:stretch !important}.ion-align-items-baseline,[align-items-baseline]{align-items:baseline !important}.go-up {\n  -webkit-animation-name: go-up;\n  animation-name: go-up;\n  -webkit-animation-iteration-count: 1;\n  animation-iteration-count: 1;\n  -webkit-animation-timing-function: cubic-bezier(0.55, 0, 0.1, 1);\n  animation-timing-function: cubic-bezier(0.55, 0, 0.1, 1);\n  -webkit-animation-duration: 0.3s;\n  animation-duration: 0.3s; }.go-up.delay-1 {\n    -webkit-animation-duration: 0.5s;\n    animation-duration: 0.5s; }.go-up.delay-2 {\n    -webkit-animation-duration: 0.7s;\n    animation-duration: 0.7s; }.go-up.delay-3 {\n    -webkit-animation-duration: 0.9s;\n    animation-duration: 0.9s; }.go-up.delay-4 {\n    -webkit-animation-duration: 1.1s;\n    animation-duration: 1.1s; }.go-up.delay-5 {\n    -webkit-animation-duration: 1.3s;\n    animation-duration: 1.3s; }.go-up.delay-6 {\n    -webkit-animation-duration: 1.5s;\n    animation-duration: 1.5s; }.go-up.delay-7 {\n    -webkit-animation-duration: 1.7s;\n    animation-duration: 1.7s; }.go-up.delay-8 {\n    -webkit-animation-duration: 1.9s;\n    animation-duration: 1.9s; }.go-up.delay-9 {\n    -webkit-animation-duration: 2.1s;\n    animation-duration: 2.1s; }.go-up.delay-10 {\n    -webkit-animation-duration: 2.3s;\n    animation-duration: 2.3s; }@-webkit-keyframes go-up {\n  0% {\n    -webkit-transform: translateY(80px);\n            transform: translateY(80px);\n    opacity: 0; }\n  90% {\n    opacity: 0.9; }\n  100% {\n    -webkit-transform: translateY(0px);\n            transform: translateY(0px);\n    opacity: 1; } }@keyframes go-up {\n  0% {\n    -webkit-transform: translateY(80px);\n            transform: translateY(80px);\n    opacity: 0; }\n  90% {\n    opacity: 0.9; }\n  100% {\n    -webkit-transform: translateY(0px);\n            transform: translateY(0px);\n    opacity: 1; } }.float {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  width: 100%; }.container {\n  width: 50%;\n  margin: 0 auto;\n  background-color: #383a3e;\n  box-shadow: 0 9px 20px rgba(0, 0, 0, 0.3); }.header {\n  border-bottom: 1px solid #86888f;\n  padding: 10px 16px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AaW9uaWMvYW5ndWxhci9jc3MvY29yZS5jc3MiLCJub2RlX21vZHVsZXMvQGlvbmljL2FuZ3VsYXIvY3NzL25vcm1hbGl6ZS5jc3MiLCJub2RlX21vZHVsZXMvQGlvbmljL2FuZ3VsYXIvY3NzL3N0cnVjdHVyZS5jc3MiLCJub2RlX21vZHVsZXMvQGlvbmljL2FuZ3VsYXIvY3NzL3R5cG9ncmFwaHkuY3NzIiwibm9kZV9tb2R1bGVzL0Bpb25pYy9hbmd1bGFyL2Nzcy9kaXNwbGF5LmNzcyIsIm5vZGVfbW9kdWxlcy9AaW9uaWMvYW5ndWxhci9jc3MvcGFkZGluZy5jc3MiLCJub2RlX21vZHVsZXMvQGlvbmljL2FuZ3VsYXIvY3NzL2Zsb2F0LWVsZW1lbnRzLmNzcyIsIm5vZGVfbW9kdWxlcy9AaW9uaWMvYW5ndWxhci9jc3MvdGV4dC1hbGlnbm1lbnQuY3NzIiwibm9kZV9tb2R1bGVzL0Bpb25pYy9hbmd1bGFyL2Nzcy90ZXh0LXRyYW5zZm9ybWF0aW9uLmNzcyIsIm5vZGVfbW9kdWxlcy9AaW9uaWMvYW5ndWxhci9jc3MvZmxleC11dGlscy5jc3MiLCIvdXNyL2xvY2FsL3Zhci93d3cvaHRkb2NzL0JSWi9SYWdlTVAvYnJvd3Nlci9zcmMvZ2xvYmFsLnNjc3MiLCIvdXNyL2xvY2FsL3Zhci93d3cvaHRkb2NzL0JSWi9SYWdlTVAvYnJvd3Nlci9zcmMvYXBwL2NvbXBvbmVudHMvcGFnaW5hL3BhZ2luYS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTLDZGQUE2RixDQUFDLFFBQVEsMERBQTBELENBQUMsS0FBSywwQ0FBMEMsQ0FBQyxLQUFLLHNDQUFzQyxDQUFDLHdCQUF3QixlQUFlLENBQUMsbUJBQW1CLDhEQUE4RCxDQUFDLHlFQUF5RSxDQUFDLHdFQUF3RSxDQUFDLHVGQUF1RixDQUFDLHFFQUFxRSxDQUFDLG1FQUFtRSxDQUFDLHFCQUFxQixnRUFBZ0UsQ0FBQywyRUFBMkUsQ0FBQyww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O0VBQ2QseUJBQXlCO0VBQ3pCLHlDQUF5QyxFQUFBLENBRzNDO0VBQ0UsZ0NBQWdDO0VBQ2hDLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDhCQUE4QixFQUFBIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9wYWdpbmEvcGFnaW5hLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaHRtbC5pb3N7LS1pb24tZGVmYXVsdC1mb250OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJSb2JvdG9cIiwgc2Fucy1zZXJpZn1odG1sLm1key0taW9uLWRlZmF1bHQtZm9udDogXCJSb2JvdG9cIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmfWh0bWx7LS1pb24tZm9udC1mYW1pbHk6IHZhcigtLWlvbi1kZWZhdWx0LWZvbnQpfWJvZHl7YmFja2dyb3VuZDp2YXIoLS1pb24tYmFja2dyb3VuZC1jb2xvcil9Ym9keS5iYWNrZHJvcC1uby1zY3JvbGx7b3ZlcmZsb3c6aGlkZGVufS5pb24tY29sb3ItcHJpbWFyeXstLWlvbi1jb2xvci1iYXNlOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSwgIzM4ODBmZikgIWltcG9ydGFudDstLWlvbi1jb2xvci1iYXNlLXJnYjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiLCA1NiwxMjgsMjU1KSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLWNvbnRyYXN0OiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCwgI2ZmZikgIWltcG9ydGFudDstLWlvbi1jb2xvci1jb250cmFzdC1yZ2I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYiwgMjU1LDI1NSwyNTUpICFpbXBvcnRhbnQ7LS1pb24tY29sb3Itc2hhZGU6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlLCAjMzE3MWUwKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLXRpbnQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQsICM0YzhkZmYpICFpbXBvcnRhbnR9Lmlvbi1jb2xvci1zZWNvbmRhcnl7LS1pb24tY29sb3ItYmFzZTogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSwgIzBjZDFlOCkgIWltcG9ydGFudDstLWlvbi1jb2xvci1iYXNlLXJnYjogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeS1yZ2IsIDEyLDIwOSwyMzIpICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItY29udHJhc3Q6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QsICNmZmYpICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItY29udHJhc3QtcmdiOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0LXJnYiwgMjU1LDI1NSwyNTUpICFpbXBvcnRhbnQ7LS1pb24tY29sb3Itc2hhZGU6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnktc2hhZGUsICMwYmI4Y2MpICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItdGludDogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeS10aW50LCAjMjRkNmVhKSAhaW1wb3J0YW50fS5pb24tY29sb3ItdGVydGlhcnl7LS1pb24tY29sb3ItYmFzZTogdmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5LCAjNzA0NGZmKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLWJhc2UtcmdiOiB2YXIoLS1pb24tY29sb3ItdGVydGlhcnktcmdiLCAxMTIsNjgsMjU1KSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLWNvbnRyYXN0OiB2YXIoLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3QsICNmZmYpICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItY29udHJhc3QtcmdiOiB2YXIoLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3QtcmdiLCAyNTUsMjU1LDI1NSkgIWltcG9ydGFudDstLWlvbi1jb2xvci1zaGFkZTogdmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5LXNoYWRlLCAjNjMzY2UwKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLXRpbnQ6IHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50LCAjN2U1N2ZmKSAhaW1wb3J0YW50fS5pb24tY29sb3Itc3VjY2Vzc3stLWlvbi1jb2xvci1iYXNlOiB2YXIoLS1pb24tY29sb3Itc3VjY2VzcywgIzEwZGM2MCkgIWltcG9ydGFudDstLWlvbi1jb2xvci1iYXNlLXJnYjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiLCAxNiwyMjAsOTYpICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItY29udHJhc3Q6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0LCAjZmZmKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLWNvbnRyYXN0LXJnYjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiLCAyNTUsMjU1LDI1NSkgIWltcG9ydGFudDstLWlvbi1jb2xvci1zaGFkZTogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGUsICMwZWMyNTQpICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItdGludDogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MtdGludCwgIzI4ZTA3MCkgIWltcG9ydGFudH0uaW9uLWNvbG9yLXdhcm5pbmd7LS1pb24tY29sb3ItYmFzZTogdmFyKC0taW9uLWNvbG9yLXdhcm5pbmcsICNmZmNlMDApICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItYmFzZS1yZ2I6IHZhcigtLWlvbi1jb2xvci13YXJuaW5nLXJnYiwgMjU1LDIwNiwwKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLWNvbnRyYXN0OiB2YXIoLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdCwgI2ZmZikgIWltcG9ydGFudDstLWlvbi1jb2xvci1jb250cmFzdC1yZ2I6IHZhcigtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0LXJnYiwgMjU1LDI1NSwyNTUpICFpbXBvcnRhbnQ7LS1pb24tY29sb3Itc2hhZGU6IHZhcigtLWlvbi1jb2xvci13YXJuaW5nLXNoYWRlLCAjZTBiNTAwKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLXRpbnQ6IHZhcigtLWlvbi1jb2xvci13YXJuaW5nLXRpbnQsICNmZmQzMWEpICFpbXBvcnRhbnR9Lmlvbi1jb2xvci1kYW5nZXJ7LS1pb24tY29sb3ItYmFzZTogdmFyKC0taW9uLWNvbG9yLWRhbmdlciwgI2YwNDE0MSkgIWltcG9ydGFudDstLWlvbi1jb2xvci1iYXNlLXJnYjogdmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IsIDI0MCw2NSw2NSkgIWltcG9ydGFudDstLWlvbi1jb2xvci1jb250cmFzdDogdmFyKC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdCwgI2ZmZikgIWltcG9ydGFudDstLWlvbi1jb2xvci1jb250cmFzdC1yZ2I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3QtcmdiLCAyNTUsMjU1LDI1NSkgIWltcG9ydGFudDstLWlvbi1jb2xvci1zaGFkZTogdmFyKC0taW9uLWNvbG9yLWRhbmdlci1zaGFkZSwgI2QzMzkzOSkgIWltcG9ydGFudDstLWlvbi1jb2xvci10aW50OiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQsICNmMjU0NTQpICFpbXBvcnRhbnR9Lmlvbi1jb2xvci1saWdodHstLWlvbi1jb2xvci1iYXNlOiB2YXIoLS1pb24tY29sb3ItbGlnaHQsICNmNGY1ZjgpICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItYmFzZS1yZ2I6IHZhcigtLWlvbi1jb2xvci1saWdodC1yZ2IsIDI0NCwyNDUsMjQ4KSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLWNvbnRyYXN0OiB2YXIoLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3QsICMwMDApICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItY29udHJhc3QtcmdiOiB2YXIoLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3QtcmdiLCAwLDAsMCkgIWltcG9ydGFudDstLWlvbi1jb2xvci1zaGFkZTogdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlLCAjZDdkOGRhKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLXRpbnQ6IHZhcigtLWlvbi1jb2xvci1saWdodC10aW50LCAjZjVmNmY5KSAhaW1wb3J0YW50fS5pb24tY29sb3ItbWVkaXVtey0taW9uLWNvbG9yLWJhc2U6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0sICM5ODlhYTIpICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItYmFzZS1yZ2I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0tcmdiLCAxNTIsMTU0LDE2MikgIWltcG9ydGFudDstLWlvbi1jb2xvci1jb250cmFzdDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdCwgI2ZmZikgIWltcG9ydGFudDstLWlvbi1jb2xvci1jb250cmFzdC1yZ2I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3QtcmdiLCAyNTUsMjU1LDI1NSkgIWltcG9ydGFudDstLWlvbi1jb2xvci1zaGFkZTogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZSwgIzg2ODg4ZikgIWltcG9ydGFudDstLWlvbi1jb2xvci10aW50OiB2YXIoLS1pb24tY29sb3ItbWVkaXVtLXRpbnQsICNhMmE0YWIpICFpbXBvcnRhbnR9Lmlvbi1jb2xvci1kYXJrey0taW9uLWNvbG9yLWJhc2U6IHZhcigtLWlvbi1jb2xvci1kYXJrLCAjMjIyNDI4KSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLWJhc2UtcmdiOiB2YXIoLS1pb24tY29sb3ItZGFyay1yZ2IsIDM0LDM2LDQwKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLWNvbnRyYXN0OiB2YXIoLS1pb24tY29sb3ItZGFyay1jb250cmFzdCwgI2ZmZikgIWltcG9ydGFudDstLWlvbi1jb2xvci1jb250cmFzdC1yZ2I6IHZhcigtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYiwgMjU1LDI1NSwyNTUpICFpbXBvcnRhbnQ7LS1pb24tY29sb3Itc2hhZGU6IHZhcigtLWlvbi1jb2xvci1kYXJrLXNoYWRlLCAjMWUyMDIzKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLXRpbnQ6IHZhcigtLWlvbi1jb2xvci1kYXJrLXRpbnQsICMzODNhM2UpICFpbXBvcnRhbnR9Lmlvbi1wYWdle2xlZnQ6MDtyaWdodDowO3RvcDowO2JvdHRvbTowO2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjphYnNvbHV0ZTtmbGV4LWRpcmVjdGlvbjpjb2x1bW47anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47Y29udGFpbjpsYXlvdXQgc2l6ZSBzdHlsZTtvdmVyZmxvdzpoaWRkZW47ei1pbmRleDowfWlvbi1yb3V0ZSxpb24tcm91dGUtcmVkaXJlY3QsaW9uLXJvdXRlcixpb24tc2VsZWN0LW9wdGlvbixpb24tbmF2LWNvbnRyb2xsZXIsaW9uLW1lbnUtY29udHJvbGxlcixpb24tYWN0aW9uLXNoZWV0LWNvbnRyb2xsZXIsaW9uLWFsZXJ0LWNvbnRyb2xsZXIsaW9uLWxvYWRpbmctY29udHJvbGxlcixpb24tbW9kYWwtY29udHJvbGxlcixpb24tcGlja2VyLWNvbnRyb2xsZXIsaW9uLXBvcG92ZXItY29udHJvbGxlcixpb24tdG9hc3QtY29udHJvbGxlciwuaW9uLXBhZ2UtaGlkZGVuLFtoaWRkZW5de2Rpc3BsYXk6bm9uZSAhaW1wb3J0YW50fS5pb24tcGFnZS1pbnZpc2libGV7b3BhY2l0eTowfWh0bWwucGx0LWlvcy5wbHQtaHlicmlkLGh0bWwucGx0LWlvcy5wbHQtcHdhey0taW9uLXN0YXR1c2Jhci1wYWRkaW5nOiAyMHB4fUBzdXBwb3J0cyAocGFkZGluZy10b3A6IDIwcHgpe2h0bWx7LS1pb24tc2FmZS1hcmVhLXRvcDogdmFyKC0taW9uLXN0YXR1c2Jhci1wYWRkaW5nKX19QHN1cHBvcnRzIChwYWRkaW5nLXRvcDogY29uc3RhbnQoc2FmZS1hcmVhLWluc2V0LXRvcCkpe2h0bWx7LS1pb24tc2FmZS1hcmVhLXRvcDogY29uc3RhbnQoc2FmZS1hcmVhLWluc2V0LXRvcCk7LS1pb24tc2FmZS1hcmVhLWJvdHRvbTogY29uc3RhbnQoc2FmZS1hcmVhLWluc2V0LWJvdHRvbSk7LS1pb24tc2FmZS1hcmVhLWxlZnQ6IGNvbnN0YW50KHNhZmUtYXJlYS1pbnNldC1sZWZ0KTstLWlvbi1zYWZlLWFyZWEtcmlnaHQ6IGNvbnN0YW50KHNhZmUtYXJlYS1pbnNldC1yaWdodCl9fUBzdXBwb3J0cyAocGFkZGluZy10b3A6IGVudihzYWZlLWFyZWEtaW5zZXQtdG9wKSl7aHRtbHstLWlvbi1zYWZlLWFyZWEtdG9wOiBlbnYoc2FmZS1hcmVhLWluc2V0LXRvcCk7LS1pb24tc2FmZS1hcmVhLWJvdHRvbTogZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pOy0taW9uLXNhZmUtYXJlYS1sZWZ0OiBlbnYoc2FmZS1hcmVhLWluc2V0LWxlZnQpOy0taW9uLXNhZmUtYXJlYS1yaWdodDogZW52KHNhZmUtYXJlYS1pbnNldC1yaWdodCl9fVxuIiwiYXVkaW8sY2FudmFzLHByb2dyZXNzLHZpZGVve3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lfWF1ZGlvOm5vdChbY29udHJvbHNdKXtkaXNwbGF5Om5vbmU7aGVpZ2h0OjB9YixzdHJvbmd7Zm9udC13ZWlnaHQ6Ym9sZH1pbWd7bWF4LXdpZHRoOjEwMCU7Ym9yZGVyOjB9c3ZnOm5vdCg6cm9vdCl7b3ZlcmZsb3c6aGlkZGVufWZpZ3VyZXttYXJnaW46MWVtIDQwcHh9aHJ7aGVpZ2h0OjFweDtib3JkZXItd2lkdGg6MDtib3gtc2l6aW5nOmNvbnRlbnQtYm94fXByZXtvdmVyZmxvdzphdXRvfWNvZGUsa2JkLHByZSxzYW1we2ZvbnQtZmFtaWx5Om1vbm9zcGFjZSwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxZW19bGFiZWwsaW5wdXQsc2VsZWN0LHRleHRhcmVhe2ZvbnQtZmFtaWx5OmluaGVyaXQ7bGluZS1oZWlnaHQ6bm9ybWFsfXRleHRhcmVhe292ZXJmbG93OmF1dG87aGVpZ2h0OmF1dG87Zm9udDppbmhlcml0O2NvbG9yOmluaGVyaXR9dGV4dGFyZWE6OnBsYWNlaG9sZGVye3BhZGRpbmctbGVmdDoycHh9Zm9ybSxpbnB1dCxvcHRncm91cCxzZWxlY3R7bWFyZ2luOjA7Zm9udDppbmhlcml0O2NvbG9yOmluaGVyaXR9aHRtbCBpbnB1dFt0eXBlPVwiYnV0dG9uXCJdLGlucHV0W3R5cGU9XCJyZXNldFwiXSxpbnB1dFt0eXBlPVwic3VibWl0XCJde2N1cnNvcjpwb2ludGVyOy13ZWJraXQtYXBwZWFyYW5jZTpidXR0b259YSxhIGRpdixhIHNwYW4sYSBpb24taWNvbixhIGlvbi1sYWJlbCxidXR0b24sYnV0dG9uIGRpdixidXR0b24gc3BhbixidXR0b24gaW9uLWljb24sYnV0dG9uIGlvbi1sYWJlbCwuaW9uLXRhcHBhYmxlLFt0YXBwYWJsZV0sW3RhcHBhYmxlXSBkaXYsW3RhcHBhYmxlXSBzcGFuLFt0YXBwYWJsZV0gaW9uLWljb24sW3RhcHBhYmxlXSBpb24tbGFiZWwsaW5wdXQsdGV4dGFyZWF7dG91Y2gtYWN0aW9uOm1hbmlwdWxhdGlvbn1hIGlvbi1sYWJlbCxidXR0b24gaW9uLWxhYmVse3BvaW50ZXItZXZlbnRzOm5vbmV9YnV0dG9ue2JvcmRlcjowO2JvcmRlci1yYWRpdXM6MDtmb250LWZhbWlseTppbmhlcml0O2ZvbnQtc3R5bGU6aW5oZXJpdDtmb250LXZhcmlhbnQ6aW5oZXJpdDtsaW5lLWhlaWdodDoxO3RleHQtdHJhbnNmb3JtOm5vbmU7Y3Vyc29yOnBvaW50ZXI7LXdlYmtpdC1hcHBlYXJhbmNlOmJ1dHRvbn1bdGFwcGFibGVde2N1cnNvcjpwb2ludGVyfWFbZGlzYWJsZWRdLGJ1dHRvbltkaXNhYmxlZF0saHRtbCBpbnB1dFtkaXNhYmxlZF17Y3Vyc29yOmRlZmF1bHR9YnV0dG9uOjotbW96LWZvY3VzLWlubmVyLGlucHV0OjotbW96LWZvY3VzLWlubmVye3BhZGRpbmc6MDtib3JkZXI6MH1pbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0saW5wdXRbdHlwZT1cInJhZGlvXCJde3BhZGRpbmc6MDtib3gtc2l6aW5nOmJvcmRlci1ib3h9aW5wdXRbdHlwZT1cIm51bWJlclwiXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixpbnB1dFt0eXBlPVwibnVtYmVyXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9ue2hlaWdodDphdXRvfWlucHV0W3R5cGU9XCJzZWFyY2hcIl06Oi13ZWJraXQtc2VhcmNoLWNhbmNlbC1idXR0b24saW5wdXRbdHlwZT1cInNlYXJjaFwiXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbnstd2Via2l0LWFwcGVhcmFuY2U6bm9uZX10YWJsZXtib3JkZXItY29sbGFwc2U6Y29sbGFwc2U7Ym9yZGVyLXNwYWNpbmc6MH10ZCx0aHtwYWRkaW5nOjB9XG4iLCIqe2JveC1zaXppbmc6Ym9yZGVyLWJveDstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKTstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6dHJhbnNwYXJlbnQ7LXdlYmtpdC10b3VjaC1jYWxsb3V0Om5vbmV9aHRtbHt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3RleHQtc2l6ZS1hZGp1c3Q6MTAwJX1odG1sLnBsdC1wd2F7aGVpZ2h0OjEwMHZofWJvZHl7LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6Z3JheXNjYWxlOy13ZWJraXQtZm9udC1zbW9vdGhpbmc6YW50aWFsaWFzZWQ7bWFyZ2luLWxlZnQ6MDttYXJnaW4tcmlnaHQ6MDttYXJnaW4tdG9wOjA7bWFyZ2luLWJvdHRvbTowO3BhZGRpbmctbGVmdDowO3BhZGRpbmctcmlnaHQ6MDtwYWRkaW5nLXRvcDowO3BhZGRpbmctYm90dG9tOjA7cG9zaXRpb246Zml4ZWQ7d2lkdGg6MTAwJTttYXgtd2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTttYXgtaGVpZ2h0OjEwMCU7dGV4dC1yZW5kZXJpbmc6b3B0aW1pemVMZWdpYmlsaXR5O292ZXJmbG93OmhpZGRlbjt0b3VjaC1hY3Rpb246bWFuaXB1bGF0aW9uOy13ZWJraXQtdXNlci1kcmFnOm5vbmU7LW1zLWNvbnRlbnQtem9vbWluZzpub25lO3dvcmQtd3JhcDpicmVhay13b3JkO292ZXJzY3JvbGwtYmVoYXZpb3IteTpub25lO3RleHQtc2l6ZS1hZGp1c3Q6bm9uZX1cbiIsImh0bWx7Zm9udC1mYW1pbHk6dmFyKC0taW9uLWZvbnQtZmFtaWx5KX1he2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Y29sb3I6dmFyKC0taW9uLWNvbG9yLXByaW1hcnksICMzODgwZmYpfWgxLGgyLGgzLGg0LGg1LGg2e21hcmdpbi10b3A6MTZweDttYXJnaW4tYm90dG9tOjEwcHg7Zm9udC13ZWlnaHQ6NTAwO2xpbmUtaGVpZ2h0OjEuMn1oMXttYXJnaW4tdG9wOjIwcHg7Zm9udC1zaXplOjI2cHh9aDJ7bWFyZ2luLXRvcDoxOHB4O2ZvbnQtc2l6ZToyNHB4fWgze2ZvbnQtc2l6ZToyMnB4fWg0e2ZvbnQtc2l6ZToyMHB4fWg1e2ZvbnQtc2l6ZToxOHB4fWg2e2ZvbnQtc2l6ZToxNnB4fXNtYWxse2ZvbnQtc2l6ZTo3NSV9c3ViLHN1cHtwb3NpdGlvbjpyZWxhdGl2ZTtmb250LXNpemU6NzUlO2xpbmUtaGVpZ2h0OjA7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9c3Vwe3RvcDotLjVlbX1zdWJ7Ym90dG9tOi0uMjVlbX1cbiIsIi5pb24taGlkZXtkaXNwbGF5Om5vbmUgIWltcG9ydGFudH0uaW9uLWhpZGUtdXB7ZGlzcGxheTpub25lICFpbXBvcnRhbnR9QG1lZGlhIChtYXgtd2lkdGg6IDU3NXB4KXsuaW9uLWhpZGUtZG93bntkaXNwbGF5Om5vbmUgIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6IDU3NnB4KXsuaW9uLWhpZGUtc20tdXB7ZGlzcGxheTpub25lICFpbXBvcnRhbnR9fUBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCl7Lmlvbi1oaWRlLXNtLWRvd257ZGlzcGxheTpub25lICFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOiA3NjhweCl7Lmlvbi1oaWRlLW1kLXVwe2Rpc3BsYXk6bm9uZSAhaW1wb3J0YW50fX1AbWVkaWEgKG1heC13aWR0aDogOTkxcHgpey5pb24taGlkZS1tZC1kb3due2Rpc3BsYXk6bm9uZSAhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpey5pb24taGlkZS1sZy11cHtkaXNwbGF5Om5vbmUgIWltcG9ydGFudH19QG1lZGlhIChtYXgtd2lkdGg6IDExOTlweCl7Lmlvbi1oaWRlLWxnLWRvd257ZGlzcGxheTpub25lICFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOiAxMjAwcHgpey5pb24taGlkZS14bC11cHtkaXNwbGF5Om5vbmUgIWltcG9ydGFudH19Lmlvbi1oaWRlLXhsLWRvd257ZGlzcGxheTpub25lICFpbXBvcnRhbnR9XG4iLCIuaW9uLW5vLXBhZGRpbmcsW25vLXBhZGRpbmddey0tcGFkZGluZy1zdGFydDogMDstLXBhZGRpbmctZW5kOiAwOy0tcGFkZGluZy10b3A6IDA7LS1wYWRkaW5nLWJvdHRvbTogMDtwYWRkaW5nLWxlZnQ6MDtwYWRkaW5nLXJpZ2h0OjA7cGFkZGluZy10b3A6MDtwYWRkaW5nLWJvdHRvbTowfS5pb24tcGFkZGluZyxbcGFkZGluZ117LS1wYWRkaW5nLXN0YXJ0OiB2YXIoLS1pb24tcGFkZGluZywgMTZweCk7LS1wYWRkaW5nLWVuZDogdmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpOy0tcGFkZGluZy10b3A6IHZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTstLXBhZGRpbmctYm90dG9tOiB2YXIoLS1pb24tcGFkZGluZywgMTZweCk7cGFkZGluZy1sZWZ0OnZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTtwYWRkaW5nLXJpZ2h0OnZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTtwYWRkaW5nLXRvcDp2YXIoLS1pb24tcGFkZGluZywgMTZweCk7cGFkZGluZy1ib3R0b206dmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpfUBzdXBwb3J0cyAobWFyZ2luLWlubGluZS1zdGFydDogMCkgb3IgKC13ZWJraXQtbWFyZ2luLXN0YXJ0OiAwKXsuaW9uLXBhZGRpbmcsW3BhZGRpbmdde3BhZGRpbmctbGVmdDp1bnNldDtwYWRkaW5nLXJpZ2h0OnVuc2V0Oy13ZWJraXQtcGFkZGluZy1zdGFydDp2YXIoLS1pb24tcGFkZGluZywgMTZweCk7cGFkZGluZy1pbmxpbmUtc3RhcnQ6dmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpOy13ZWJraXQtcGFkZGluZy1lbmQ6dmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpO3BhZGRpbmctaW5saW5lLWVuZDp2YXIoLS1pb24tcGFkZGluZywgMTZweCl9fS5pb24tcGFkZGluZy10b3AsW3BhZGRpbmctdG9wXXstLXBhZGRpbmctdG9wOiB2YXIoLS1pb24tcGFkZGluZywgMTZweCk7cGFkZGluZy10b3A6dmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpfS5pb24tcGFkZGluZy1zdGFydCxbcGFkZGluZy1zdGFydF17LS1wYWRkaW5nLXN0YXJ0OiB2YXIoLS1pb24tcGFkZGluZywgMTZweCk7cGFkZGluZy1sZWZ0OnZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KX1Ac3VwcG9ydHMgKG1hcmdpbi1pbmxpbmUtc3RhcnQ6IDApIG9yICgtd2Via2l0LW1hcmdpbi1zdGFydDogMCl7Lmlvbi1wYWRkaW5nLXN0YXJ0LFtwYWRkaW5nLXN0YXJ0XXtwYWRkaW5nLWxlZnQ6dW5zZXQ7LXdlYmtpdC1wYWRkaW5nLXN0YXJ0OnZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTtwYWRkaW5nLWlubGluZS1zdGFydDp2YXIoLS1pb24tcGFkZGluZywgMTZweCl9fS5pb24tcGFkZGluZy1lbmQsW3BhZGRpbmctZW5kXXstLXBhZGRpbmctZW5kOiB2YXIoLS1pb24tcGFkZGluZywgMTZweCk7cGFkZGluZy1yaWdodDp2YXIoLS1pb24tcGFkZGluZywgMTZweCl9QHN1cHBvcnRzIChtYXJnaW4taW5saW5lLXN0YXJ0OiAwKSBvciAoLXdlYmtpdC1tYXJnaW4tc3RhcnQ6IDApey5pb24tcGFkZGluZy1lbmQsW3BhZGRpbmctZW5kXXtwYWRkaW5nLXJpZ2h0OnVuc2V0Oy13ZWJraXQtcGFkZGluZy1lbmQ6dmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpO3BhZGRpbmctaW5saW5lLWVuZDp2YXIoLS1pb24tcGFkZGluZywgMTZweCl9fS5pb24tcGFkZGluZy1ib3R0b20sW3BhZGRpbmctYm90dG9tXXstLXBhZGRpbmctYm90dG9tOiB2YXIoLS1pb24tcGFkZGluZywgMTZweCk7cGFkZGluZy1ib3R0b206dmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpfS5pb24tcGFkZGluZy12ZXJ0aWNhbCxbcGFkZGluZy12ZXJ0aWNhbF17LS1wYWRkaW5nLXRvcDogdmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpOy0tcGFkZGluZy1ib3R0b206IHZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTtwYWRkaW5nLXRvcDp2YXIoLS1pb24tcGFkZGluZywgMTZweCk7cGFkZGluZy1ib3R0b206dmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpfS5pb24tcGFkZGluZy1ob3Jpem9udGFsLFtwYWRkaW5nLWhvcml6b250YWxdey0tcGFkZGluZy1zdGFydDogdmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpOy0tcGFkZGluZy1lbmQ6IHZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTtwYWRkaW5nLWxlZnQ6dmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpO3BhZGRpbmctcmlnaHQ6dmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpfUBzdXBwb3J0cyAobWFyZ2luLWlubGluZS1zdGFydDogMCkgb3IgKC13ZWJraXQtbWFyZ2luLXN0YXJ0OiAwKXsuaW9uLXBhZGRpbmctaG9yaXpvbnRhbCxbcGFkZGluZy1ob3Jpem9udGFsXXtwYWRkaW5nLWxlZnQ6dW5zZXQ7cGFkZGluZy1yaWdodDp1bnNldDstd2Via2l0LXBhZGRpbmctc3RhcnQ6dmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpO3BhZGRpbmctaW5saW5lLXN0YXJ0OnZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTstd2Via2l0LXBhZGRpbmctZW5kOnZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTtwYWRkaW5nLWlubGluZS1lbmQ6dmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpfX0uaW9uLW5vLW1hcmdpbixbbm8tbWFyZ2luXXstLW1hcmdpbi1zdGFydDogMDstLW1hcmdpbi1lbmQ6IDA7LS1tYXJnaW4tdG9wOiAwOy0tbWFyZ2luLWJvdHRvbTogMDttYXJnaW4tbGVmdDowO21hcmdpbi1yaWdodDowO21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjB9Lmlvbi1tYXJnaW4sW21hcmdpbl17LS1tYXJnaW4tc3RhcnQ6IHZhcigtLWlvbi1tYXJnaW4sIDE2cHgpOy0tbWFyZ2luLWVuZDogdmFyKC0taW9uLW1hcmdpbiwgMTZweCk7LS1tYXJnaW4tdG9wOiB2YXIoLS1pb24tbWFyZ2luLCAxNnB4KTstLW1hcmdpbi1ib3R0b206IHZhcigtLWlvbi1tYXJnaW4sIDE2cHgpO21hcmdpbi1sZWZ0OnZhcigtLWlvbi1tYXJnaW4sIDE2cHgpO21hcmdpbi1yaWdodDp2YXIoLS1pb24tbWFyZ2luLCAxNnB4KTttYXJnaW4tdG9wOnZhcigtLWlvbi1tYXJnaW4sIDE2cHgpO21hcmdpbi1ib3R0b206dmFyKC0taW9uLW1hcmdpbiwgMTZweCl9QHN1cHBvcnRzIChtYXJnaW4taW5saW5lLXN0YXJ0OiAwKSBvciAoLXdlYmtpdC1tYXJnaW4tc3RhcnQ6IDApey5pb24tbWFyZ2luLFttYXJnaW5de21hcmdpbi1sZWZ0OnVuc2V0O21hcmdpbi1yaWdodDp1bnNldDstd2Via2l0LW1hcmdpbi1zdGFydDp2YXIoLS1pb24tbWFyZ2luLCAxNnB4KTttYXJnaW4taW5saW5lLXN0YXJ0OnZhcigtLWlvbi1tYXJnaW4sIDE2cHgpOy13ZWJraXQtbWFyZ2luLWVuZDp2YXIoLS1pb24tbWFyZ2luLCAxNnB4KTttYXJnaW4taW5saW5lLWVuZDp2YXIoLS1pb24tbWFyZ2luLCAxNnB4KX19Lmlvbi1tYXJnaW4tdG9wLFttYXJnaW4tdG9wXXstLW1hcmdpbi10b3A6IHZhcigtLWlvbi1tYXJnaW4sIDE2cHgpO21hcmdpbi10b3A6dmFyKC0taW9uLW1hcmdpbiwgMTZweCl9Lmlvbi1tYXJnaW4tc3RhcnQsW21hcmdpbi1zdGFydF17LS1tYXJnaW4tc3RhcnQ6IHZhcigtLWlvbi1tYXJnaW4sIDE2cHgpO21hcmdpbi1sZWZ0OnZhcigtLWlvbi1tYXJnaW4sIDE2cHgpfUBzdXBwb3J0cyAobWFyZ2luLWlubGluZS1zdGFydDogMCkgb3IgKC13ZWJraXQtbWFyZ2luLXN0YXJ0OiAwKXsuaW9uLW1hcmdpbi1zdGFydCxbbWFyZ2luLXN0YXJ0XXttYXJnaW4tbGVmdDp1bnNldDstd2Via2l0LW1hcmdpbi1zdGFydDp2YXIoLS1pb24tbWFyZ2luLCAxNnB4KTttYXJnaW4taW5saW5lLXN0YXJ0OnZhcigtLWlvbi1tYXJnaW4sIDE2cHgpfX0uaW9uLW1hcmdpbi1lbmQsW21hcmdpbi1lbmRdey0tbWFyZ2luLWVuZDogdmFyKC0taW9uLW1hcmdpbiwgMTZweCk7bWFyZ2luLXJpZ2h0OnZhcigtLWlvbi1tYXJnaW4sIDE2cHgpfUBzdXBwb3J0cyAobWFyZ2luLWlubGluZS1zdGFydDogMCkgb3IgKC13ZWJraXQtbWFyZ2luLXN0YXJ0OiAwKXsuaW9uLW1hcmdpbi1lbmQsW21hcmdpbi1lbmRde21hcmdpbi1yaWdodDp1bnNldDstd2Via2l0LW1hcmdpbi1lbmQ6dmFyKC0taW9uLW1hcmdpbiwgMTZweCk7bWFyZ2luLWlubGluZS1lbmQ6dmFyKC0taW9uLW1hcmdpbiwgMTZweCl9fS5pb24tbWFyZ2luLWJvdHRvbSxbbWFyZ2luLWJvdHRvbV17LS1tYXJnaW4tYm90dG9tOiB2YXIoLS1pb24tbWFyZ2luLCAxNnB4KTttYXJnaW4tYm90dG9tOnZhcigtLWlvbi1tYXJnaW4sIDE2cHgpfS5pb24tbWFyZ2luLXZlcnRpY2FsLFttYXJnaW4tdmVydGljYWxdey0tbWFyZ2luLXRvcDogdmFyKC0taW9uLW1hcmdpbiwgMTZweCk7LS1tYXJnaW4tYm90dG9tOiB2YXIoLS1pb24tbWFyZ2luLCAxNnB4KTttYXJnaW4tdG9wOnZhcigtLWlvbi1tYXJnaW4sIDE2cHgpO21hcmdpbi1ib3R0b206dmFyKC0taW9uLW1hcmdpbiwgMTZweCl9Lmlvbi1tYXJnaW4taG9yaXpvbnRhbCxbbWFyZ2luLWhvcml6b250YWxdey0tbWFyZ2luLXN0YXJ0OiB2YXIoLS1pb24tbWFyZ2luLCAxNnB4KTstLW1hcmdpbi1lbmQ6IHZhcigtLWlvbi1tYXJnaW4sIDE2cHgpO21hcmdpbi1sZWZ0OnZhcigtLWlvbi1tYXJnaW4sIDE2cHgpO21hcmdpbi1yaWdodDp2YXIoLS1pb24tbWFyZ2luLCAxNnB4KX1Ac3VwcG9ydHMgKG1hcmdpbi1pbmxpbmUtc3RhcnQ6IDApIG9yICgtd2Via2l0LW1hcmdpbi1zdGFydDogMCl7Lmlvbi1tYXJnaW4taG9yaXpvbnRhbCxbbWFyZ2luLWhvcml6b250YWxde21hcmdpbi1sZWZ0OnVuc2V0O21hcmdpbi1yaWdodDp1bnNldDstd2Via2l0LW1hcmdpbi1zdGFydDp2YXIoLS1pb24tbWFyZ2luLCAxNnB4KTttYXJnaW4taW5saW5lLXN0YXJ0OnZhcigtLWlvbi1tYXJnaW4sIDE2cHgpOy13ZWJraXQtbWFyZ2luLWVuZDp2YXIoLS1pb24tbWFyZ2luLCAxNnB4KTttYXJnaW4taW5saW5lLWVuZDp2YXIoLS1pb24tbWFyZ2luLCAxNnB4KX19XG4iLCIuaW9uLWZsb2F0LWxlZnQsW2Zsb2F0LWxlZnRde2Zsb2F0OmxlZnQgIWltcG9ydGFudH0uaW9uLWZsb2F0LXJpZ2h0LFtmbG9hdC1yaWdodF17ZmxvYXQ6cmlnaHQgIWltcG9ydGFudH0uaW9uLWZsb2F0LXN0YXJ0LFtmbG9hdC1zdGFydF17ZmxvYXQ6bGVmdCAhaW1wb3J0YW50fTpob3N0LWNvbnRleHQoW2Rpcj1ydGxdKSAuaW9uLWZsb2F0LXN0YXJ0LDpob3N0LWNvbnRleHQoW2Rpcj1ydGxdKSBbZmxvYXQtc3RhcnRde2Zsb2F0OnJpZ2h0ICFpbXBvcnRhbnR9Lmlvbi1mbG9hdC1lbmQsW2Zsb2F0LWVuZF17ZmxvYXQ6cmlnaHQgIWltcG9ydGFudH06aG9zdC1jb250ZXh0KFtkaXI9cnRsXSkgLmlvbi1mbG9hdC1lbmQsOmhvc3QtY29udGV4dChbZGlyPXJ0bF0pIFtmbG9hdC1lbmRde2Zsb2F0OmxlZnQgIWltcG9ydGFudH1AbWVkaWEgKG1pbi13aWR0aDogNTc2cHgpey5pb24tZmxvYXQtc20tbGVmdCxbZmxvYXQtc20tbGVmdF17ZmxvYXQ6bGVmdCAhaW1wb3J0YW50fS5pb24tZmxvYXQtc20tcmlnaHQsW2Zsb2F0LXNtLXJpZ2h0XXtmbG9hdDpyaWdodCAhaW1wb3J0YW50fS5pb24tZmxvYXQtc20tc3RhcnQsW2Zsb2F0LXNtLXN0YXJ0XXtmbG9hdDpsZWZ0ICFpbXBvcnRhbnR9Omhvc3QtY29udGV4dChbZGlyPXJ0bF0pIC5pb24tZmxvYXQtc20tc3RhcnQsOmhvc3QtY29udGV4dChbZGlyPXJ0bF0pIFtmbG9hdC1zbS1zdGFydF17ZmxvYXQ6cmlnaHQgIWltcG9ydGFudH0uaW9uLWZsb2F0LXNtLWVuZCxbZmxvYXQtc20tZW5kXXtmbG9hdDpyaWdodCAhaW1wb3J0YW50fTpob3N0LWNvbnRleHQoW2Rpcj1ydGxdKSAuaW9uLWZsb2F0LXNtLWVuZCw6aG9zdC1jb250ZXh0KFtkaXI9cnRsXSkgW2Zsb2F0LXNtLWVuZF17ZmxvYXQ6bGVmdCAhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpey5pb24tZmxvYXQtbWQtbGVmdCxbZmxvYXQtbWQtbGVmdF17ZmxvYXQ6bGVmdCAhaW1wb3J0YW50fS5pb24tZmxvYXQtbWQtcmlnaHQsW2Zsb2F0LW1kLXJpZ2h0XXtmbG9hdDpyaWdodCAhaW1wb3J0YW50fS5pb24tZmxvYXQtbWQtc3RhcnQsW2Zsb2F0LW1kLXN0YXJ0XXtmbG9hdDpsZWZ0ICFpbXBvcnRhbnR9Omhvc3QtY29udGV4dChbZGlyPXJ0bF0pIC5pb24tZmxvYXQtbWQtc3RhcnQsOmhvc3QtY29udGV4dChbZGlyPXJ0bF0pIFtmbG9hdC1tZC1zdGFydF17ZmxvYXQ6cmlnaHQgIWltcG9ydGFudH0uaW9uLWZsb2F0LW1kLWVuZCxbZmxvYXQtbWQtZW5kXXtmbG9hdDpyaWdodCAhaW1wb3J0YW50fTpob3N0LWNvbnRleHQoW2Rpcj1ydGxdKSAuaW9uLWZsb2F0LW1kLWVuZCw6aG9zdC1jb250ZXh0KFtkaXI9cnRsXSkgW2Zsb2F0LW1kLWVuZF17ZmxvYXQ6bGVmdCAhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpey5pb24tZmxvYXQtbGctbGVmdCxbZmxvYXQtbGctbGVmdF17ZmxvYXQ6bGVmdCAhaW1wb3J0YW50fS5pb24tZmxvYXQtbGctcmlnaHQsW2Zsb2F0LWxnLXJpZ2h0XXtmbG9hdDpyaWdodCAhaW1wb3J0YW50fS5pb24tZmxvYXQtbGctc3RhcnQsW2Zsb2F0LWxnLXN0YXJ0XXtmbG9hdDpsZWZ0ICFpbXBvcnRhbnR9Omhvc3QtY29udGV4dChbZGlyPXJ0bF0pIC5pb24tZmxvYXQtbGctc3RhcnQsOmhvc3QtY29udGV4dChbZGlyPXJ0bF0pIFtmbG9hdC1sZy1zdGFydF17ZmxvYXQ6cmlnaHQgIWltcG9ydGFudH0uaW9uLWZsb2F0LWxnLWVuZCxbZmxvYXQtbGctZW5kXXtmbG9hdDpyaWdodCAhaW1wb3J0YW50fTpob3N0LWNvbnRleHQoW2Rpcj1ydGxdKSAuaW9uLWZsb2F0LWxnLWVuZCw6aG9zdC1jb250ZXh0KFtkaXI9cnRsXSkgW2Zsb2F0LWxnLWVuZF17ZmxvYXQ6bGVmdCAhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDogMTIwMHB4KXsuaW9uLWZsb2F0LXhsLWxlZnQsW2Zsb2F0LXhsLWxlZnRde2Zsb2F0OmxlZnQgIWltcG9ydGFudH0uaW9uLWZsb2F0LXhsLXJpZ2h0LFtmbG9hdC14bC1yaWdodF17ZmxvYXQ6cmlnaHQgIWltcG9ydGFudH0uaW9uLWZsb2F0LXhsLXN0YXJ0LFtmbG9hdC14bC1zdGFydF17ZmxvYXQ6bGVmdCAhaW1wb3J0YW50fTpob3N0LWNvbnRleHQoW2Rpcj1ydGxdKSAuaW9uLWZsb2F0LXhsLXN0YXJ0LDpob3N0LWNvbnRleHQoW2Rpcj1ydGxdKSBbZmxvYXQteGwtc3RhcnRde2Zsb2F0OnJpZ2h0ICFpbXBvcnRhbnR9Lmlvbi1mbG9hdC14bC1lbmQsW2Zsb2F0LXhsLWVuZF17ZmxvYXQ6cmlnaHQgIWltcG9ydGFudH06aG9zdC1jb250ZXh0KFtkaXI9cnRsXSkgLmlvbi1mbG9hdC14bC1lbmQsOmhvc3QtY29udGV4dChbZGlyPXJ0bF0pIFtmbG9hdC14bC1lbmRde2Zsb2F0OmxlZnQgIWltcG9ydGFudH19XG4iLCIuaW9uLXRleHQtY2VudGVyLFt0ZXh0LWNlbnRlcl17dGV4dC1hbGlnbjpjZW50ZXIgIWltcG9ydGFudH0uaW9uLXRleHQtanVzdGlmeSxbdGV4dC1qdXN0aWZ5XXt0ZXh0LWFsaWduOmp1c3RpZnkgIWltcG9ydGFudH0uaW9uLXRleHQtc3RhcnQsW3RleHQtc3RhcnRde3RleHQtYWxpZ246c3RhcnQgIWltcG9ydGFudH0uaW9uLXRleHQtZW5kLFt0ZXh0LWVuZF17dGV4dC1hbGlnbjplbmQgIWltcG9ydGFudH0uaW9uLXRleHQtbGVmdCxbdGV4dC1sZWZ0XXt0ZXh0LWFsaWduOmxlZnQgIWltcG9ydGFudH0uaW9uLXRleHQtcmlnaHQsW3RleHQtcmlnaHRde3RleHQtYWxpZ246cmlnaHQgIWltcG9ydGFudH0uaW9uLXRleHQtbm93cmFwLFt0ZXh0LW5vd3JhcF17d2hpdGUtc3BhY2U6bm93cmFwICFpbXBvcnRhbnR9Lmlvbi10ZXh0LXdyYXAsW3RleHQtd3JhcF17d2hpdGUtc3BhY2U6bm9ybWFsICFpbXBvcnRhbnR9QG1lZGlhIChtaW4td2lkdGg6IDU3NnB4KXsuaW9uLXRleHQtc20tY2VudGVyLFt0ZXh0LXNtLWNlbnRlcl17dGV4dC1hbGlnbjpjZW50ZXIgIWltcG9ydGFudH0uaW9uLXRleHQtc20tanVzdGlmeSxbdGV4dC1zbS1qdXN0aWZ5XXt0ZXh0LWFsaWduOmp1c3RpZnkgIWltcG9ydGFudH0uaW9uLXRleHQtc20tc3RhcnQsW3RleHQtc20tc3RhcnRde3RleHQtYWxpZ246c3RhcnQgIWltcG9ydGFudH0uaW9uLXRleHQtc20tZW5kLFt0ZXh0LXNtLWVuZF17dGV4dC1hbGlnbjplbmQgIWltcG9ydGFudH0uaW9uLXRleHQtc20tbGVmdCxbdGV4dC1zbS1sZWZ0XXt0ZXh0LWFsaWduOmxlZnQgIWltcG9ydGFudH0uaW9uLXRleHQtc20tcmlnaHQsW3RleHQtc20tcmlnaHRde3RleHQtYWxpZ246cmlnaHQgIWltcG9ydGFudH0uaW9uLXRleHQtc20tbm93cmFwLFt0ZXh0LXNtLW5vd3JhcF17d2hpdGUtc3BhY2U6bm93cmFwICFpbXBvcnRhbnR9Lmlvbi10ZXh0LXNtLXdyYXAsW3RleHQtc20td3JhcF17d2hpdGUtc3BhY2U6bm9ybWFsICFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOiA3NjhweCl7Lmlvbi10ZXh0LW1kLWNlbnRlcixbdGV4dC1tZC1jZW50ZXJde3RleHQtYWxpZ246Y2VudGVyICFpbXBvcnRhbnR9Lmlvbi10ZXh0LW1kLWp1c3RpZnksW3RleHQtbWQtanVzdGlmeV17dGV4dC1hbGlnbjpqdXN0aWZ5ICFpbXBvcnRhbnR9Lmlvbi10ZXh0LW1kLXN0YXJ0LFt0ZXh0LW1kLXN0YXJ0XXt0ZXh0LWFsaWduOnN0YXJ0ICFpbXBvcnRhbnR9Lmlvbi10ZXh0LW1kLWVuZCxbdGV4dC1tZC1lbmRde3RleHQtYWxpZ246ZW5kICFpbXBvcnRhbnR9Lmlvbi10ZXh0LW1kLWxlZnQsW3RleHQtbWQtbGVmdF17dGV4dC1hbGlnbjpsZWZ0ICFpbXBvcnRhbnR9Lmlvbi10ZXh0LW1kLXJpZ2h0LFt0ZXh0LW1kLXJpZ2h0XXt0ZXh0LWFsaWduOnJpZ2h0ICFpbXBvcnRhbnR9Lmlvbi10ZXh0LW1kLW5vd3JhcCxbdGV4dC1tZC1ub3dyYXBde3doaXRlLXNwYWNlOm5vd3JhcCAhaW1wb3J0YW50fS5pb24tdGV4dC1tZC13cmFwLFt0ZXh0LW1kLXdyYXBde3doaXRlLXNwYWNlOm5vcm1hbCAhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpey5pb24tdGV4dC1sZy1jZW50ZXIsW3RleHQtbGctY2VudGVyXXt0ZXh0LWFsaWduOmNlbnRlciAhaW1wb3J0YW50fS5pb24tdGV4dC1sZy1qdXN0aWZ5LFt0ZXh0LWxnLWp1c3RpZnlde3RleHQtYWxpZ246anVzdGlmeSAhaW1wb3J0YW50fS5pb24tdGV4dC1sZy1zdGFydCxbdGV4dC1sZy1zdGFydF17dGV4dC1hbGlnbjpzdGFydCAhaW1wb3J0YW50fS5pb24tdGV4dC1sZy1lbmQsW3RleHQtbGctZW5kXXt0ZXh0LWFsaWduOmVuZCAhaW1wb3J0YW50fS5pb24tdGV4dC1sZy1sZWZ0LFt0ZXh0LWxnLWxlZnRde3RleHQtYWxpZ246bGVmdCAhaW1wb3J0YW50fS5pb24tdGV4dC1sZy1yaWdodCxbdGV4dC1sZy1yaWdodF17dGV4dC1hbGlnbjpyaWdodCAhaW1wb3J0YW50fS5pb24tdGV4dC1sZy1ub3dyYXAsW3RleHQtbGctbm93cmFwXXt3aGl0ZS1zcGFjZTpub3dyYXAgIWltcG9ydGFudH0uaW9uLXRleHQtbGctd3JhcCxbdGV4dC1sZy13cmFwXXt3aGl0ZS1zcGFjZTpub3JtYWwgIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCl7Lmlvbi10ZXh0LXhsLWNlbnRlcixbdGV4dC14bC1jZW50ZXJde3RleHQtYWxpZ246Y2VudGVyICFpbXBvcnRhbnR9Lmlvbi10ZXh0LXhsLWp1c3RpZnksW3RleHQteGwtanVzdGlmeV17dGV4dC1hbGlnbjpqdXN0aWZ5ICFpbXBvcnRhbnR9Lmlvbi10ZXh0LXhsLXN0YXJ0LFt0ZXh0LXhsLXN0YXJ0XXt0ZXh0LWFsaWduOnN0YXJ0ICFpbXBvcnRhbnR9Lmlvbi10ZXh0LXhsLWVuZCxbdGV4dC14bC1lbmRde3RleHQtYWxpZ246ZW5kICFpbXBvcnRhbnR9Lmlvbi10ZXh0LXhsLWxlZnQsW3RleHQteGwtbGVmdF17dGV4dC1hbGlnbjpsZWZ0ICFpbXBvcnRhbnR9Lmlvbi10ZXh0LXhsLXJpZ2h0LFt0ZXh0LXhsLXJpZ2h0XXt0ZXh0LWFsaWduOnJpZ2h0ICFpbXBvcnRhbnR9Lmlvbi10ZXh0LXhsLW5vd3JhcCxbdGV4dC14bC1ub3dyYXBde3doaXRlLXNwYWNlOm5vd3JhcCAhaW1wb3J0YW50fS5pb24tdGV4dC14bC13cmFwLFt0ZXh0LXhsLXdyYXBde3doaXRlLXNwYWNlOm5vcm1hbCAhaW1wb3J0YW50fX1cbiIsIi5pb24tdGV4dC11cHBlcmNhc2UsW3RleHQtdXBwZXJjYXNlXXt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2UgIWltcG9ydGFudH0uaW9uLXRleHQtbG93ZXJjYXNlLFt0ZXh0LWxvd2VyY2FzZV17dGV4dC10cmFuc2Zvcm06bG93ZXJjYXNlICFpbXBvcnRhbnR9Lmlvbi10ZXh0LWNhcGl0YWxpemUsW3RleHQtY2FwaXRhbGl6ZV17dGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZSAhaW1wb3J0YW50fUBtZWRpYSAobWluLXdpZHRoOiA1NzZweCl7Lmlvbi10ZXh0LXNtLXVwcGVyY2FzZSxbdGV4dC1zbS11cHBlcmNhc2Vde3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZSAhaW1wb3J0YW50fS5pb24tdGV4dC1zbS1sb3dlcmNhc2UsW3RleHQtc20tbG93ZXJjYXNlXXt0ZXh0LXRyYW5zZm9ybTpsb3dlcmNhc2UgIWltcG9ydGFudH0uaW9uLXRleHQtc20tY2FwaXRhbGl6ZSxbdGV4dC1zbS1jYXBpdGFsaXplXXt0ZXh0LXRyYW5zZm9ybTpjYXBpdGFsaXplICFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOiA3NjhweCl7Lmlvbi10ZXh0LW1kLXVwcGVyY2FzZSxbdGV4dC1tZC11cHBlcmNhc2Vde3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZSAhaW1wb3J0YW50fS5pb24tdGV4dC1tZC1sb3dlcmNhc2UsW3RleHQtbWQtbG93ZXJjYXNlXXt0ZXh0LXRyYW5zZm9ybTpsb3dlcmNhc2UgIWltcG9ydGFudH0uaW9uLXRleHQtbWQtY2FwaXRhbGl6ZSxbdGV4dC1tZC1jYXBpdGFsaXplXXt0ZXh0LXRyYW5zZm9ybTpjYXBpdGFsaXplICFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOiA5OTJweCl7Lmlvbi10ZXh0LWxnLXVwcGVyY2FzZSxbdGV4dC1sZy11cHBlcmNhc2Vde3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZSAhaW1wb3J0YW50fS5pb24tdGV4dC1sZy1sb3dlcmNhc2UsW3RleHQtbGctbG93ZXJjYXNlXXt0ZXh0LXRyYW5zZm9ybTpsb3dlcmNhc2UgIWltcG9ydGFudH0uaW9uLXRleHQtbGctY2FwaXRhbGl6ZSxbdGV4dC1sZy1jYXBpdGFsaXplXXt0ZXh0LXRyYW5zZm9ybTpjYXBpdGFsaXplICFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOiAxMjAwcHgpey5pb24tdGV4dC14bC11cHBlcmNhc2UsW3RleHQteGwtdXBwZXJjYXNlXXt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2UgIWltcG9ydGFudH0uaW9uLXRleHQteGwtbG93ZXJjYXNlLFt0ZXh0LXhsLWxvd2VyY2FzZV17dGV4dC10cmFuc2Zvcm06bG93ZXJjYXNlICFpbXBvcnRhbnR9Lmlvbi10ZXh0LXhsLWNhcGl0YWxpemUsW3RleHQteGwtY2FwaXRhbGl6ZV17dGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZSAhaW1wb3J0YW50fX1cbiIsIi5pb24tYWxpZ24tc2VsZi1zdGFydCxbYWxpZ24tc2VsZi1zdGFydF17YWxpZ24tc2VsZjpmbGV4LXN0YXJ0ICFpbXBvcnRhbnR9Lmlvbi1hbGlnbi1zZWxmLWVuZCxbYWxpZ24tc2VsZi1lbmRde2FsaWduLXNlbGY6ZmxleC1lbmQgIWltcG9ydGFudH0uaW9uLWFsaWduLXNlbGYtY2VudGVyLFthbGlnbi1zZWxmLWNlbnRlcl17YWxpZ24tc2VsZjpjZW50ZXIgIWltcG9ydGFudH0uaW9uLWFsaWduLXNlbGYtc3RyZXRjaCxbYWxpZ24tc2VsZi1zdHJldGNoXXthbGlnbi1zZWxmOnN0cmV0Y2ggIWltcG9ydGFudH0uaW9uLWFsaWduLXNlbGYtYmFzZWxpbmUsW2FsaWduLXNlbGYtYmFzZWxpbmVde2FsaWduLXNlbGY6YmFzZWxpbmUgIWltcG9ydGFudH0uaW9uLWFsaWduLXNlbGYtYXV0byxbYWxpZ24tc2VsZi1hdXRvXXthbGlnbi1zZWxmOmF1dG8gIWltcG9ydGFudH0uaW9uLXdyYXAsW3dyYXBde2ZsZXgtd3JhcDp3cmFwICFpbXBvcnRhbnR9Lmlvbi1ub3dyYXAsW25vd3JhcF17ZmxleC13cmFwOm5vd3JhcCAhaW1wb3J0YW50fS5pb24td3JhcC1yZXZlcnNlLFt3cmFwLXJldmVyc2Vde2ZsZXgtd3JhcDp3cmFwLXJldmVyc2UgIWltcG9ydGFudH0uaW9uLWp1c3RpZnktY29udGVudC1zdGFydCxbanVzdGlmeS1jb250ZW50LXN0YXJ0XXtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydCAhaW1wb3J0YW50fS5pb24tanVzdGlmeS1jb250ZW50LWNlbnRlcixbanVzdGlmeS1jb250ZW50LWNlbnRlcl17anVzdGlmeS1jb250ZW50OmNlbnRlciAhaW1wb3J0YW50fS5pb24tanVzdGlmeS1jb250ZW50LWVuZCxbanVzdGlmeS1jb250ZW50LWVuZF17anVzdGlmeS1jb250ZW50OmZsZXgtZW5kICFpbXBvcnRhbnR9Lmlvbi1qdXN0aWZ5LWNvbnRlbnQtYXJvdW5kLFtqdXN0aWZ5LWNvbnRlbnQtYXJvdW5kXXtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kICFpbXBvcnRhbnR9Lmlvbi1qdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbixbanVzdGlmeS1jb250ZW50LWJldHdlZW5de2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuICFpbXBvcnRhbnR9Lmlvbi1qdXN0aWZ5LWNvbnRlbnQtZXZlbmx5LFtqdXN0aWZ5LWNvbnRlbnQtZXZlbmx5XXtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtZXZlbmx5ICFpbXBvcnRhbnR9Lmlvbi1hbGlnbi1pdGVtcy1zdGFydCxbYWxpZ24taXRlbXMtc3RhcnRde2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQgIWltcG9ydGFudH0uaW9uLWFsaWduLWl0ZW1zLWNlbnRlcixbYWxpZ24taXRlbXMtY2VudGVyXXthbGlnbi1pdGVtczpjZW50ZXIgIWltcG9ydGFudH0uaW9uLWFsaWduLWl0ZW1zLWVuZCxbYWxpZ24taXRlbXMtZW5kXXthbGlnbi1pdGVtczpmbGV4LWVuZCAhaW1wb3J0YW50fS5pb24tYWxpZ24taXRlbXMtc3RyZXRjaCxbYWxpZ24taXRlbXMtc3RyZXRjaF17YWxpZ24taXRlbXM6c3RyZXRjaCAhaW1wb3J0YW50fS5pb24tYWxpZ24taXRlbXMtYmFzZWxpbmUsW2FsaWduLWl0ZW1zLWJhc2VsaW5lXXthbGlnbi1pdGVtczpiYXNlbGluZSAhaW1wb3J0YW50fVxuIiwiLy8gaHR0cDovL2lvbmljZnJhbWV3b3JrLmNvbS9kb2NzL3RoZW1pbmcvXG5AaW1wb3J0ICd+QGlvbmljL2FuZ3VsYXIvY3NzL2NvcmUuY3NzJztcbkBpbXBvcnQgJ35AaW9uaWMvYW5ndWxhci9jc3Mvbm9ybWFsaXplLmNzcyc7XG5AaW1wb3J0ICd+QGlvbmljL2FuZ3VsYXIvY3NzL3N0cnVjdHVyZS5jc3MnO1xuQGltcG9ydCAnfkBpb25pYy9hbmd1bGFyL2Nzcy90eXBvZ3JhcGh5LmNzcyc7XG5AaW1wb3J0ICd+QGlvbmljL2FuZ3VsYXIvY3NzL2Rpc3BsYXkuY3NzJztcbkBpbXBvcnQgJ35AaW9uaWMvYW5ndWxhci9jc3MvcGFkZGluZy5jc3MnO1xuQGltcG9ydCAnfkBpb25pYy9hbmd1bGFyL2Nzcy9mbG9hdC1lbGVtZW50cy5jc3MnO1xuQGltcG9ydCAnfkBpb25pYy9hbmd1bGFyL2Nzcy90ZXh0LWFsaWdubWVudC5jc3MnO1xuQGltcG9ydCAnfkBpb25pYy9hbmd1bGFyL2Nzcy90ZXh0LXRyYW5zZm9ybWF0aW9uLmNzcyc7XG5AaW1wb3J0ICd+QGlvbmljL2FuZ3VsYXIvY3NzL2ZsZXgtdXRpbHMuY3NzJztcblxuQG1peGluIGNlbnRlcigkaG9yaXpvbnRhbDogdHJ1ZSwgJHZlcnRpY2FsOiB0cnVlKSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgQGlmICgkaG9yaXpvbnRhbCBhbmQgJHZlcnRpY2FsKSB7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICB9IEBlbHNlIGlmICgkaG9yaXpvbnRhbCkge1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAwKTtcbiAgfSBAZWxzZSBpZiAoJHZlcnRpY2FsKSB7XG4gICAgdG9wOiA1MCU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTUwJSk7XG4gIH1cbn1cblxuQG1peGluIGFuaW1hdGlvbi1uYW1lKCRhbmluYW1lKSB7XG4gIC1vLWFuaW1hdGlvbi1uYW1lOiAkYW5pbmFtZTtcbiAgLW1zLWFuaW1hdGlvbi1uYW1lOiAkYW5pbmFtZTtcbiAgLXdlYmtpdC1hbmltYXRpb24tbmFtZTogJGFuaW5hbWU7XG4gIGFuaW1hdGlvbi1uYW1lOiAkYW5pbmFtZTtcbn1cblxuQG1peGluIGFuaW1hdGlvbi1kdXJhdGlvbigkZHVyYXRpb24pIHtcbiAgLW8tYW5pbWF0aW9uLWR1cmF0aW9uOiAkZHVyYXRpb247XG4gIC1tcy1hbmltYXRpb24tZHVyYXRpb246ICRkdXJhdGlvbjtcbiAgLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246ICRkdXJhdGlvbjtcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAkZHVyYXRpb247XG59XG5cbkBtaXhpbiBhbmltYXRpb24tZHVyYXRpb24oJGR1cmF0aW9uKSB7XG4gIC1vLWFuaW1hdGlvbi1kdXJhdGlvbjogJGR1cmF0aW9uO1xuICAtbXMtYW5pbWF0aW9uLWR1cmF0aW9uOiAkZHVyYXRpb247XG4gIC13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOiAkZHVyYXRpb247XG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogJGR1cmF0aW9uO1xufVxuXG5AbWl4aW4gYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbigkdGltaW5nKSB7XG4gIC1vLWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246ICR0aW1pbmc7XG4gIC1tcy1hbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiAkdGltaW5nO1xuICAtd2Via2l0LWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246ICR0aW1pbmc7XG4gIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246ICR0aW1pbmc7XG59XG5cbkBtaXhpbiBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50KCRjb3VudCkge1xuICAtby1hbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiAkY291bnQ7XG4gIC1tcy1hbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiAkY291bnQ7XG4gIC13ZWJraXQtYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogJGNvdW50O1xuICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiAkY291bnQ7XG59XG5cbi5nby11cCB7XG4gIEBpbmNsdWRlIGFuaW1hdGlvbi1uYW1lKGdvLXVwKTtcbiAgQGluY2x1ZGUgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudCgxKTtcbiAgQGluY2x1ZGUgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbihjdWJpYy1iZXppZXIoLjU1LCAwLCAuMSwgMSkpO1xuICBAaW5jbHVkZSBhbmltYXRpb24tZHVyYXRpb24oMC4zcyk7XG5cbiAgJi5kZWxheS0xIHtcbiAgICBAaW5jbHVkZSBhbmltYXRpb24tZHVyYXRpb24oMC41cyk7XG4gIH1cblxuICAmLmRlbGF5LTIge1xuICAgIEBpbmNsdWRlIGFuaW1hdGlvbi1kdXJhdGlvbigwLjdzKTtcbiAgfVxuXG4gICYuZGVsYXktMyB7XG4gICAgQGluY2x1ZGUgYW5pbWF0aW9uLWR1cmF0aW9uKDAuOXMpO1xuICB9XG5cbiAgJi5kZWxheS00IHtcbiAgICBAaW5jbHVkZSBhbmltYXRpb24tZHVyYXRpb24oMS4xcyk7XG4gIH1cblxuICAmLmRlbGF5LTUge1xuICAgIEBpbmNsdWRlIGFuaW1hdGlvbi1kdXJhdGlvbigxLjNzKTtcbiAgfVxuXG4gICYuZGVsYXktNiB7XG4gICAgQGluY2x1ZGUgYW5pbWF0aW9uLWR1cmF0aW9uKDEuNXMpO1xuICB9XG5cbiAgJi5kZWxheS03IHtcbiAgICBAaW5jbHVkZSBhbmltYXRpb24tZHVyYXRpb24oMS43cyk7XG4gIH1cblxuICAmLmRlbGF5LTgge1xuICAgIEBpbmNsdWRlIGFuaW1hdGlvbi1kdXJhdGlvbigxLjlzKTtcbiAgfVxuXG4gICYuZGVsYXktOSB7XG4gICAgQGluY2x1ZGUgYW5pbWF0aW9uLWR1cmF0aW9uKDIuMXMpO1xuICB9XG5cbiAgJi5kZWxheS0xMCB7XG4gICAgQGluY2x1ZGUgYW5pbWF0aW9uLWR1cmF0aW9uKDIuM3MpO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgZ28tdXAge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDgwcHgpO1xuICAgIG9wYWNpdHk6IDA7XG5cbiAgfVxuICA5MCUge1xuICAgIG9wYWNpdHk6IDAuOTtcbiAgfVxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG4iLCJAaW1wb3J0ICcuLi8uLi8uLi9nbG9iYWwnO1xuXG4uZmxvYXQge1xuICBAaW5jbHVkZSBjZW50ZXIodHJ1ZSwgdHJ1ZSk7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uY29udGFpbmVyIHtcbiAgd2lkdGg6IDUwJTtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIGJhY2tncm91bmQtY29sb3I6ICMzODNhM2U7XG4gIGJveC1zaGFkb3c6IDAgOXB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xufVxuXG4uaGVhZGVyIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM4Njg4OGY7XG4gIHBhZGRpbmc6IDEwcHggMTZweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuXG5cbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/components/pagina/pagina.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/pagina/pagina.component.ts ***!
  \*******************************************************/
/*! exports provided: PaginaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginaComponent", function() { return PaginaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PaginaComponent = /** @class */ (function () {
    function PaginaComponent() {
    }
    PaginaComponent.prototype.ngOnInit = function () { };
    PaginaComponent.prototype.fechar = function () {
        mp.browsers.forEach(function (browser) { return browser.destroy(); });
    };
    PaginaComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-pagina',
            template: __webpack_require__(/*! ./pagina.component.html */ "./src/app/components/pagina/pagina.component.html"),
            styles: [__webpack_require__(/*! ./pagina.component.scss */ "./src/app/components/pagina/pagina.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PaginaComponent);
    return PaginaComponent;
}());



/***/ }),

/***/ "./src/app/login/login.module.ts":
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/*! exports provided: LoginPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login.page */ "./src/app/login/login.page.ts");
/* harmony import */ var _components_pagina_pagina_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/pagina/pagina.component */ "./src/app/components/pagina/pagina.component.ts");








var routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]
    }
];
var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            ],
            declarations: [_login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"], _components_pagina_pagina_component__WEBPACK_IMPORTED_MODULE_7__["PaginaComponent"]]
        })
    ], LoginPageModule);
    return LoginPageModule;
}());



/***/ }),

/***/ "./src/app/login/login.page.html":
/*!***************************************!*\
  !*** ./src/app/login/login.page.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content>\n    <app-pagina [formGroup]=\"formGroup\" (submit)=\"login()\">\n        <div class=\"titulo\">Bem vindo de volta, {{ player.name }}!</div>\n\n        <ion-item>\n            <ion-label position=\"floating\">Nick</ion-label>\n            <ion-input formControlName=\"usuario\" type=\"text\"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label position=\"floating\">Senha</ion-label>\n            <ion-input #senha formControlName=\"senha\" type=\"password\"></ion-input>\n        </ion-item>\n\n        <div class=\"acoes\">\n            <button type=\"submit\" [disabled]=\"!formGroup.valid\" class=\"btn-enviar\">Login</button>\n\n            <a routerLink=\"esqueci-senha\">Esqueceu sua senha?</a>\n        </div>\n    </app-pagina>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/login/login.page.scss":
/*!***************************************!*\
  !*** ./src/app/login/login.page.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "html.ios{--ion-default-font: -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", \"Roboto\", sans-serif}html.md{--ion-default-font: \"Roboto\", \"Helvetica Neue\", sans-serif}html{--ion-font-family: var(--ion-default-font)}body{background:var(--ion-background-color)}body.backdrop-no-scroll{overflow:hidden}.ion-color-primary{--ion-color-base: var(--ion-color-primary, #3880ff) !important;--ion-color-base-rgb: var(--ion-color-primary-rgb, 56,128,255) !important;--ion-color-contrast: var(--ion-color-primary-contrast, #fff) !important;--ion-color-contrast-rgb: var(--ion-color-primary-contrast-rgb, 255,255,255) !important;--ion-color-shade: var(--ion-color-primary-shade, #3171e0) !important;--ion-color-tint: var(--ion-color-primary-tint, #4c8dff) !important}.ion-color-secondary{--ion-color-base: var(--ion-color-secondary, #0cd1e8) !important;--ion-color-base-rgb: var(--ion-color-secondary-rgb, 12,209,232) !important;--ion-color-contrast: var(--ion-color-secondary-contrast, #fff) !important;--ion-color-contrast-rgb: var(--ion-color-secondary-contrast-rgb, 255,255,255) !important;--ion-color-shade: var(--ion-color-secondary-shade, #0bb8cc) !important;--ion-color-tint: var(--ion-color-secondary-tint, #24d6ea) !important}.ion-color-tertiary{--ion-color-base: var(--ion-color-tertiary, #7044ff) !important;--ion-color-base-rgb: var(--ion-color-tertiary-rgb, 112,68,255) !important;--ion-color-contrast: var(--ion-color-tertiary-contrast, #fff) !important;--ion-color-contrast-rgb: var(--ion-color-tertiary-contrast-rgb, 255,255,255) !important;--ion-color-shade: var(--ion-color-tertiary-shade, #633ce0) !important;--ion-color-tint: var(--ion-color-tertiary-tint, #7e57ff) !important}.ion-color-success{--ion-color-base: var(--ion-color-success, #10dc60) !important;--ion-color-base-rgb: var(--ion-color-success-rgb, 16,220,96) !important;--ion-color-contrast: var(--ion-color-success-contrast, #fff) !important;--ion-color-contrast-rgb: var(--ion-color-success-contrast-rgb, 255,255,255) !important;--ion-color-shade: var(--ion-color-success-shade, #0ec254) !important;--ion-color-tint: var(--ion-color-success-tint, #28e070) !important}.ion-color-warning{--ion-color-base: var(--ion-color-warning, #ffce00) !important;--ion-color-base-rgb: var(--ion-color-warning-rgb, 255,206,0) !important;--ion-color-contrast: var(--ion-color-warning-contrast, #fff) !important;--ion-color-contrast-rgb: var(--ion-color-warning-contrast-rgb, 255,255,255) !important;--ion-color-shade: var(--ion-color-warning-shade, #e0b500) !important;--ion-color-tint: var(--ion-color-warning-tint, #ffd31a) !important}.ion-color-danger{--ion-color-base: var(--ion-color-danger, #f04141) !important;--ion-color-base-rgb: var(--ion-color-danger-rgb, 240,65,65) !important;--ion-color-contrast: var(--ion-color-danger-contrast, #fff) !important;--ion-color-contrast-rgb: var(--ion-color-danger-contrast-rgb, 255,255,255) !important;--ion-color-shade: var(--ion-color-danger-shade, #d33939) !important;--ion-color-tint: var(--ion-color-danger-tint, #f25454) !important}.ion-color-light{--ion-color-base: var(--ion-color-light, #f4f5f8) !important;--ion-color-base-rgb: var(--ion-color-light-rgb, 244,245,248) !important;--ion-color-contrast: var(--ion-color-light-contrast, #000) !important;--ion-color-contrast-rgb: var(--ion-color-light-contrast-rgb, 0,0,0) !important;--ion-color-shade: var(--ion-color-light-shade, #d7d8da) !important;--ion-color-tint: var(--ion-color-light-tint, #f5f6f9) !important}.ion-color-medium{--ion-color-base: var(--ion-color-medium, #989aa2) !important;--ion-color-base-rgb: var(--ion-color-medium-rgb, 152,154,162) !important;--ion-color-contrast: var(--ion-color-medium-contrast, #fff) !important;--ion-color-contrast-rgb: var(--ion-color-medium-contrast-rgb, 255,255,255) !important;--ion-color-shade: var(--ion-color-medium-shade, #86888f) !important;--ion-color-tint: var(--ion-color-medium-tint, #a2a4ab) !important}.ion-color-dark{--ion-color-base: var(--ion-color-dark, #222428) !important;--ion-color-base-rgb: var(--ion-color-dark-rgb, 34,36,40) !important;--ion-color-contrast: var(--ion-color-dark-contrast, #fff) !important;--ion-color-contrast-rgb: var(--ion-color-dark-contrast-rgb, 255,255,255) !important;--ion-color-shade: var(--ion-color-dark-shade, #1e2023) !important;--ion-color-tint: var(--ion-color-dark-tint, #383a3e) !important}.ion-page{left:0;right:0;top:0;bottom:0;display:flex;position:absolute;flex-direction:column;justify-content:space-between;contain:layout size style;overflow:hidden;z-index:0}ion-route,ion-route-redirect,ion-router,ion-select-option,ion-nav-controller,ion-menu-controller,ion-action-sheet-controller,ion-alert-controller,ion-loading-controller,ion-modal-controller,ion-picker-controller,ion-popover-controller,ion-toast-controller,.ion-page-hidden,[hidden]{display:none !important}.ion-page-invisible{opacity:0}html.plt-ios.plt-hybrid,html.plt-ios.plt-pwa{--ion-statusbar-padding: 20px}@supports (padding-top: 20px){html{--ion-safe-area-top: var(--ion-statusbar-padding)}}@supports (padding-top: constant(safe-area-inset-top)){html{--ion-safe-area-top: constant(safe-area-inset-top);--ion-safe-area-bottom: constant(safe-area-inset-bottom);--ion-safe-area-left: constant(safe-area-inset-left);--ion-safe-area-right: constant(safe-area-inset-right)}}@supports (padding-top: env(safe-area-inset-top)){html{--ion-safe-area-top: env(safe-area-inset-top);--ion-safe-area-bottom: env(safe-area-inset-bottom);--ion-safe-area-left: env(safe-area-inset-left);--ion-safe-area-right: env(safe-area-inset-right)}}audio,canvas,progress,video{vertical-align:baseline}audio:not([controls]){display:none;height:0}b,strong{font-weight:bold}img{max-width:100%;border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{height:1px;border-width:0;box-sizing:content-box}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace, monospace;font-size:1em}label,input,select,textarea{font-family:inherit;line-height:normal}textarea{overflow:auto;height:auto;font:inherit;color:inherit}textarea::-webkit-input-placeholder{padding-left:2px}textarea::-moz-placeholder{padding-left:2px}textarea:-ms-input-placeholder{padding-left:2px}textarea::-ms-input-placeholder{padding-left:2px}textarea::placeholder{padding-left:2px}form,input,optgroup,select{margin:0;font:inherit;color:inherit}html input[type=\"button\"],input[type=\"reset\"],input[type=\"submit\"]{cursor:pointer;-webkit-appearance:button}a,a div,a span,a ion-icon,a ion-label,button,button div,button span,button ion-icon,button ion-label,.ion-tappable,[tappable],[tappable] div,[tappable] span,[tappable] ion-icon,[tappable] ion-label,input,textarea{touch-action:manipulation}a ion-label,button ion-label{pointer-events:none}button{border:0;border-radius:0;font-family:inherit;font-style:inherit;font-variant:inherit;line-height:1;text-transform:none;cursor:pointer;-webkit-appearance:button}[tappable]{cursor:pointer}a[disabled],button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0}input[type=\"checkbox\"],input[type=\"radio\"]{padding:0;box-sizing:border-box}input[type=\"number\"]::-webkit-inner-spin-button,input[type=\"number\"]::-webkit-outer-spin-button{height:auto}input[type=\"search\"]::-webkit-search-cancel-button,input[type=\"search\"]::-webkit-search-decoration{-webkit-appearance:none}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}*{box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none}html{width:100%;height:100%;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%}html.plt-pwa{height:100vh}body{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;position:fixed;width:100%;max-width:100%;height:100%;max-height:100%;text-rendering:optimizeLegibility;overflow:hidden;touch-action:manipulation;-webkit-user-drag:none;-ms-content-zooming:none;word-wrap:break-word;overscroll-behavior-y:none;-webkit-text-size-adjust:none;-moz-text-size-adjust:none;-ms-text-size-adjust:none;text-size-adjust:none}html{font-family:var(--ion-font-family)}a{background-color:transparent;color:var(--ion-color-primary, #3880ff)}h1,h2,h3,h4,h5,h6{margin-top:16px;margin-bottom:10px;font-weight:500;line-height:1.2}h1{margin-top:20px;font-size:26px}h2{margin-top:18px;font-size:24px}h3{font-size:22px}h4{font-size:20px}h5{font-size:18px}h6{font-size:16px}small{font-size:75%}sub,sup{position:relative;font-size:75%;line-height:0;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}.ion-hide{display:none !important}.ion-hide-up{display:none !important}@media (max-width: 575px){.ion-hide-down{display:none !important}}@media (min-width: 576px){.ion-hide-sm-up{display:none !important}}@media (max-width: 767px){.ion-hide-sm-down{display:none !important}}@media (min-width: 768px){.ion-hide-md-up{display:none !important}}@media (max-width: 991px){.ion-hide-md-down{display:none !important}}@media (min-width: 992px){.ion-hide-lg-up{display:none !important}}@media (max-width: 1199px){.ion-hide-lg-down{display:none !important}}@media (min-width: 1200px){.ion-hide-xl-up{display:none !important}}.ion-hide-xl-down{display:none !important}.ion-no-padding,[no-padding]{--padding-start: 0;--padding-end: 0;--padding-top: 0;--padding-bottom: 0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0}.ion-padding,[padding]{--padding-start: var(--ion-padding, 16px);--padding-end: var(--ion-padding, 16px);--padding-top: var(--ion-padding, 16px);--padding-bottom: var(--ion-padding, 16px);padding-left:var(--ion-padding, 16px);padding-right:var(--ion-padding, 16px);padding-top:var(--ion-padding, 16px);padding-bottom:var(--ion-padding, 16px)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.ion-padding,[padding]{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-padding, 16px);padding-inline-start:var(--ion-padding, 16px);-webkit-padding-end:var(--ion-padding, 16px);padding-inline-end:var(--ion-padding, 16px)}}.ion-padding-top,[padding-top]{--padding-top: var(--ion-padding, 16px);padding-top:var(--ion-padding, 16px)}.ion-padding-start,[padding-start]{--padding-start: var(--ion-padding, 16px);padding-left:var(--ion-padding, 16px)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.ion-padding-start,[padding-start]{padding-left:unset;-webkit-padding-start:var(--ion-padding, 16px);padding-inline-start:var(--ion-padding, 16px)}}.ion-padding-end,[padding-end]{--padding-end: var(--ion-padding, 16px);padding-right:var(--ion-padding, 16px)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.ion-padding-end,[padding-end]{padding-right:unset;-webkit-padding-end:var(--ion-padding, 16px);padding-inline-end:var(--ion-padding, 16px)}}.ion-padding-bottom,[padding-bottom]{--padding-bottom: var(--ion-padding, 16px);padding-bottom:var(--ion-padding, 16px)}.ion-padding-vertical,[padding-vertical]{--padding-top: var(--ion-padding, 16px);--padding-bottom: var(--ion-padding, 16px);padding-top:var(--ion-padding, 16px);padding-bottom:var(--ion-padding, 16px)}.ion-padding-horizontal,[padding-horizontal]{--padding-start: var(--ion-padding, 16px);--padding-end: var(--ion-padding, 16px);padding-left:var(--ion-padding, 16px);padding-right:var(--ion-padding, 16px)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.ion-padding-horizontal,[padding-horizontal]{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-padding, 16px);padding-inline-start:var(--ion-padding, 16px);-webkit-padding-end:var(--ion-padding, 16px);padding-inline-end:var(--ion-padding, 16px)}}.ion-no-margin,[no-margin]{--margin-start: 0;--margin-end: 0;--margin-top: 0;--margin-bottom: 0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}.ion-margin,[margin]{--margin-start: var(--ion-margin, 16px);--margin-end: var(--ion-margin, 16px);--margin-top: var(--ion-margin, 16px);--margin-bottom: var(--ion-margin, 16px);margin-left:var(--ion-margin, 16px);margin-right:var(--ion-margin, 16px);margin-top:var(--ion-margin, 16px);margin-bottom:var(--ion-margin, 16px)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.ion-margin,[margin]{margin-left:unset;margin-right:unset;-webkit-margin-start:var(--ion-margin, 16px);margin-inline-start:var(--ion-margin, 16px);-webkit-margin-end:var(--ion-margin, 16px);margin-inline-end:var(--ion-margin, 16px)}}.ion-margin-top,[margin-top]{--margin-top: var(--ion-margin, 16px);margin-top:var(--ion-margin, 16px)}.ion-margin-start,[margin-start]{--margin-start: var(--ion-margin, 16px);margin-left:var(--ion-margin, 16px)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.ion-margin-start,[margin-start]{margin-left:unset;-webkit-margin-start:var(--ion-margin, 16px);margin-inline-start:var(--ion-margin, 16px)}}.ion-margin-end,[margin-end]{--margin-end: var(--ion-margin, 16px);margin-right:var(--ion-margin, 16px)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.ion-margin-end,[margin-end]{margin-right:unset;-webkit-margin-end:var(--ion-margin, 16px);margin-inline-end:var(--ion-margin, 16px)}}.ion-margin-bottom,[margin-bottom]{--margin-bottom: var(--ion-margin, 16px);margin-bottom:var(--ion-margin, 16px)}.ion-margin-vertical,[margin-vertical]{--margin-top: var(--ion-margin, 16px);--margin-bottom: var(--ion-margin, 16px);margin-top:var(--ion-margin, 16px);margin-bottom:var(--ion-margin, 16px)}.ion-margin-horizontal,[margin-horizontal]{--margin-start: var(--ion-margin, 16px);--margin-end: var(--ion-margin, 16px);margin-left:var(--ion-margin, 16px);margin-right:var(--ion-margin, 16px)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.ion-margin-horizontal,[margin-horizontal]{margin-left:unset;margin-right:unset;-webkit-margin-start:var(--ion-margin, 16px);margin-inline-start:var(--ion-margin, 16px);-webkit-margin-end:var(--ion-margin, 16px);margin-inline-end:var(--ion-margin, 16px)}}.ion-float-left,[float-left]{float:left !important}.ion-float-right,[float-right]{float:right !important}.ion-float-start,[float-start]{float:left !important}:host-context([dir=rtl]) .ion-float-start,:host-context([dir=rtl]) [float-start]{float:right !important}.ion-float-end,[float-end]{float:right !important}:host-context([dir=rtl]) .ion-float-end,:host-context([dir=rtl]) [float-end]{float:left !important}@media (min-width: 576px){.ion-float-sm-left,[float-sm-left]{float:left !important}.ion-float-sm-right,[float-sm-right]{float:right !important}.ion-float-sm-start,[float-sm-start]{float:left !important}:host-context([dir=rtl]) .ion-float-sm-start,:host-context([dir=rtl]) [float-sm-start]{float:right !important}.ion-float-sm-end,[float-sm-end]{float:right !important}:host-context([dir=rtl]) .ion-float-sm-end,:host-context([dir=rtl]) [float-sm-end]{float:left !important}}@media (min-width: 768px){.ion-float-md-left,[float-md-left]{float:left !important}.ion-float-md-right,[float-md-right]{float:right !important}.ion-float-md-start,[float-md-start]{float:left !important}:host-context([dir=rtl]) .ion-float-md-start,:host-context([dir=rtl]) [float-md-start]{float:right !important}.ion-float-md-end,[float-md-end]{float:right !important}:host-context([dir=rtl]) .ion-float-md-end,:host-context([dir=rtl]) [float-md-end]{float:left !important}}@media (min-width: 992px){.ion-float-lg-left,[float-lg-left]{float:left !important}.ion-float-lg-right,[float-lg-right]{float:right !important}.ion-float-lg-start,[float-lg-start]{float:left !important}:host-context([dir=rtl]) .ion-float-lg-start,:host-context([dir=rtl]) [float-lg-start]{float:right !important}.ion-float-lg-end,[float-lg-end]{float:right !important}:host-context([dir=rtl]) .ion-float-lg-end,:host-context([dir=rtl]) [float-lg-end]{float:left !important}}@media (min-width: 1200px){.ion-float-xl-left,[float-xl-left]{float:left !important}.ion-float-xl-right,[float-xl-right]{float:right !important}.ion-float-xl-start,[float-xl-start]{float:left !important}:host-context([dir=rtl]) .ion-float-xl-start,:host-context([dir=rtl]) [float-xl-start]{float:right !important}.ion-float-xl-end,[float-xl-end]{float:right !important}:host-context([dir=rtl]) .ion-float-xl-end,:host-context([dir=rtl]) [float-xl-end]{float:left !important}}.ion-text-center,[text-center]{text-align:center !important}.ion-text-justify,[text-justify]{text-align:justify !important}.ion-text-start,[text-start]{text-align:start !important}.ion-text-end,[text-end]{text-align:end !important}.ion-text-left,[text-left]{text-align:left !important}.ion-text-right,[text-right]{text-align:right !important}.ion-text-nowrap,[text-nowrap]{white-space:nowrap !important}.ion-text-wrap,[text-wrap]{white-space:normal !important}@media (min-width: 576px){.ion-text-sm-center,[text-sm-center]{text-align:center !important}.ion-text-sm-justify,[text-sm-justify]{text-align:justify !important}.ion-text-sm-start,[text-sm-start]{text-align:start !important}.ion-text-sm-end,[text-sm-end]{text-align:end !important}.ion-text-sm-left,[text-sm-left]{text-align:left !important}.ion-text-sm-right,[text-sm-right]{text-align:right !important}.ion-text-sm-nowrap,[text-sm-nowrap]{white-space:nowrap !important}.ion-text-sm-wrap,[text-sm-wrap]{white-space:normal !important}}@media (min-width: 768px){.ion-text-md-center,[text-md-center]{text-align:center !important}.ion-text-md-justify,[text-md-justify]{text-align:justify !important}.ion-text-md-start,[text-md-start]{text-align:start !important}.ion-text-md-end,[text-md-end]{text-align:end !important}.ion-text-md-left,[text-md-left]{text-align:left !important}.ion-text-md-right,[text-md-right]{text-align:right !important}.ion-text-md-nowrap,[text-md-nowrap]{white-space:nowrap !important}.ion-text-md-wrap,[text-md-wrap]{white-space:normal !important}}@media (min-width: 992px){.ion-text-lg-center,[text-lg-center]{text-align:center !important}.ion-text-lg-justify,[text-lg-justify]{text-align:justify !important}.ion-text-lg-start,[text-lg-start]{text-align:start !important}.ion-text-lg-end,[text-lg-end]{text-align:end !important}.ion-text-lg-left,[text-lg-left]{text-align:left !important}.ion-text-lg-right,[text-lg-right]{text-align:right !important}.ion-text-lg-nowrap,[text-lg-nowrap]{white-space:nowrap !important}.ion-text-lg-wrap,[text-lg-wrap]{white-space:normal !important}}@media (min-width: 1200px){.ion-text-xl-center,[text-xl-center]{text-align:center !important}.ion-text-xl-justify,[text-xl-justify]{text-align:justify !important}.ion-text-xl-start,[text-xl-start]{text-align:start !important}.ion-text-xl-end,[text-xl-end]{text-align:end !important}.ion-text-xl-left,[text-xl-left]{text-align:left !important}.ion-text-xl-right,[text-xl-right]{text-align:right !important}.ion-text-xl-nowrap,[text-xl-nowrap]{white-space:nowrap !important}.ion-text-xl-wrap,[text-xl-wrap]{white-space:normal !important}}.ion-text-uppercase,[text-uppercase]{text-transform:uppercase !important}.ion-text-lowercase,[text-lowercase]{text-transform:lowercase !important}.ion-text-capitalize,[text-capitalize]{text-transform:capitalize !important}@media (min-width: 576px){.ion-text-sm-uppercase,[text-sm-uppercase]{text-transform:uppercase !important}.ion-text-sm-lowercase,[text-sm-lowercase]{text-transform:lowercase !important}.ion-text-sm-capitalize,[text-sm-capitalize]{text-transform:capitalize !important}}@media (min-width: 768px){.ion-text-md-uppercase,[text-md-uppercase]{text-transform:uppercase !important}.ion-text-md-lowercase,[text-md-lowercase]{text-transform:lowercase !important}.ion-text-md-capitalize,[text-md-capitalize]{text-transform:capitalize !important}}@media (min-width: 992px){.ion-text-lg-uppercase,[text-lg-uppercase]{text-transform:uppercase !important}.ion-text-lg-lowercase,[text-lg-lowercase]{text-transform:lowercase !important}.ion-text-lg-capitalize,[text-lg-capitalize]{text-transform:capitalize !important}}@media (min-width: 1200px){.ion-text-xl-uppercase,[text-xl-uppercase]{text-transform:uppercase !important}.ion-text-xl-lowercase,[text-xl-lowercase]{text-transform:lowercase !important}.ion-text-xl-capitalize,[text-xl-capitalize]{text-transform:capitalize !important}}.ion-align-self-start,[align-self-start]{align-self:flex-start !important}.ion-align-self-end,[align-self-end]{align-self:flex-end !important}.ion-align-self-center,[align-self-center]{align-self:center !important}.ion-align-self-stretch,[align-self-stretch]{align-self:stretch !important}.ion-align-self-baseline,[align-self-baseline]{align-self:baseline !important}.ion-align-self-auto,[align-self-auto]{align-self:auto !important}.ion-wrap,[wrap]{flex-wrap:wrap !important}.ion-nowrap,[nowrap]{flex-wrap:nowrap !important}.ion-wrap-reverse,[wrap-reverse]{flex-wrap:wrap-reverse !important}.ion-justify-content-start,[justify-content-start]{justify-content:flex-start !important}.ion-justify-content-center,[justify-content-center]{justify-content:center !important}.ion-justify-content-end,[justify-content-end]{justify-content:flex-end !important}.ion-justify-content-around,[justify-content-around]{justify-content:space-around !important}.ion-justify-content-between,[justify-content-between]{justify-content:space-between !important}.ion-justify-content-evenly,[justify-content-evenly]{justify-content:space-evenly !important}.ion-align-items-start,[align-items-start]{align-items:flex-start !important}.ion-align-items-center,[align-items-center]{align-items:center !important}.ion-align-items-end,[align-items-end]{align-items:flex-end !important}.ion-align-items-stretch,[align-items-stretch]{align-items:stretch !important}.ion-align-items-baseline,[align-items-baseline]{align-items:baseline !important}.go-up {\n  -webkit-animation-name: go-up;\n  animation-name: go-up;\n  -webkit-animation-iteration-count: 1;\n  animation-iteration-count: 1;\n  -webkit-animation-timing-function: cubic-bezier(0.55, 0, 0.1, 1);\n  animation-timing-function: cubic-bezier(0.55, 0, 0.1, 1);\n  -webkit-animation-duration: 0.3s;\n  animation-duration: 0.3s; }.go-up.delay-1 {\n    -webkit-animation-duration: 0.5s;\n    animation-duration: 0.5s; }.go-up.delay-2 {\n    -webkit-animation-duration: 0.7s;\n    animation-duration: 0.7s; }.go-up.delay-3 {\n    -webkit-animation-duration: 0.9s;\n    animation-duration: 0.9s; }.go-up.delay-4 {\n    -webkit-animation-duration: 1.1s;\n    animation-duration: 1.1s; }.go-up.delay-5 {\n    -webkit-animation-duration: 1.3s;\n    animation-duration: 1.3s; }.go-up.delay-6 {\n    -webkit-animation-duration: 1.5s;\n    animation-duration: 1.5s; }.go-up.delay-7 {\n    -webkit-animation-duration: 1.7s;\n    animation-duration: 1.7s; }.go-up.delay-8 {\n    -webkit-animation-duration: 1.9s;\n    animation-duration: 1.9s; }.go-up.delay-9 {\n    -webkit-animation-duration: 2.1s;\n    animation-duration: 2.1s; }.go-up.delay-10 {\n    -webkit-animation-duration: 2.3s;\n    animation-duration: 2.3s; }@-webkit-keyframes go-up {\n  0% {\n    -webkit-transform: translateY(80px);\n            transform: translateY(80px);\n    opacity: 0; }\n  90% {\n    opacity: 0.9; }\n  100% {\n    -webkit-transform: translateY(0px);\n            transform: translateY(0px);\n    opacity: 1; } }@keyframes go-up {\n  0% {\n    -webkit-transform: translateY(80px);\n            transform: translateY(80px);\n    opacity: 0; }\n  90% {\n    opacity: 0.9; }\n  100% {\n    -webkit-transform: translateY(0px);\n            transform: translateY(0px);\n    opacity: 1; } }:host {\n  --ion-background-color: transparent; }:host ion-label {\n    --color: #FFFFFF; }:host ion-input {\n    --color: #FFFFFF; }.titulo {\n  padding: 10px 0;\n  font-size: 20px;\n  color: #FFFFFF;\n  text-align: center; }.acoes {\n  display: flex;\n  justify-content: space-between;\n  margin: 16px;\n  padding: 5px 0;\n  align-items: center; }.btn-enviar {\n  background-color: #319136;\n  color: #FFFFFF;\n  padding: 10px;\n  font-size: 15px;\n  border-radius: 6px;\n  box-shadow: 1px 1px rgba(0, 0, 0, 0.1); }.btn-enviar[disabled] {\n  opacity: .3; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AaW9uaWMvYW5ndWxhci9jc3MvY29yZS5jc3MiLCJub2RlX21vZHVsZXMvQGlvbmljL2FuZ3VsYXIvY3NzL25vcm1hbGl6ZS5jc3MiLCJub2RlX21vZHVsZXMvQGlvbmljL2FuZ3VsYXIvY3NzL3N0cnVjdHVyZS5jc3MiLCJub2RlX21vZHVsZXMvQGlvbmljL2FuZ3VsYXIvY3NzL3R5cG9ncmFwaHkuY3NzIiwibm9kZV9tb2R1bGVzL0Bpb25pYy9hbmd1bGFyL2Nzcy9kaXNwbGF5LmNzcyIsIm5vZGVfbW9kdWxlcy9AaW9uaWMvYW5ndWxhci9jc3MvcGFkZGluZy5jc3MiLCJub2RlX21vZHVsZXMvQGlvbmljL2FuZ3VsYXIvY3NzL2Zsb2F0LWVsZW1lbnRzLmNzcyIsIm5vZGVfbW9kdWxlcy9AaW9uaWMvYW5ndWxhci9jc3MvdGV4dC1hbGlnbm1lbnQuY3NzIiwibm9kZV9tb2R1bGVzL0Bpb25pYy9hbmd1bGFyL2Nzcy90ZXh0LXRyYW5zZm9ybWF0aW9uLmNzcyIsIm5vZGVfbW9kdWxlcy9AaW9uaWMvYW5ndWxhci9jc3MvZmxleC11dGlscy5jc3MiLCIvdXNyL2xvY2FsL3Zhci93d3cvaHRkb2NzL0JSWi9SYWdlTVAvYnJvd3Nlci9zcmMvZ2xvYmFsLnNjc3MiLCIvdXNyL2xvY2FsL3Zhci93d3cvaHRkb2NzL0JSWi9SYWdlTVAvYnJvd3Nlci9zcmMvYXBwL2xvZ2luL2xvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTLDZGQUE2RixDQUFDLFFBQVEsMERBQTBELENBQUMsS0FBSywwQ0FBMEMsQ0FBQyxLQUFLLHNDQUFzQyxDQUFDLHdCQUF3QixlQUFlLENBQUMsbUJBQW1CLDhEQUE4RCxDQUFDLHlFQUF5RSxDQUFDLHdFQUF3RSxDQUFDLHVGQUF1RixDQUFDLHFFQUFxRSxDQUFDLG1FQUFtRSxDQUFDLHFCQUFxQixnRUFBZ0UsQ0FBQywyRUFBMkUsQ0FBQywwRUFBMEUsQ0FBQyx5RkFBeUYs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QjtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsWUFBWTtFQUNaLGNBQWM7RUFDZCxtQkFBbUIsRUFBQSxDQUdyQjtFQUNFLHlCQUF5QjtFQUN6QixjQUFjO0VBQ2QsYUFBYTtFQUNiLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsc0NBQXNDLEVBQUEsQ0FHeEM7RUFDRSxXQUFXLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9sb2dpbi9sb2dpbi5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJodG1sLmlvc3stLWlvbi1kZWZhdWx0LWZvbnQ6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBcIlJvYm90b1wiLCBzYW5zLXNlcmlmfWh0bWwubWR7LS1pb24tZGVmYXVsdC1mb250OiBcIlJvYm90b1wiLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWZ9aHRtbHstLWlvbi1mb250LWZhbWlseTogdmFyKC0taW9uLWRlZmF1bHQtZm9udCl9Ym9keXtiYWNrZ3JvdW5kOnZhcigtLWlvbi1iYWNrZ3JvdW5kLWNvbG9yKX1ib2R5LmJhY2tkcm9wLW5vLXNjcm9sbHtvdmVyZmxvdzpoaWRkZW59Lmlvbi1jb2xvci1wcmltYXJ5ey0taW9uLWNvbG9yLWJhc2U6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LCAjMzg4MGZmKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLWJhc2UtcmdiOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IsIDU2LDEyOCwyNTUpICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItY29udHJhc3Q6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LCAjZmZmKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLWNvbnRyYXN0LXJnYjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QtcmdiLCAyNTUsMjU1LDI1NSkgIWltcG9ydGFudDstLWlvbi1jb2xvci1zaGFkZTogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktc2hhZGUsICMzMTcxZTApICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItdGludDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktdGludCwgIzRjOGRmZikgIWltcG9ydGFudH0uaW9uLWNvbG9yLXNlY29uZGFyeXstLWlvbi1jb2xvci1iYXNlOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5LCAjMGNkMWU4KSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLWJhc2UtcmdiOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYiwgMTIsMjA5LDIzMikgIWltcG9ydGFudDstLWlvbi1jb2xvci1jb250cmFzdDogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdCwgI2ZmZikgIWltcG9ydGFudDstLWlvbi1jb2xvci1jb250cmFzdC1yZ2I6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QtcmdiLCAyNTUsMjU1LDI1NSkgIWltcG9ydGFudDstLWlvbi1jb2xvci1zaGFkZTogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZSwgIzBiYjhjYykgIWltcG9ydGFudDstLWlvbi1jb2xvci10aW50OiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5LXRpbnQsICMyNGQ2ZWEpICFpbXBvcnRhbnR9Lmlvbi1jb2xvci10ZXJ0aWFyeXstLWlvbi1jb2xvci1iYXNlOiB2YXIoLS1pb24tY29sb3ItdGVydGlhcnksICM3MDQ0ZmYpICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItYmFzZS1yZ2I6IHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeS1yZ2IsIDExMiw2OCwyNTUpICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItY29udHJhc3Q6IHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdCwgI2ZmZikgIWltcG9ydGFudDstLWlvbi1jb2xvci1jb250cmFzdC1yZ2I6IHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdC1yZ2IsIDI1NSwyNTUsMjU1KSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLXNoYWRlOiB2YXIoLS1pb24tY29sb3ItdGVydGlhcnktc2hhZGUsICM2MzNjZTApICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItdGludDogdmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5LXRpbnQsICM3ZTU3ZmYpICFpbXBvcnRhbnR9Lmlvbi1jb2xvci1zdWNjZXNzey0taW9uLWNvbG9yLWJhc2U6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzLCAjMTBkYzYwKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLWJhc2UtcmdiOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcy1yZ2IsIDE2LDIyMCw5NikgIWltcG9ydGFudDstLWlvbi1jb2xvci1jb250cmFzdDogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QsICNmZmYpICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItY29udHJhc3QtcmdiOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdC1yZ2IsIDI1NSwyNTUsMjU1KSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLXNoYWRlOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcy1zaGFkZSwgIzBlYzI1NCkgIWltcG9ydGFudDstLWlvbi1jb2xvci10aW50OiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcy10aW50LCAjMjhlMDcwKSAhaW1wb3J0YW50fS5pb24tY29sb3Itd2FybmluZ3stLWlvbi1jb2xvci1iYXNlOiB2YXIoLS1pb24tY29sb3Itd2FybmluZywgI2ZmY2UwMCkgIWltcG9ydGFudDstLWlvbi1jb2xvci1iYXNlLXJnYjogdmFyKC0taW9uLWNvbG9yLXdhcm5pbmctcmdiLCAyNTUsMjA2LDApICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItY29udHJhc3Q6IHZhcigtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0LCAjZmZmKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLWNvbnRyYXN0LXJnYjogdmFyKC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3QtcmdiLCAyNTUsMjU1LDI1NSkgIWltcG9ydGFudDstLWlvbi1jb2xvci1zaGFkZTogdmFyKC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGUsICNlMGI1MDApICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItdGludDogdmFyKC0taW9uLWNvbG9yLXdhcm5pbmctdGludCwgI2ZmZDMxYSkgIWltcG9ydGFudH0uaW9uLWNvbG9yLWRhbmdlcnstLWlvbi1jb2xvci1iYXNlOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyLCAjZjA0MTQxKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLWJhc2UtcmdiOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyLXJnYiwgMjQwLDY1LDY1KSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLWNvbnRyYXN0OiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0LCAjZmZmKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLWNvbnRyYXN0LXJnYjogdmFyKC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdC1yZ2IsIDI1NSwyNTUsMjU1KSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLXNoYWRlOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyLXNoYWRlLCAjZDMzOTM5KSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLXRpbnQ6IHZhcigtLWlvbi1jb2xvci1kYW5nZXItdGludCwgI2YyNTQ1NCkgIWltcG9ydGFudH0uaW9uLWNvbG9yLWxpZ2h0ey0taW9uLWNvbG9yLWJhc2U6IHZhcigtLWlvbi1jb2xvci1saWdodCwgI2Y0ZjVmOCkgIWltcG9ydGFudDstLWlvbi1jb2xvci1iYXNlLXJnYjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXJnYiwgMjQ0LDI0NSwyNDgpICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItY29udHJhc3Q6IHZhcigtLWlvbi1jb2xvci1saWdodC1jb250cmFzdCwgIzAwMCkgIWltcG9ydGFudDstLWlvbi1jb2xvci1jb250cmFzdC1yZ2I6IHZhcigtLWlvbi1jb2xvci1saWdodC1jb250cmFzdC1yZ2IsIDAsMCwwKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLXNoYWRlOiB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUsICNkN2Q4ZGEpICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItdGludDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQsICNmNWY2ZjkpICFpbXBvcnRhbnR9Lmlvbi1jb2xvci1tZWRpdW17LS1pb24tY29sb3ItYmFzZTogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSwgIzk4OWFhMikgIWltcG9ydGFudDstLWlvbi1jb2xvci1iYXNlLXJnYjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1yZ2IsIDE1MiwxNTQsMTYyKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLWNvbnRyYXN0OiB2YXIoLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0LCAjZmZmKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLWNvbnRyYXN0LXJnYjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdC1yZ2IsIDI1NSwyNTUsMjU1KSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLXNoYWRlOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlLCAjODY4ODhmKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLXRpbnQ6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0tdGludCwgI2EyYTRhYikgIWltcG9ydGFudH0uaW9uLWNvbG9yLWRhcmt7LS1pb24tY29sb3ItYmFzZTogdmFyKC0taW9uLWNvbG9yLWRhcmssICMyMjI0MjgpICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItYmFzZS1yZ2I6IHZhcigtLWlvbi1jb2xvci1kYXJrLXJnYiwgMzQsMzYsNDApICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItY29udHJhc3Q6IHZhcigtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LCAjZmZmKSAhaW1wb3J0YW50Oy0taW9uLWNvbG9yLWNvbnRyYXN0LXJnYjogdmFyKC0taW9uLWNvbG9yLWRhcmstY29udHJhc3QtcmdiLCAyNTUsMjU1LDI1NSkgIWltcG9ydGFudDstLWlvbi1jb2xvci1zaGFkZTogdmFyKC0taW9uLWNvbG9yLWRhcmstc2hhZGUsICMxZTIwMjMpICFpbXBvcnRhbnQ7LS1pb24tY29sb3ItdGludDogdmFyKC0taW9uLWNvbG9yLWRhcmstdGludCwgIzM4M2EzZSkgIWltcG9ydGFudH0uaW9uLXBhZ2V7bGVmdDowO3JpZ2h0OjA7dG9wOjA7Ym90dG9tOjA7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmFic29sdXRlO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbjtjb250YWluOmxheW91dCBzaXplIHN0eWxlO292ZXJmbG93OmhpZGRlbjt6LWluZGV4OjB9aW9uLXJvdXRlLGlvbi1yb3V0ZS1yZWRpcmVjdCxpb24tcm91dGVyLGlvbi1zZWxlY3Qtb3B0aW9uLGlvbi1uYXYtY29udHJvbGxlcixpb24tbWVudS1jb250cm9sbGVyLGlvbi1hY3Rpb24tc2hlZXQtY29udHJvbGxlcixpb24tYWxlcnQtY29udHJvbGxlcixpb24tbG9hZGluZy1jb250cm9sbGVyLGlvbi1tb2RhbC1jb250cm9sbGVyLGlvbi1waWNrZXItY29udHJvbGxlcixpb24tcG9wb3Zlci1jb250cm9sbGVyLGlvbi10b2FzdC1jb250cm9sbGVyLC5pb24tcGFnZS1oaWRkZW4sW2hpZGRlbl17ZGlzcGxheTpub25lICFpbXBvcnRhbnR9Lmlvbi1wYWdlLWludmlzaWJsZXtvcGFjaXR5OjB9aHRtbC5wbHQtaW9zLnBsdC1oeWJyaWQsaHRtbC5wbHQtaW9zLnBsdC1wd2F7LS1pb24tc3RhdHVzYmFyLXBhZGRpbmc6IDIwcHh9QHN1cHBvcnRzIChwYWRkaW5nLXRvcDogMjBweCl7aHRtbHstLWlvbi1zYWZlLWFyZWEtdG9wOiB2YXIoLS1pb24tc3RhdHVzYmFyLXBhZGRpbmcpfX1Ac3VwcG9ydHMgKHBhZGRpbmctdG9wOiBjb25zdGFudChzYWZlLWFyZWEtaW5zZXQtdG9wKSl7aHRtbHstLWlvbi1zYWZlLWFyZWEtdG9wOiBjb25zdGFudChzYWZlLWFyZWEtaW5zZXQtdG9wKTstLWlvbi1zYWZlLWFyZWEtYm90dG9tOiBjb25zdGFudChzYWZlLWFyZWEtaW5zZXQtYm90dG9tKTstLWlvbi1zYWZlLWFyZWEtbGVmdDogY29uc3RhbnQoc2FmZS1hcmVhLWluc2V0LWxlZnQpOy0taW9uLXNhZmUtYXJlYS1yaWdodDogY29uc3RhbnQoc2FmZS1hcmVhLWluc2V0LXJpZ2h0KX19QHN1cHBvcnRzIChwYWRkaW5nLXRvcDogZW52KHNhZmUtYXJlYS1pbnNldC10b3ApKXtodG1sey0taW9uLXNhZmUtYXJlYS10b3A6IGVudihzYWZlLWFyZWEtaW5zZXQtdG9wKTstLWlvbi1zYWZlLWFyZWEtYm90dG9tOiBlbnYoc2FmZS1hcmVhLWluc2V0LWJvdHRvbSk7LS1pb24tc2FmZS1hcmVhLWxlZnQ6IGVudihzYWZlLWFyZWEtaW5zZXQtbGVmdCk7LS1pb24tc2FmZS1hcmVhLXJpZ2h0OiBlbnYoc2FmZS1hcmVhLWluc2V0LXJpZ2h0KX19XG4iLCJhdWRpbyxjYW52YXMscHJvZ3Jlc3MsdmlkZW97dmVydGljYWwtYWxpZ246YmFzZWxpbmV9YXVkaW86bm90KFtjb250cm9sc10pe2Rpc3BsYXk6bm9uZTtoZWlnaHQ6MH1iLHN0cm9uZ3tmb250LXdlaWdodDpib2xkfWltZ3ttYXgtd2lkdGg6MTAwJTtib3JkZXI6MH1zdmc6bm90KDpyb290KXtvdmVyZmxvdzpoaWRkZW59ZmlndXJle21hcmdpbjoxZW0gNDBweH1ocntoZWlnaHQ6MXB4O2JvcmRlci13aWR0aDowO2JveC1zaXppbmc6Y29udGVudC1ib3h9cHJle292ZXJmbG93OmF1dG99Y29kZSxrYmQscHJlLHNhbXB7Zm9udC1mYW1pbHk6bW9ub3NwYWNlLCBtb25vc3BhY2U7Zm9udC1zaXplOjFlbX1sYWJlbCxpbnB1dCxzZWxlY3QsdGV4dGFyZWF7Zm9udC1mYW1pbHk6aW5oZXJpdDtsaW5lLWhlaWdodDpub3JtYWx9dGV4dGFyZWF7b3ZlcmZsb3c6YXV0bztoZWlnaHQ6YXV0bztmb250OmluaGVyaXQ7Y29sb3I6aW5oZXJpdH10ZXh0YXJlYTo6cGxhY2Vob2xkZXJ7cGFkZGluZy1sZWZ0OjJweH1mb3JtLGlucHV0LG9wdGdyb3VwLHNlbGVjdHttYXJnaW46MDtmb250OmluaGVyaXQ7Y29sb3I6aW5oZXJpdH1odG1sIGlucHV0W3R5cGU9XCJidXR0b25cIl0saW5wdXRbdHlwZT1cInJlc2V0XCJdLGlucHV0W3R5cGU9XCJzdWJtaXRcIl17Y3Vyc29yOnBvaW50ZXI7LXdlYmtpdC1hcHBlYXJhbmNlOmJ1dHRvbn1hLGEgZGl2LGEgc3BhbixhIGlvbi1pY29uLGEgaW9uLWxhYmVsLGJ1dHRvbixidXR0b24gZGl2LGJ1dHRvbiBzcGFuLGJ1dHRvbiBpb24taWNvbixidXR0b24gaW9uLWxhYmVsLC5pb24tdGFwcGFibGUsW3RhcHBhYmxlXSxbdGFwcGFibGVdIGRpdixbdGFwcGFibGVdIHNwYW4sW3RhcHBhYmxlXSBpb24taWNvbixbdGFwcGFibGVdIGlvbi1sYWJlbCxpbnB1dCx0ZXh0YXJlYXt0b3VjaC1hY3Rpb246bWFuaXB1bGF0aW9ufWEgaW9uLWxhYmVsLGJ1dHRvbiBpb24tbGFiZWx7cG9pbnRlci1ldmVudHM6bm9uZX1idXR0b257Ym9yZGVyOjA7Ym9yZGVyLXJhZGl1czowO2ZvbnQtZmFtaWx5OmluaGVyaXQ7Zm9udC1zdHlsZTppbmhlcml0O2ZvbnQtdmFyaWFudDppbmhlcml0O2xpbmUtaGVpZ2h0OjE7dGV4dC10cmFuc2Zvcm06bm9uZTtjdXJzb3I6cG9pbnRlcjstd2Via2l0LWFwcGVhcmFuY2U6YnV0dG9ufVt0YXBwYWJsZV17Y3Vyc29yOnBvaW50ZXJ9YVtkaXNhYmxlZF0sYnV0dG9uW2Rpc2FibGVkXSxodG1sIGlucHV0W2Rpc2FibGVkXXtjdXJzb3I6ZGVmYXVsdH1idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsaW5wdXQ6Oi1tb3otZm9jdXMtaW5uZXJ7cGFkZGluZzowO2JvcmRlcjowfWlucHV0W3R5cGU9XCJjaGVja2JveFwiXSxpbnB1dFt0eXBlPVwicmFkaW9cIl17cGFkZGluZzowO2JveC1zaXppbmc6Ym9yZGVyLWJveH1pbnB1dFt0eXBlPVwibnVtYmVyXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLGlucHV0W3R5cGU9XCJudW1iZXJcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b257aGVpZ2h0OmF1dG99aW5wdXRbdHlwZT1cInNlYXJjaFwiXTo6LXdlYmtpdC1zZWFyY2gtY2FuY2VsLWJ1dHRvbixpbnB1dFt0eXBlPVwic2VhcmNoXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uey13ZWJraXQtYXBwZWFyYW5jZTpub25lfXRhYmxle2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTtib3JkZXItc3BhY2luZzowfXRkLHRoe3BhZGRpbmc6MH1cbiIsIip7Ym94LXNpemluZzpib3JkZXItYm94Oy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjp0cmFuc3BhcmVudDstd2Via2l0LXRvdWNoLWNhbGxvdXQ6bm9uZX1odG1se3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7dGV4dC1zaXplLWFkanVzdDoxMDAlfWh0bWwucGx0LXB3YXtoZWlnaHQ6MTAwdmh9Ym9keXstbW96LW9zeC1mb250LXNtb290aGluZzpncmF5c2NhbGU7LXdlYmtpdC1mb250LXNtb290aGluZzphbnRpYWxpYXNlZDttYXJnaW4tbGVmdDowO21hcmdpbi1yaWdodDowO21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjA7cGFkZGluZy1sZWZ0OjA7cGFkZGluZy1yaWdodDowO3BhZGRpbmctdG9wOjA7cGFkZGluZy1ib3R0b206MDtwb3NpdGlvbjpmaXhlZDt3aWR0aDoxMDAlO21heC13aWR0aDoxMDAlO2hlaWdodDoxMDAlO21heC1oZWlnaHQ6MTAwJTt0ZXh0LXJlbmRlcmluZzpvcHRpbWl6ZUxlZ2liaWxpdHk7b3ZlcmZsb3c6aGlkZGVuO3RvdWNoLWFjdGlvbjptYW5pcHVsYXRpb247LXdlYmtpdC11c2VyLWRyYWc6bm9uZTstbXMtY29udGVudC16b29taW5nOm5vbmU7d29yZC13cmFwOmJyZWFrLXdvcmQ7b3ZlcnNjcm9sbC1iZWhhdmlvci15Om5vbmU7dGV4dC1zaXplLWFkanVzdDpub25lfVxuIiwiaHRtbHtmb250LWZhbWlseTp2YXIoLS1pb24tZm9udC1mYW1pbHkpfWF7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtjb2xvcjp2YXIoLS1pb24tY29sb3ItcHJpbWFyeSwgIzM4ODBmZil9aDEsaDIsaDMsaDQsaDUsaDZ7bWFyZ2luLXRvcDoxNnB4O21hcmdpbi1ib3R0b206MTBweDtmb250LXdlaWdodDo1MDA7bGluZS1oZWlnaHQ6MS4yfWgxe21hcmdpbi10b3A6MjBweDtmb250LXNpemU6MjZweH1oMnttYXJnaW4tdG9wOjE4cHg7Zm9udC1zaXplOjI0cHh9aDN7Zm9udC1zaXplOjIycHh9aDR7Zm9udC1zaXplOjIwcHh9aDV7Zm9udC1zaXplOjE4cHh9aDZ7Zm9udC1zaXplOjE2cHh9c21hbGx7Zm9udC1zaXplOjc1JX1zdWIsc3Vwe3Bvc2l0aW9uOnJlbGF0aXZlO2ZvbnQtc2l6ZTo3NSU7bGluZS1oZWlnaHQ6MDt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZX1zdXB7dG9wOi0uNWVtfXN1Yntib3R0b206LS4yNWVtfVxuIiwiLmlvbi1oaWRle2Rpc3BsYXk6bm9uZSAhaW1wb3J0YW50fS5pb24taGlkZS11cHtkaXNwbGF5Om5vbmUgIWltcG9ydGFudH1AbWVkaWEgKG1heC13aWR0aDogNTc1cHgpey5pb24taGlkZS1kb3due2Rpc3BsYXk6bm9uZSAhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDogNTc2cHgpey5pb24taGlkZS1zbS11cHtkaXNwbGF5Om5vbmUgIWltcG9ydGFudH19QG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KXsuaW9uLWhpZGUtc20tZG93bntkaXNwbGF5Om5vbmUgIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KXsuaW9uLWhpZGUtbWQtdXB7ZGlzcGxheTpub25lICFpbXBvcnRhbnR9fUBtZWRpYSAobWF4LXdpZHRoOiA5OTFweCl7Lmlvbi1oaWRlLW1kLWRvd257ZGlzcGxheTpub25lICFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOiA5OTJweCl7Lmlvbi1oaWRlLWxnLXVwe2Rpc3BsYXk6bm9uZSAhaW1wb3J0YW50fX1AbWVkaWEgKG1heC13aWR0aDogMTE5OXB4KXsuaW9uLWhpZGUtbGctZG93bntkaXNwbGF5Om5vbmUgIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCl7Lmlvbi1oaWRlLXhsLXVwe2Rpc3BsYXk6bm9uZSAhaW1wb3J0YW50fX0uaW9uLWhpZGUteGwtZG93bntkaXNwbGF5Om5vbmUgIWltcG9ydGFudH1cbiIsIi5pb24tbm8tcGFkZGluZyxbbm8tcGFkZGluZ117LS1wYWRkaW5nLXN0YXJ0OiAwOy0tcGFkZGluZy1lbmQ6IDA7LS1wYWRkaW5nLXRvcDogMDstLXBhZGRpbmctYm90dG9tOiAwO3BhZGRpbmctbGVmdDowO3BhZGRpbmctcmlnaHQ6MDtwYWRkaW5nLXRvcDowO3BhZGRpbmctYm90dG9tOjB9Lmlvbi1wYWRkaW5nLFtwYWRkaW5nXXstLXBhZGRpbmctc3RhcnQ6IHZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTstLXBhZGRpbmctZW5kOiB2YXIoLS1pb24tcGFkZGluZywgMTZweCk7LS1wYWRkaW5nLXRvcDogdmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpOy0tcGFkZGluZy1ib3R0b206IHZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTtwYWRkaW5nLWxlZnQ6dmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpO3BhZGRpbmctcmlnaHQ6dmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpO3BhZGRpbmctdG9wOnZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTtwYWRkaW5nLWJvdHRvbTp2YXIoLS1pb24tcGFkZGluZywgMTZweCl9QHN1cHBvcnRzIChtYXJnaW4taW5saW5lLXN0YXJ0OiAwKSBvciAoLXdlYmtpdC1tYXJnaW4tc3RhcnQ6IDApey5pb24tcGFkZGluZyxbcGFkZGluZ117cGFkZGluZy1sZWZ0OnVuc2V0O3BhZGRpbmctcmlnaHQ6dW5zZXQ7LXdlYmtpdC1wYWRkaW5nLXN0YXJ0OnZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTtwYWRkaW5nLWlubGluZS1zdGFydDp2YXIoLS1pb24tcGFkZGluZywgMTZweCk7LXdlYmtpdC1wYWRkaW5nLWVuZDp2YXIoLS1pb24tcGFkZGluZywgMTZweCk7cGFkZGluZy1pbmxpbmUtZW5kOnZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KX19Lmlvbi1wYWRkaW5nLXRvcCxbcGFkZGluZy10b3Bdey0tcGFkZGluZy10b3A6IHZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTtwYWRkaW5nLXRvcDp2YXIoLS1pb24tcGFkZGluZywgMTZweCl9Lmlvbi1wYWRkaW5nLXN0YXJ0LFtwYWRkaW5nLXN0YXJ0XXstLXBhZGRpbmctc3RhcnQ6IHZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTtwYWRkaW5nLWxlZnQ6dmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpfUBzdXBwb3J0cyAobWFyZ2luLWlubGluZS1zdGFydDogMCkgb3IgKC13ZWJraXQtbWFyZ2luLXN0YXJ0OiAwKXsuaW9uLXBhZGRpbmctc3RhcnQsW3BhZGRpbmctc3RhcnRde3BhZGRpbmctbGVmdDp1bnNldDstd2Via2l0LXBhZGRpbmctc3RhcnQ6dmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpO3BhZGRpbmctaW5saW5lLXN0YXJ0OnZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KX19Lmlvbi1wYWRkaW5nLWVuZCxbcGFkZGluZy1lbmRdey0tcGFkZGluZy1lbmQ6IHZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTtwYWRkaW5nLXJpZ2h0OnZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KX1Ac3VwcG9ydHMgKG1hcmdpbi1pbmxpbmUtc3RhcnQ6IDApIG9yICgtd2Via2l0LW1hcmdpbi1zdGFydDogMCl7Lmlvbi1wYWRkaW5nLWVuZCxbcGFkZGluZy1lbmRde3BhZGRpbmctcmlnaHQ6dW5zZXQ7LXdlYmtpdC1wYWRkaW5nLWVuZDp2YXIoLS1pb24tcGFkZGluZywgMTZweCk7cGFkZGluZy1pbmxpbmUtZW5kOnZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KX19Lmlvbi1wYWRkaW5nLWJvdHRvbSxbcGFkZGluZy1ib3R0b21dey0tcGFkZGluZy1ib3R0b206IHZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTtwYWRkaW5nLWJvdHRvbTp2YXIoLS1pb24tcGFkZGluZywgMTZweCl9Lmlvbi1wYWRkaW5nLXZlcnRpY2FsLFtwYWRkaW5nLXZlcnRpY2FsXXstLXBhZGRpbmctdG9wOiB2YXIoLS1pb24tcGFkZGluZywgMTZweCk7LS1wYWRkaW5nLWJvdHRvbTogdmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpO3BhZGRpbmctdG9wOnZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTtwYWRkaW5nLWJvdHRvbTp2YXIoLS1pb24tcGFkZGluZywgMTZweCl9Lmlvbi1wYWRkaW5nLWhvcml6b250YWwsW3BhZGRpbmctaG9yaXpvbnRhbF17LS1wYWRkaW5nLXN0YXJ0OiB2YXIoLS1pb24tcGFkZGluZywgMTZweCk7LS1wYWRkaW5nLWVuZDogdmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpO3BhZGRpbmctbGVmdDp2YXIoLS1pb24tcGFkZGluZywgMTZweCk7cGFkZGluZy1yaWdodDp2YXIoLS1pb24tcGFkZGluZywgMTZweCl9QHN1cHBvcnRzIChtYXJnaW4taW5saW5lLXN0YXJ0OiAwKSBvciAoLXdlYmtpdC1tYXJnaW4tc3RhcnQ6IDApey5pb24tcGFkZGluZy1ob3Jpem9udGFsLFtwYWRkaW5nLWhvcml6b250YWxde3BhZGRpbmctbGVmdDp1bnNldDtwYWRkaW5nLXJpZ2h0OnVuc2V0Oy13ZWJraXQtcGFkZGluZy1zdGFydDp2YXIoLS1pb24tcGFkZGluZywgMTZweCk7cGFkZGluZy1pbmxpbmUtc3RhcnQ6dmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpOy13ZWJraXQtcGFkZGluZy1lbmQ6dmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpO3BhZGRpbmctaW5saW5lLWVuZDp2YXIoLS1pb24tcGFkZGluZywgMTZweCl9fS5pb24tbm8tbWFyZ2luLFtuby1tYXJnaW5dey0tbWFyZ2luLXN0YXJ0OiAwOy0tbWFyZ2luLWVuZDogMDstLW1hcmdpbi10b3A6IDA7LS1tYXJnaW4tYm90dG9tOiAwO21hcmdpbi1sZWZ0OjA7bWFyZ2luLXJpZ2h0OjA7bWFyZ2luLXRvcDowO21hcmdpbi1ib3R0b206MH0uaW9uLW1hcmdpbixbbWFyZ2luXXstLW1hcmdpbi1zdGFydDogdmFyKC0taW9uLW1hcmdpbiwgMTZweCk7LS1tYXJnaW4tZW5kOiB2YXIoLS1pb24tbWFyZ2luLCAxNnB4KTstLW1hcmdpbi10b3A6IHZhcigtLWlvbi1tYXJnaW4sIDE2cHgpOy0tbWFyZ2luLWJvdHRvbTogdmFyKC0taW9uLW1hcmdpbiwgMTZweCk7bWFyZ2luLWxlZnQ6dmFyKC0taW9uLW1hcmdpbiwgMTZweCk7bWFyZ2luLXJpZ2h0OnZhcigtLWlvbi1tYXJnaW4sIDE2cHgpO21hcmdpbi10b3A6dmFyKC0taW9uLW1hcmdpbiwgMTZweCk7bWFyZ2luLWJvdHRvbTp2YXIoLS1pb24tbWFyZ2luLCAxNnB4KX1Ac3VwcG9ydHMgKG1hcmdpbi1pbmxpbmUtc3RhcnQ6IDApIG9yICgtd2Via2l0LW1hcmdpbi1zdGFydDogMCl7Lmlvbi1tYXJnaW4sW21hcmdpbl17bWFyZ2luLWxlZnQ6dW5zZXQ7bWFyZ2luLXJpZ2h0OnVuc2V0Oy13ZWJraXQtbWFyZ2luLXN0YXJ0OnZhcigtLWlvbi1tYXJnaW4sIDE2cHgpO21hcmdpbi1pbmxpbmUtc3RhcnQ6dmFyKC0taW9uLW1hcmdpbiwgMTZweCk7LXdlYmtpdC1tYXJnaW4tZW5kOnZhcigtLWlvbi1tYXJnaW4sIDE2cHgpO21hcmdpbi1pbmxpbmUtZW5kOnZhcigtLWlvbi1tYXJnaW4sIDE2cHgpfX0uaW9uLW1hcmdpbi10b3AsW21hcmdpbi10b3Bdey0tbWFyZ2luLXRvcDogdmFyKC0taW9uLW1hcmdpbiwgMTZweCk7bWFyZ2luLXRvcDp2YXIoLS1pb24tbWFyZ2luLCAxNnB4KX0uaW9uLW1hcmdpbi1zdGFydCxbbWFyZ2luLXN0YXJ0XXstLW1hcmdpbi1zdGFydDogdmFyKC0taW9uLW1hcmdpbiwgMTZweCk7bWFyZ2luLWxlZnQ6dmFyKC0taW9uLW1hcmdpbiwgMTZweCl9QHN1cHBvcnRzIChtYXJnaW4taW5saW5lLXN0YXJ0OiAwKSBvciAoLXdlYmtpdC1tYXJnaW4tc3RhcnQ6IDApey5pb24tbWFyZ2luLXN0YXJ0LFttYXJnaW4tc3RhcnRde21hcmdpbi1sZWZ0OnVuc2V0Oy13ZWJraXQtbWFyZ2luLXN0YXJ0OnZhcigtLWlvbi1tYXJnaW4sIDE2cHgpO21hcmdpbi1pbmxpbmUtc3RhcnQ6dmFyKC0taW9uLW1hcmdpbiwgMTZweCl9fS5pb24tbWFyZ2luLWVuZCxbbWFyZ2luLWVuZF17LS1tYXJnaW4tZW5kOiB2YXIoLS1pb24tbWFyZ2luLCAxNnB4KTttYXJnaW4tcmlnaHQ6dmFyKC0taW9uLW1hcmdpbiwgMTZweCl9QHN1cHBvcnRzIChtYXJnaW4taW5saW5lLXN0YXJ0OiAwKSBvciAoLXdlYmtpdC1tYXJnaW4tc3RhcnQ6IDApey5pb24tbWFyZ2luLWVuZCxbbWFyZ2luLWVuZF17bWFyZ2luLXJpZ2h0OnVuc2V0Oy13ZWJraXQtbWFyZ2luLWVuZDp2YXIoLS1pb24tbWFyZ2luLCAxNnB4KTttYXJnaW4taW5saW5lLWVuZDp2YXIoLS1pb24tbWFyZ2luLCAxNnB4KX19Lmlvbi1tYXJnaW4tYm90dG9tLFttYXJnaW4tYm90dG9tXXstLW1hcmdpbi1ib3R0b206IHZhcigtLWlvbi1tYXJnaW4sIDE2cHgpO21hcmdpbi1ib3R0b206dmFyKC0taW9uLW1hcmdpbiwgMTZweCl9Lmlvbi1tYXJnaW4tdmVydGljYWwsW21hcmdpbi12ZXJ0aWNhbF17LS1tYXJnaW4tdG9wOiB2YXIoLS1pb24tbWFyZ2luLCAxNnB4KTstLW1hcmdpbi1ib3R0b206IHZhcigtLWlvbi1tYXJnaW4sIDE2cHgpO21hcmdpbi10b3A6dmFyKC0taW9uLW1hcmdpbiwgMTZweCk7bWFyZ2luLWJvdHRvbTp2YXIoLS1pb24tbWFyZ2luLCAxNnB4KX0uaW9uLW1hcmdpbi1ob3Jpem9udGFsLFttYXJnaW4taG9yaXpvbnRhbF17LS1tYXJnaW4tc3RhcnQ6IHZhcigtLWlvbi1tYXJnaW4sIDE2cHgpOy0tbWFyZ2luLWVuZDogdmFyKC0taW9uLW1hcmdpbiwgMTZweCk7bWFyZ2luLWxlZnQ6dmFyKC0taW9uLW1hcmdpbiwgMTZweCk7bWFyZ2luLXJpZ2h0OnZhcigtLWlvbi1tYXJnaW4sIDE2cHgpfUBzdXBwb3J0cyAobWFyZ2luLWlubGluZS1zdGFydDogMCkgb3IgKC13ZWJraXQtbWFyZ2luLXN0YXJ0OiAwKXsuaW9uLW1hcmdpbi1ob3Jpem9udGFsLFttYXJnaW4taG9yaXpvbnRhbF17bWFyZ2luLWxlZnQ6dW5zZXQ7bWFyZ2luLXJpZ2h0OnVuc2V0Oy13ZWJraXQtbWFyZ2luLXN0YXJ0OnZhcigtLWlvbi1tYXJnaW4sIDE2cHgpO21hcmdpbi1pbmxpbmUtc3RhcnQ6dmFyKC0taW9uLW1hcmdpbiwgMTZweCk7LXdlYmtpdC1tYXJnaW4tZW5kOnZhcigtLWlvbi1tYXJnaW4sIDE2cHgpO21hcmdpbi1pbmxpbmUtZW5kOnZhcigtLWlvbi1tYXJnaW4sIDE2cHgpfX1cbiIsIi5pb24tZmxvYXQtbGVmdCxbZmxvYXQtbGVmdF17ZmxvYXQ6bGVmdCAhaW1wb3J0YW50fS5pb24tZmxvYXQtcmlnaHQsW2Zsb2F0LXJpZ2h0XXtmbG9hdDpyaWdodCAhaW1wb3J0YW50fS5pb24tZmxvYXQtc3RhcnQsW2Zsb2F0LXN0YXJ0XXtmbG9hdDpsZWZ0ICFpbXBvcnRhbnR9Omhvc3QtY29udGV4dChbZGlyPXJ0bF0pIC5pb24tZmxvYXQtc3RhcnQsOmhvc3QtY29udGV4dChbZGlyPXJ0bF0pIFtmbG9hdC1zdGFydF17ZmxvYXQ6cmlnaHQgIWltcG9ydGFudH0uaW9uLWZsb2F0LWVuZCxbZmxvYXQtZW5kXXtmbG9hdDpyaWdodCAhaW1wb3J0YW50fTpob3N0LWNvbnRleHQoW2Rpcj1ydGxdKSAuaW9uLWZsb2F0LWVuZCw6aG9zdC1jb250ZXh0KFtkaXI9cnRsXSkgW2Zsb2F0LWVuZF17ZmxvYXQ6bGVmdCAhaW1wb3J0YW50fUBtZWRpYSAobWluLXdpZHRoOiA1NzZweCl7Lmlvbi1mbG9hdC1zbS1sZWZ0LFtmbG9hdC1zbS1sZWZ0XXtmbG9hdDpsZWZ0ICFpbXBvcnRhbnR9Lmlvbi1mbG9hdC1zbS1yaWdodCxbZmxvYXQtc20tcmlnaHRde2Zsb2F0OnJpZ2h0ICFpbXBvcnRhbnR9Lmlvbi1mbG9hdC1zbS1zdGFydCxbZmxvYXQtc20tc3RhcnRde2Zsb2F0OmxlZnQgIWltcG9ydGFudH06aG9zdC1jb250ZXh0KFtkaXI9cnRsXSkgLmlvbi1mbG9hdC1zbS1zdGFydCw6aG9zdC1jb250ZXh0KFtkaXI9cnRsXSkgW2Zsb2F0LXNtLXN0YXJ0XXtmbG9hdDpyaWdodCAhaW1wb3J0YW50fS5pb24tZmxvYXQtc20tZW5kLFtmbG9hdC1zbS1lbmRde2Zsb2F0OnJpZ2h0ICFpbXBvcnRhbnR9Omhvc3QtY29udGV4dChbZGlyPXJ0bF0pIC5pb24tZmxvYXQtc20tZW5kLDpob3N0LWNvbnRleHQoW2Rpcj1ydGxdKSBbZmxvYXQtc20tZW5kXXtmbG9hdDpsZWZ0ICFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOiA3NjhweCl7Lmlvbi1mbG9hdC1tZC1sZWZ0LFtmbG9hdC1tZC1sZWZ0XXtmbG9hdDpsZWZ0ICFpbXBvcnRhbnR9Lmlvbi1mbG9hdC1tZC1yaWdodCxbZmxvYXQtbWQtcmlnaHRde2Zsb2F0OnJpZ2h0ICFpbXBvcnRhbnR9Lmlvbi1mbG9hdC1tZC1zdGFydCxbZmxvYXQtbWQtc3RhcnRde2Zsb2F0OmxlZnQgIWltcG9ydGFudH06aG9zdC1jb250ZXh0KFtkaXI9cnRsXSkgLmlvbi1mbG9hdC1tZC1zdGFydCw6aG9zdC1jb250ZXh0KFtkaXI9cnRsXSkgW2Zsb2F0LW1kLXN0YXJ0XXtmbG9hdDpyaWdodCAhaW1wb3J0YW50fS5pb24tZmxvYXQtbWQtZW5kLFtmbG9hdC1tZC1lbmRde2Zsb2F0OnJpZ2h0ICFpbXBvcnRhbnR9Omhvc3QtY29udGV4dChbZGlyPXJ0bF0pIC5pb24tZmxvYXQtbWQtZW5kLDpob3N0LWNvbnRleHQoW2Rpcj1ydGxdKSBbZmxvYXQtbWQtZW5kXXtmbG9hdDpsZWZ0ICFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOiA5OTJweCl7Lmlvbi1mbG9hdC1sZy1sZWZ0LFtmbG9hdC1sZy1sZWZ0XXtmbG9hdDpsZWZ0ICFpbXBvcnRhbnR9Lmlvbi1mbG9hdC1sZy1yaWdodCxbZmxvYXQtbGctcmlnaHRde2Zsb2F0OnJpZ2h0ICFpbXBvcnRhbnR9Lmlvbi1mbG9hdC1sZy1zdGFydCxbZmxvYXQtbGctc3RhcnRde2Zsb2F0OmxlZnQgIWltcG9ydGFudH06aG9zdC1jb250ZXh0KFtkaXI9cnRsXSkgLmlvbi1mbG9hdC1sZy1zdGFydCw6aG9zdC1jb250ZXh0KFtkaXI9cnRsXSkgW2Zsb2F0LWxnLXN0YXJ0XXtmbG9hdDpyaWdodCAhaW1wb3J0YW50fS5pb24tZmxvYXQtbGctZW5kLFtmbG9hdC1sZy1lbmRde2Zsb2F0OnJpZ2h0ICFpbXBvcnRhbnR9Omhvc3QtY29udGV4dChbZGlyPXJ0bF0pIC5pb24tZmxvYXQtbGctZW5kLDpob3N0LWNvbnRleHQoW2Rpcj1ydGxdKSBbZmxvYXQtbGctZW5kXXtmbG9hdDpsZWZ0ICFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOiAxMjAwcHgpey5pb24tZmxvYXQteGwtbGVmdCxbZmxvYXQteGwtbGVmdF17ZmxvYXQ6bGVmdCAhaW1wb3J0YW50fS5pb24tZmxvYXQteGwtcmlnaHQsW2Zsb2F0LXhsLXJpZ2h0XXtmbG9hdDpyaWdodCAhaW1wb3J0YW50fS5pb24tZmxvYXQteGwtc3RhcnQsW2Zsb2F0LXhsLXN0YXJ0XXtmbG9hdDpsZWZ0ICFpbXBvcnRhbnR9Omhvc3QtY29udGV4dChbZGlyPXJ0bF0pIC5pb24tZmxvYXQteGwtc3RhcnQsOmhvc3QtY29udGV4dChbZGlyPXJ0bF0pIFtmbG9hdC14bC1zdGFydF17ZmxvYXQ6cmlnaHQgIWltcG9ydGFudH0uaW9uLWZsb2F0LXhsLWVuZCxbZmxvYXQteGwtZW5kXXtmbG9hdDpyaWdodCAhaW1wb3J0YW50fTpob3N0LWNvbnRleHQoW2Rpcj1ydGxdKSAuaW9uLWZsb2F0LXhsLWVuZCw6aG9zdC1jb250ZXh0KFtkaXI9cnRsXSkgW2Zsb2F0LXhsLWVuZF17ZmxvYXQ6bGVmdCAhaW1wb3J0YW50fX1cbiIsIi5pb24tdGV4dC1jZW50ZXIsW3RleHQtY2VudGVyXXt0ZXh0LWFsaWduOmNlbnRlciAhaW1wb3J0YW50fS5pb24tdGV4dC1qdXN0aWZ5LFt0ZXh0LWp1c3RpZnlde3RleHQtYWxpZ246anVzdGlmeSAhaW1wb3J0YW50fS5pb24tdGV4dC1zdGFydCxbdGV4dC1zdGFydF17dGV4dC1hbGlnbjpzdGFydCAhaW1wb3J0YW50fS5pb24tdGV4dC1lbmQsW3RleHQtZW5kXXt0ZXh0LWFsaWduOmVuZCAhaW1wb3J0YW50fS5pb24tdGV4dC1sZWZ0LFt0ZXh0LWxlZnRde3RleHQtYWxpZ246bGVmdCAhaW1wb3J0YW50fS5pb24tdGV4dC1yaWdodCxbdGV4dC1yaWdodF17dGV4dC1hbGlnbjpyaWdodCAhaW1wb3J0YW50fS5pb24tdGV4dC1ub3dyYXAsW3RleHQtbm93cmFwXXt3aGl0ZS1zcGFjZTpub3dyYXAgIWltcG9ydGFudH0uaW9uLXRleHQtd3JhcCxbdGV4dC13cmFwXXt3aGl0ZS1zcGFjZTpub3JtYWwgIWltcG9ydGFudH1AbWVkaWEgKG1pbi13aWR0aDogNTc2cHgpey5pb24tdGV4dC1zbS1jZW50ZXIsW3RleHQtc20tY2VudGVyXXt0ZXh0LWFsaWduOmNlbnRlciAhaW1wb3J0YW50fS5pb24tdGV4dC1zbS1qdXN0aWZ5LFt0ZXh0LXNtLWp1c3RpZnlde3RleHQtYWxpZ246anVzdGlmeSAhaW1wb3J0YW50fS5pb24tdGV4dC1zbS1zdGFydCxbdGV4dC1zbS1zdGFydF17dGV4dC1hbGlnbjpzdGFydCAhaW1wb3J0YW50fS5pb24tdGV4dC1zbS1lbmQsW3RleHQtc20tZW5kXXt0ZXh0LWFsaWduOmVuZCAhaW1wb3J0YW50fS5pb24tdGV4dC1zbS1sZWZ0LFt0ZXh0LXNtLWxlZnRde3RleHQtYWxpZ246bGVmdCAhaW1wb3J0YW50fS5pb24tdGV4dC1zbS1yaWdodCxbdGV4dC1zbS1yaWdodF17dGV4dC1hbGlnbjpyaWdodCAhaW1wb3J0YW50fS5pb24tdGV4dC1zbS1ub3dyYXAsW3RleHQtc20tbm93cmFwXXt3aGl0ZS1zcGFjZTpub3dyYXAgIWltcG9ydGFudH0uaW9uLXRleHQtc20td3JhcCxbdGV4dC1zbS13cmFwXXt3aGl0ZS1zcGFjZTpub3JtYWwgIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KXsuaW9uLXRleHQtbWQtY2VudGVyLFt0ZXh0LW1kLWNlbnRlcl17dGV4dC1hbGlnbjpjZW50ZXIgIWltcG9ydGFudH0uaW9uLXRleHQtbWQtanVzdGlmeSxbdGV4dC1tZC1qdXN0aWZ5XXt0ZXh0LWFsaWduOmp1c3RpZnkgIWltcG9ydGFudH0uaW9uLXRleHQtbWQtc3RhcnQsW3RleHQtbWQtc3RhcnRde3RleHQtYWxpZ246c3RhcnQgIWltcG9ydGFudH0uaW9uLXRleHQtbWQtZW5kLFt0ZXh0LW1kLWVuZF17dGV4dC1hbGlnbjplbmQgIWltcG9ydGFudH0uaW9uLXRleHQtbWQtbGVmdCxbdGV4dC1tZC1sZWZ0XXt0ZXh0LWFsaWduOmxlZnQgIWltcG9ydGFudH0uaW9uLXRleHQtbWQtcmlnaHQsW3RleHQtbWQtcmlnaHRde3RleHQtYWxpZ246cmlnaHQgIWltcG9ydGFudH0uaW9uLXRleHQtbWQtbm93cmFwLFt0ZXh0LW1kLW5vd3JhcF17d2hpdGUtc3BhY2U6bm93cmFwICFpbXBvcnRhbnR9Lmlvbi10ZXh0LW1kLXdyYXAsW3RleHQtbWQtd3JhcF17d2hpdGUtc3BhY2U6bm9ybWFsICFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOiA5OTJweCl7Lmlvbi10ZXh0LWxnLWNlbnRlcixbdGV4dC1sZy1jZW50ZXJde3RleHQtYWxpZ246Y2VudGVyICFpbXBvcnRhbnR9Lmlvbi10ZXh0LWxnLWp1c3RpZnksW3RleHQtbGctanVzdGlmeV17dGV4dC1hbGlnbjpqdXN0aWZ5ICFpbXBvcnRhbnR9Lmlvbi10ZXh0LWxnLXN0YXJ0LFt0ZXh0LWxnLXN0YXJ0XXt0ZXh0LWFsaWduOnN0YXJ0ICFpbXBvcnRhbnR9Lmlvbi10ZXh0LWxnLWVuZCxbdGV4dC1sZy1lbmRde3RleHQtYWxpZ246ZW5kICFpbXBvcnRhbnR9Lmlvbi10ZXh0LWxnLWxlZnQsW3RleHQtbGctbGVmdF17dGV4dC1hbGlnbjpsZWZ0ICFpbXBvcnRhbnR9Lmlvbi10ZXh0LWxnLXJpZ2h0LFt0ZXh0LWxnLXJpZ2h0XXt0ZXh0LWFsaWduOnJpZ2h0ICFpbXBvcnRhbnR9Lmlvbi10ZXh0LWxnLW5vd3JhcCxbdGV4dC1sZy1ub3dyYXBde3doaXRlLXNwYWNlOm5vd3JhcCAhaW1wb3J0YW50fS5pb24tdGV4dC1sZy13cmFwLFt0ZXh0LWxnLXdyYXBde3doaXRlLXNwYWNlOm5vcm1hbCAhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDogMTIwMHB4KXsuaW9uLXRleHQteGwtY2VudGVyLFt0ZXh0LXhsLWNlbnRlcl17dGV4dC1hbGlnbjpjZW50ZXIgIWltcG9ydGFudH0uaW9uLXRleHQteGwtanVzdGlmeSxbdGV4dC14bC1qdXN0aWZ5XXt0ZXh0LWFsaWduOmp1c3RpZnkgIWltcG9ydGFudH0uaW9uLXRleHQteGwtc3RhcnQsW3RleHQteGwtc3RhcnRde3RleHQtYWxpZ246c3RhcnQgIWltcG9ydGFudH0uaW9uLXRleHQteGwtZW5kLFt0ZXh0LXhsLWVuZF17dGV4dC1hbGlnbjplbmQgIWltcG9ydGFudH0uaW9uLXRleHQteGwtbGVmdCxbdGV4dC14bC1sZWZ0XXt0ZXh0LWFsaWduOmxlZnQgIWltcG9ydGFudH0uaW9uLXRleHQteGwtcmlnaHQsW3RleHQteGwtcmlnaHRde3RleHQtYWxpZ246cmlnaHQgIWltcG9ydGFudH0uaW9uLXRleHQteGwtbm93cmFwLFt0ZXh0LXhsLW5vd3JhcF17d2hpdGUtc3BhY2U6bm93cmFwICFpbXBvcnRhbnR9Lmlvbi10ZXh0LXhsLXdyYXAsW3RleHQteGwtd3JhcF17d2hpdGUtc3BhY2U6bm9ybWFsICFpbXBvcnRhbnR9fVxuIiwiLmlvbi10ZXh0LXVwcGVyY2FzZSxbdGV4dC11cHBlcmNhc2Vde3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZSAhaW1wb3J0YW50fS5pb24tdGV4dC1sb3dlcmNhc2UsW3RleHQtbG93ZXJjYXNlXXt0ZXh0LXRyYW5zZm9ybTpsb3dlcmNhc2UgIWltcG9ydGFudH0uaW9uLXRleHQtY2FwaXRhbGl6ZSxbdGV4dC1jYXBpdGFsaXplXXt0ZXh0LXRyYW5zZm9ybTpjYXBpdGFsaXplICFpbXBvcnRhbnR9QG1lZGlhIChtaW4td2lkdGg6IDU3NnB4KXsuaW9uLXRleHQtc20tdXBwZXJjYXNlLFt0ZXh0LXNtLXVwcGVyY2FzZV17dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlICFpbXBvcnRhbnR9Lmlvbi10ZXh0LXNtLWxvd2VyY2FzZSxbdGV4dC1zbS1sb3dlcmNhc2Vde3RleHQtdHJhbnNmb3JtOmxvd2VyY2FzZSAhaW1wb3J0YW50fS5pb24tdGV4dC1zbS1jYXBpdGFsaXplLFt0ZXh0LXNtLWNhcGl0YWxpemVde3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemUgIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KXsuaW9uLXRleHQtbWQtdXBwZXJjYXNlLFt0ZXh0LW1kLXVwcGVyY2FzZV17dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlICFpbXBvcnRhbnR9Lmlvbi10ZXh0LW1kLWxvd2VyY2FzZSxbdGV4dC1tZC1sb3dlcmNhc2Vde3RleHQtdHJhbnNmb3JtOmxvd2VyY2FzZSAhaW1wb3J0YW50fS5pb24tdGV4dC1tZC1jYXBpdGFsaXplLFt0ZXh0LW1kLWNhcGl0YWxpemVde3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemUgIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KXsuaW9uLXRleHQtbGctdXBwZXJjYXNlLFt0ZXh0LWxnLXVwcGVyY2FzZV17dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlICFpbXBvcnRhbnR9Lmlvbi10ZXh0LWxnLWxvd2VyY2FzZSxbdGV4dC1sZy1sb3dlcmNhc2Vde3RleHQtdHJhbnNmb3JtOmxvd2VyY2FzZSAhaW1wb3J0YW50fS5pb24tdGV4dC1sZy1jYXBpdGFsaXplLFt0ZXh0LWxnLWNhcGl0YWxpemVde3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemUgIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCl7Lmlvbi10ZXh0LXhsLXVwcGVyY2FzZSxbdGV4dC14bC11cHBlcmNhc2Vde3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZSAhaW1wb3J0YW50fS5pb24tdGV4dC14bC1sb3dlcmNhc2UsW3RleHQteGwtbG93ZXJjYXNlXXt0ZXh0LXRyYW5zZm9ybTpsb3dlcmNhc2UgIWltcG9ydGFudH0uaW9uLXRleHQteGwtY2FwaXRhbGl6ZSxbdGV4dC14bC1jYXBpdGFsaXplXXt0ZXh0LXRyYW5zZm9ybTpjYXBpdGFsaXplICFpbXBvcnRhbnR9fVxuIiwiLmlvbi1hbGlnbi1zZWxmLXN0YXJ0LFthbGlnbi1zZWxmLXN0YXJ0XXthbGlnbi1zZWxmOmZsZXgtc3RhcnQgIWltcG9ydGFudH0uaW9uLWFsaWduLXNlbGYtZW5kLFthbGlnbi1zZWxmLWVuZF17YWxpZ24tc2VsZjpmbGV4LWVuZCAhaW1wb3J0YW50fS5pb24tYWxpZ24tc2VsZi1jZW50ZXIsW2FsaWduLXNlbGYtY2VudGVyXXthbGlnbi1zZWxmOmNlbnRlciAhaW1wb3J0YW50fS5pb24tYWxpZ24tc2VsZi1zdHJldGNoLFthbGlnbi1zZWxmLXN0cmV0Y2hde2FsaWduLXNlbGY6c3RyZXRjaCAhaW1wb3J0YW50fS5pb24tYWxpZ24tc2VsZi1iYXNlbGluZSxbYWxpZ24tc2VsZi1iYXNlbGluZV17YWxpZ24tc2VsZjpiYXNlbGluZSAhaW1wb3J0YW50fS5pb24tYWxpZ24tc2VsZi1hdXRvLFthbGlnbi1zZWxmLWF1dG9de2FsaWduLXNlbGY6YXV0byAhaW1wb3J0YW50fS5pb24td3JhcCxbd3JhcF17ZmxleC13cmFwOndyYXAgIWltcG9ydGFudH0uaW9uLW5vd3JhcCxbbm93cmFwXXtmbGV4LXdyYXA6bm93cmFwICFpbXBvcnRhbnR9Lmlvbi13cmFwLXJldmVyc2UsW3dyYXAtcmV2ZXJzZV17ZmxleC13cmFwOndyYXAtcmV2ZXJzZSAhaW1wb3J0YW50fS5pb24tanVzdGlmeS1jb250ZW50LXN0YXJ0LFtqdXN0aWZ5LWNvbnRlbnQtc3RhcnRde2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0ICFpbXBvcnRhbnR9Lmlvbi1qdXN0aWZ5LWNvbnRlbnQtY2VudGVyLFtqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXXtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyICFpbXBvcnRhbnR9Lmlvbi1qdXN0aWZ5LWNvbnRlbnQtZW5kLFtqdXN0aWZ5LWNvbnRlbnQtZW5kXXtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQgIWltcG9ydGFudH0uaW9uLWp1c3RpZnktY29udGVudC1hcm91bmQsW2p1c3RpZnktY29udGVudC1hcm91bmRde2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmQgIWltcG9ydGFudH0uaW9uLWp1c3RpZnktY29udGVudC1iZXR3ZWVuLFtqdXN0aWZ5LWNvbnRlbnQtYmV0d2Vlbl17anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW4gIWltcG9ydGFudH0uaW9uLWp1c3RpZnktY29udGVudC1ldmVubHksW2p1c3RpZnktY29udGVudC1ldmVubHlde2p1c3RpZnktY29udGVudDpzcGFjZS1ldmVubHkgIWltcG9ydGFudH0uaW9uLWFsaWduLWl0ZW1zLXN0YXJ0LFthbGlnbi1pdGVtcy1zdGFydF17YWxpZ24taXRlbXM6ZmxleC1zdGFydCAhaW1wb3J0YW50fS5pb24tYWxpZ24taXRlbXMtY2VudGVyLFthbGlnbi1pdGVtcy1jZW50ZXJde2FsaWduLWl0ZW1zOmNlbnRlciAhaW1wb3J0YW50fS5pb24tYWxpZ24taXRlbXMtZW5kLFthbGlnbi1pdGVtcy1lbmRde2FsaWduLWl0ZW1zOmZsZXgtZW5kICFpbXBvcnRhbnR9Lmlvbi1hbGlnbi1pdGVtcy1zdHJldGNoLFthbGlnbi1pdGVtcy1zdHJldGNoXXthbGlnbi1pdGVtczpzdHJldGNoICFpbXBvcnRhbnR9Lmlvbi1hbGlnbi1pdGVtcy1iYXNlbGluZSxbYWxpZ24taXRlbXMtYmFzZWxpbmVde2FsaWduLWl0ZW1zOmJhc2VsaW5lICFpbXBvcnRhbnR9XG4iLCIvLyBodHRwOi8vaW9uaWNmcmFtZXdvcmsuY29tL2RvY3MvdGhlbWluZy9cbkBpbXBvcnQgJ35AaW9uaWMvYW5ndWxhci9jc3MvY29yZS5jc3MnO1xuQGltcG9ydCAnfkBpb25pYy9hbmd1bGFyL2Nzcy9ub3JtYWxpemUuY3NzJztcbkBpbXBvcnQgJ35AaW9uaWMvYW5ndWxhci9jc3Mvc3RydWN0dXJlLmNzcyc7XG5AaW1wb3J0ICd+QGlvbmljL2FuZ3VsYXIvY3NzL3R5cG9ncmFwaHkuY3NzJztcbkBpbXBvcnQgJ35AaW9uaWMvYW5ndWxhci9jc3MvZGlzcGxheS5jc3MnO1xuQGltcG9ydCAnfkBpb25pYy9hbmd1bGFyL2Nzcy9wYWRkaW5nLmNzcyc7XG5AaW1wb3J0ICd+QGlvbmljL2FuZ3VsYXIvY3NzL2Zsb2F0LWVsZW1lbnRzLmNzcyc7XG5AaW1wb3J0ICd+QGlvbmljL2FuZ3VsYXIvY3NzL3RleHQtYWxpZ25tZW50LmNzcyc7XG5AaW1wb3J0ICd+QGlvbmljL2FuZ3VsYXIvY3NzL3RleHQtdHJhbnNmb3JtYXRpb24uY3NzJztcbkBpbXBvcnQgJ35AaW9uaWMvYW5ndWxhci9jc3MvZmxleC11dGlscy5jc3MnO1xuXG5AbWl4aW4gY2VudGVyKCRob3Jpem9udGFsOiB0cnVlLCAkdmVydGljYWw6IHRydWUpIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBAaWYgKCRob3Jpem9udGFsIGFuZCAkdmVydGljYWwpIHtcbiAgICB0b3A6IDUwJTtcbiAgICBsZWZ0OiA1MCU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gIH0gQGVsc2UgaWYgKCRob3Jpem9udGFsKSB7XG4gICAgbGVmdDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIDApO1xuICB9IEBlbHNlIGlmICgkdmVydGljYWwpIHtcbiAgICB0b3A6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtNTAlKTtcbiAgfVxufVxuXG5AbWl4aW4gYW5pbWF0aW9uLW5hbWUoJGFuaW5hbWUpIHtcbiAgLW8tYW5pbWF0aW9uLW5hbWU6ICRhbmluYW1lO1xuICAtbXMtYW5pbWF0aW9uLW5hbWU6ICRhbmluYW1lO1xuICAtd2Via2l0LWFuaW1hdGlvbi1uYW1lOiAkYW5pbmFtZTtcbiAgYW5pbWF0aW9uLW5hbWU6ICRhbmluYW1lO1xufVxuXG5AbWl4aW4gYW5pbWF0aW9uLWR1cmF0aW9uKCRkdXJhdGlvbikge1xuICAtby1hbmltYXRpb24tZHVyYXRpb246ICRkdXJhdGlvbjtcbiAgLW1zLWFuaW1hdGlvbi1kdXJhdGlvbjogJGR1cmF0aW9uO1xuICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogJGR1cmF0aW9uO1xuICBhbmltYXRpb24tZHVyYXRpb246ICRkdXJhdGlvbjtcbn1cblxuQG1peGluIGFuaW1hdGlvbi1kdXJhdGlvbigkZHVyYXRpb24pIHtcbiAgLW8tYW5pbWF0aW9uLWR1cmF0aW9uOiAkZHVyYXRpb247XG4gIC1tcy1hbmltYXRpb24tZHVyYXRpb246ICRkdXJhdGlvbjtcbiAgLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246ICRkdXJhdGlvbjtcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAkZHVyYXRpb247XG59XG5cbkBtaXhpbiBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uKCR0aW1pbmcpIHtcbiAgLW8tYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogJHRpbWluZztcbiAgLW1zLWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246ICR0aW1pbmc7XG4gIC13ZWJraXQtYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogJHRpbWluZztcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogJHRpbWluZztcbn1cblxuQG1peGluIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQoJGNvdW50KSB7XG4gIC1vLWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6ICRjb3VudDtcbiAgLW1zLWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6ICRjb3VudDtcbiAgLXdlYmtpdC1hbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiAkY291bnQ7XG4gIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6ICRjb3VudDtcbn1cblxuLmdvLXVwIHtcbiAgQGluY2x1ZGUgYW5pbWF0aW9uLW5hbWUoZ28tdXApO1xuICBAaW5jbHVkZSBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50KDEpO1xuICBAaW5jbHVkZSBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uKGN1YmljLWJlemllciguNTUsIDAsIC4xLCAxKSk7XG4gIEBpbmNsdWRlIGFuaW1hdGlvbi1kdXJhdGlvbigwLjNzKTtcblxuICAmLmRlbGF5LTEge1xuICAgIEBpbmNsdWRlIGFuaW1hdGlvbi1kdXJhdGlvbigwLjVzKTtcbiAgfVxuXG4gICYuZGVsYXktMiB7XG4gICAgQGluY2x1ZGUgYW5pbWF0aW9uLWR1cmF0aW9uKDAuN3MpO1xuICB9XG5cbiAgJi5kZWxheS0zIHtcbiAgICBAaW5jbHVkZSBhbmltYXRpb24tZHVyYXRpb24oMC45cyk7XG4gIH1cblxuICAmLmRlbGF5LTQge1xuICAgIEBpbmNsdWRlIGFuaW1hdGlvbi1kdXJhdGlvbigxLjFzKTtcbiAgfVxuXG4gICYuZGVsYXktNSB7XG4gICAgQGluY2x1ZGUgYW5pbWF0aW9uLWR1cmF0aW9uKDEuM3MpO1xuICB9XG5cbiAgJi5kZWxheS02IHtcbiAgICBAaW5jbHVkZSBhbmltYXRpb24tZHVyYXRpb24oMS41cyk7XG4gIH1cblxuICAmLmRlbGF5LTcge1xuICAgIEBpbmNsdWRlIGFuaW1hdGlvbi1kdXJhdGlvbigxLjdzKTtcbiAgfVxuXG4gICYuZGVsYXktOCB7XG4gICAgQGluY2x1ZGUgYW5pbWF0aW9uLWR1cmF0aW9uKDEuOXMpO1xuICB9XG5cbiAgJi5kZWxheS05IHtcbiAgICBAaW5jbHVkZSBhbmltYXRpb24tZHVyYXRpb24oMi4xcyk7XG4gIH1cblxuICAmLmRlbGF5LTEwIHtcbiAgICBAaW5jbHVkZSBhbmltYXRpb24tZHVyYXRpb24oMi4zcyk7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBnby11cCB7XG4gIDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoODBweCk7XG4gICAgb3BhY2l0eTogMDtcblxuICB9XG4gIDkwJSB7XG4gICAgb3BhY2l0eTogMC45O1xuICB9XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwcHgpO1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cbiIsIkBpbXBvcnQgJy4uLy4uL2dsb2JhbCc7XG5cbjpob3N0IHtcbiAgLS1pb24tYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cbiAgaW9uLWxhYmVsIHtcbiAgICAtLWNvbG9yOiAjRkZGRkZGO1xuICB9XG5cbiAgaW9uLWlucHV0IHtcbiAgICAtLWNvbG9yOiAjRkZGRkZGO1xuICB9XG59XG5cbi50aXR1bG8ge1xuICBwYWRkaW5nOiAxMHB4IDA7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgY29sb3I6ICNGRkZGRkY7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmFjb2VzIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBtYXJnaW46IDE2cHg7XG4gIHBhZGRpbmc6IDVweCAwO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uYnRuLWVudmlhciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzMTkxMzY7XG4gIGNvbG9yOiAjRkZGRkZGO1xuICBwYWRkaW5nOiAxMHB4O1xuICBmb250LXNpemU6IDE1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgYm94LXNoYWRvdzogMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5idG4tZW52aWFyW2Rpc2FibGVkXSB7XG4gIG9wYWNpdHk6IC4zO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/login/login.page.ts":
/*!*************************************!*\
  !*** ./src/app/login/login.page.ts ***!
  \*************************************/
/*! exports provided: LoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPage", function() { return LoginPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _mock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../mock */ "./src/app/mock.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_login_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/login.service */ "./src/app/services/login.service.ts");
/// <reference path="../../../node_modules/@types/ragemp-c/index.d.ts" />






var LoginPage = /** @class */ (function () {
    function LoginPage(toastCtrl, loginService) {
        this.toastCtrl = toastCtrl;
        this.loginService = loginService;
        this.formGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            usuario: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({
                value: '',
                disabled: true,
            }, {
                validators: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(40),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                ],
            }),
            senha: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', {
                validators: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                ],
            }),
        });
    }
    LoginPage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (typeof mp !== 'undefined') {
                    this.player = mp.players.local;
                }
                else {
                    this.player = _mock__WEBPACK_IMPORTED_MODULE_3__["playerMock"];
                }
                this.formGroup.controls.usuario.patchValue(this.player.name);
                this.campoSenha.setFocus();
                return [2 /*return*/];
            });
        });
    };
    LoginPage.prototype.login = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast, err_1, toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, this.loginService.login(this.formGroup.value).toPromise()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.toastCtrl.create({
                                message: 'Autenticado com sucesso!',
                                position: 'top',
                                color: 'success',
                                duration: 3000,
                            })];
                    case 2:
                        toast = _a.sent();
                        toast.present();
                        browser.destroy();
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        return [4 /*yield*/, this.toastCtrl.create({
                                message: err_1.mensagem || 'Um erro ocorreu ao autenticar',
                                position: 'top',
                                color: 'danger',
                                duration: 3000
                            })];
                    case 4:
                        toast = _a.sent();
                        toast.present();
                        browser.destroy();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('senha'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonInput"])
    ], LoginPage.prototype, "campoSenha", void 0);
    LoginPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.page.html */ "./src/app/login/login.page.html"),
            styles: [__webpack_require__(/*! ./login.page.scss */ "./src/app/login/login.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"],
            _services_login_service__WEBPACK_IMPORTED_MODULE_5__["LoginService"]])
    ], LoginPage);
    return LoginPage;
}());



/***/ }),

/***/ "./src/app/mock.ts":
/*!*************************!*\
  !*** ./src/app/mock.ts ***!
  \*************************/
/*! exports provided: playerMock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerMock", function() { return playerMock; });
var playerMock = {
    name: 'Mandrakke_Army',
};


/***/ }),

/***/ "./src/app/services/login.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/login.service.ts ***!
  \*******************************************/
/*! exports provided: LoginService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginService", function() { return LoginService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_internal_Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/internal/Observable */ "./node_modules/rxjs/internal/Observable.js");
/* harmony import */ var rxjs_internal_Observable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_Observable__WEBPACK_IMPORTED_MODULE_2__);



var LoginService = /** @class */ (function () {
    function LoginService() {
    }
    LoginService.prototype.login = function (dados) {
        return new rxjs_internal_Observable__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (observer) {
            if (typeof mp !== 'undefined') {
                mp.events.add('AutenticacaoResultado', function (data) {
                    if (data.autenticado) {
                        observer.next(data);
                        observer.complete();
                    }
                    else {
                        observer.error(data);
                    }
                });
                mp.events.callRemote('AutenticarJogador', dados);
            }
            else {
                observer.next({
                    autenticado: true,
                });
                observer.complete();
            }
        });
    };
    LoginService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], LoginService);
    return LoginService;
}());



/***/ })

}]);
//# sourceMappingURL=login-login-module.js.map