var PENDING = 'pending';
var RESOLVED = 'resolved';
var REJECTED = 'rejected';

export default function APromise(executor) {
    var self = this;

    self.staus = PENDING;
    self.data = undefined;

    self.onResolveCallback = [];
    self.onRejectCallback = [];

    function resolve(value) {
        if (self.staus === PENDING) {
            self.staus = RESOLVED;
            self.data = value;
            for (var i = 0; i < self.onResolveCallback.length; i++) {
                self.onResolveCallback[i](value)
            }
        }
    }

    function reject(reason) {
        if (self.staus === PENDING) {
            self.staus = REJECTED;
            self.data = reason;
            for (var k = 0; k < self.onRejectCallback.length; k++) {
                self.onRejectCallback[k](reason)
            }
        }
    }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

/**
 * then 方法接收两个参数
 * @param onResolved 成功以后的回调
 * @param onRejected 失败以后的回调
 */
APromise.prototype.then = function (onResolved, onRejected) {
    var self = this;
    var promise2 = null;

    // 根据标准规定，如果 then 的参数不是函数，则忽略
    onResolved = typeof onResolved === 'function' ? onResolved : function (v) {
        return v;
    };

    onRejected = typeof onRejected === 'function' ? onRejected : function (k) {
        return k;
    };

    // promise 有三种状态 PENDING/RESOLVED/REJECTED
    // promise2 的返回值取决于 then 中回调函数的返回值

    if (self.staus === RESOLVED) {
        return promise2 = new APromise(function (resolve, reject) {
            try {
                const x = onResolved(self.data);

                // 如果 onResolved 的返回值是 promise 对象，则取其结果为返回值
                if (x instanceof APromise) {
                    x.then(resolve, reject);
                }
                // 否则直接使用 x 作为返回值
                resolve(x)
            } catch (e) {
                // 如果报错，则以捕获的错误为 promise2 的返回值
                reject(e)
            }
        })
    }

    if (self.staus === REJECTED) {
        return promise2 = new APromise(function (resolve, reject) {
            try {
                var x = onRejected(self.data);
                if (x instanceof APromise) {
                    x.then(resolve, reject)
                }
                reject(x);
            } catch (e) {
                reject(e)
            }
        })
    }

    // 如果当前处于 PENDING 状态，则还不能确定调用 onResolved 还是 onRejected，
    // 只能等到 Promise 的状态确定后才能知道如何处理
    // 所以将两种情况下的处理逻辑进行暂存
    if (self.staus === PENDING) {
        return promise2 = new APromise(function (resolve, reject) {
            self.onResolveCallback.push(function (vale) {
                try {
                    var x = onResolved(this.data);
                    if (x instanceof APromise) {
                        x.then(resolve, reject);
                    }
                } catch (e) {
                    reject(e)
                }
            });

            self.onRejectCallback.push(function (value) {
                try {
                    var x = onRejected(self.data);
                    if (x instanceof APromise) {
                        x.then(resolve, reject);
                    }
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
};

APromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
};
