/**
 * Created by dcl on 2017/8/31.
 *
 * 队列
 */

function Queue(){
    this._handler = null;//处理事务的句柄
    this._queue = [];
    this._mutex = false;
}

Queue.prototype.add = function (transaction) {
    this._queue.push(transaction);
    this._awake();
}

Queue.prototype.addMore = function (transactions) {
    this._queue = this._queue.concat(transactions);
    this._awake();
}

Queue.prototype.setHandler = function (func) {
   this._handler = func;
}

Queue.prototype._awake = function(){
    console.log("当前排队任务数量为:", this._queue.length);
    if(this._queue.length > 0 && false === this._mutex){
        this._mutex = true;
        let transaction = this._queue.shift();
        let self = this;
        let done = function () {
            self._mutex = false;
            self._awake();
        }
        let ret = this._handler(transaction);
        if( ret ){
            done();
        }
    }
}

const queue=new Queue();

//单例模式
const Instance=function () {
     return queue;
}

exports.instance=Instance;