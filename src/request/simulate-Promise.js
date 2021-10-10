/**https://zhuanlan.zhihu.com/p/144058361
 * 手写Promise：
 * Promise是一个可支持异步操作并可调用.then()方法的对象|函数，它有三种状态：pending、fulfilled、rejected；
 *      Promise状态具有凝固性，即状态只能有pending->fulfilled、pengding->rejected而且状态一旦改变则不可逆。
 * Promise((resove,reject)=>{})构造函数接受一个executor函数，它有两个函数参数resolve和reject分别在异步操作执行结束后进行调用并返回数据
 *      当异步操作执行成功后，调用resolve(data)，并将异步操作执行结果data作为其参数返回；
 *      当异步操作执行失败后，调用reject(reason)，将失败原因reason返回；
 * Promise.prototype.then(onfulfilled,onrejected)接受两个函数参数分别在成功和失败时执行
 * 它还可以拆分为Promise.then(data=>{}).catch(reason=>{});
 * Promise.resolve()
 * Promise.reject()
 * Promise.all()
 * Promise.race()
 * Promise.prototype.catch()
 */

function Promise(executor){
    var self = this;
    this.state = 'pending';
    this.value = undefined;
    this.reason= undefined;
    //为保证存在多个异步回调时，前边回调不被覆盖，声明数组存储回调函数
    this.onFullfilled = [];//成功的回调
    this.onRejected = [];//失败的回调
    function resolve(value){//状态的设置
        if(self.state=='pending'){
            self.state = 'fulfilled';
            self.value = value;
            self.onFullfilled.forEach(fn=>fn(value));
        }
    };
    function reject(reason){
        if(self.state=='pending'){
            self.state = 'rejected';
            self.reason = reason;
            self.onRejected.forEach(fn=>fn(reason));
        }
    };
    try {
        executor(resolve,reject);
    } catch (error) {
        reject(error);
    }
}

Promise.prototype.then = function(onFullfilled,onRejected){
    if(this.state === 'fulfilled'){
        typeof onFullfilled === 'function' && onFullfilled(this.value);
    }
    if(this.state === 'rejected'){
        typeof onRejected === 'function' && onRejected(this.reason);
    }
    if(this.state === 'pending'){
        typeof onFullfilled === 'function' && this.onFullfilled.push(onFullfilled);
        typeof onRejected === 'function' && this.onRejected.push(onRejected);
    }
};

//then()链式调用-->该方法应返回Promise对象 Promise.then()
//then()穿透   then(1,1).then('','').then().then(data=>{},reason=>{})
//then()的回调是异步执行的


Promise.prototype.then = function(onFullfilled,onRejected){
    var self = this;
    onFullfilled = typeof onFullfilled === 'function'? onFullfilled : value => value;
    onRejected = typeof onRejected === 'function'? onRejected : reason => reason;

    var promise2 = new Promise((resolve,reject)=>{
        if(self.state === 'fulfilled'){
            setTimeout(()=>{
                try {
                    let x = onFullfilled(self.value);
                    resolvePromise(promise2,x,resolve,reject);//Promise解决过程 [[Resolve]](promise, x)
                } catch (error) {
                    reject(error);
                }
            });
        }else if(self.state === 'rejected'){
           setTimeout(()=>{
               try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2,x,resolve,reject);
               } catch (error) {
                    reject(error);
               }
           });
        }else if(self.state === 'pending'){
            self.onFullfilled.push(()=>{
                setTimeout(()=>{
                    try {
                        let x = onFullfilled(self.value);
                        resolvePromise(promise2,x,resolve,reject);  
                    } catch (error) {
                        reject(error)
                    }
                });
            });
            self.onRejected.push(()=>{
                setTimeout(()=>{
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (error) {
                        reject(error)
                    }
                });
            });
        }
    });
}
// Promise 解决过程是一个抽象的操作，其需输入一个 promise 和一个值，我们表示为 [[Resolve]](promise, x)，
//如果 x 有 then 方法且看上去像一个 Promise ，解决程序即尝试使 promise 接受 x 的状态；否则其用 x 的值来执行 promise 。
/**
 * 
 * @param {*} promise2 新的Promise对象
 * @param {*} x 上一个then的返回值
 * @param {*} resolve promise2的resolve
 * @param {*} reject promise2的reject
 */
function resolvePromise(promise2,x,resolve,reject){

}
/**
 *  x === promise2 以 TypeError 为据因拒绝执行 promise，否则会产生死循环
 *  x 为 Promise
        如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
        如果 x 处于执行态，用相同的值执行 promise
        如果 x 处于拒绝态，用相同的据因拒绝 promise
    x 为对象或函数
        把 x.then 赋值给 then
        如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
        如果 then 是函数，将 x 作为函数的作用域 this 调用之。传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise:
            如果 resolvePromise 以值 y 为参数被调用，则运行 [Resolve]
            如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
            如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            如果 then 不是函数，以 x 为参数执行 promise
    如果 x 不为对象或者函数，以 x 为参数执行 promise
 */
function resolvePromise(promise2,x,resolve,reject){
    if(x === promise2) reject(new TypeError('Chaining cycle'));
    if(x !== null && (typeof x === 'object' || typeof x === 'function')){
        let used;
        try {
            let then = x.then;//防止有人Object.defineProperty(Promise,'then',{ get:function(){ throw Error('error)}}); Promise.then
            if(typeof then === 'function'){
                then.call(x, y=>{
                    if(used) return;
                    used = true;
                    resolvePromise(promise2,y,resolve,reject);
                }, r=>{
                    if(used) return;
                    used = true;
                    reject(r)
                });
            }else{
                if(used) return;
                used = true;
                resolve(x)
            }
        } catch (error) {
            if(used) return;
            used = true;
            reject(error)
        }
    }else{
        resolve(x)
    }
}
//npm install -g promises-aplus-tests
// promises-aplus-tests Promise.js

Promise.prototype.catch = function(catchFunc){
    return this.then(null,catchFunc);
}
Promise.resolve = function(data){
    return new Promise((resolve,reject)=>{
        resolve(data);
    });
}
Promise.reject = function(reason){
    return new Promise((resolve,reject)=>{
        reject(reason)
    });
}

Promise.all = function(promiseArray){
    if(!Array.isArray(promiseArray)) throw new TypeError('The arguments should be iterable');
    return new Promise((resolve,reject)=>{
        try{
            let resultArray = [];
            promiseArray.forEach(function(promise,index){
                promise.then(data=>{
                    resultArray.push(data);
                    if(resultArray.length == this.length){
                        resolve(resultArray);
                    }
                },reject)
            });
        }catch(e){
            reject(e);
        }
    });
}

Promise.race = function(promiseArray){
    if(!Array.isArray(promiseArray)) throw new Error('The arguments should be iterable');
    return new Promise((resolve,reject)=>{
        try {
            promiseArray.forEach(promise => {
                promise.then(resolve,reject);
            });
        } catch (error) {
            reject(error)
        }
    });
}
