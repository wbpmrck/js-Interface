/**
 * Created by kaicui.
 * Date:13-2-4 下午4:41
 * Desc: 代码说明
 * 1、提供js的interface类定义
 * 2、使用Interface构造自己的接口对象
 * ChangeHistory:
 ------------------
 文件创建： 13-2-4下午4:41  by kaicui.
 ------------------
 */

/*
 todo:类定义
 */

function Interface(name, methods) {
    this.name = name;
    this.methods = [];

    if (methods.constructor == Array)
        this.methods = methods;
    else if (methods.constructor == String)
        this.methods[0] = methods;
    else
        throw new Error("Interface must define methods as a String or an Array of Strings");


}

/**
 * 让某个类去实现本接口
 * @param implementClass
 */
Interface.prototype.implementWith = function(implementClass){
    var self = this;//保留this引用
    if(implementClass && typeof implementClass === 'function'){
        //先初始化未实现的接口
        for(i=0,j=self.methods.length;i<j;i++){
            var _methodName = self.methods[i];
            if(!(_methodName in implementClass.prototype)){
                implementClass.prototype[_methodName] = (function(name){
                    function _notImplement(){
                        throw new Error(['method:[',name,'] from interface:[',self.name,
                            '] not implement in Class:[',implementClass.name,']!'].join(''));
                    }
                    _notImplement._ji_default = true;
                    return _notImplement;
                })(_methodName);
            }
        }
    }
};

/**
 * 判断指定对象/类是不是实现了接口
 * @param objOrClass
 * @param toSure:optional:要检查是否实现了的方法列表
 * @return {String}:err:检查错误信息
 */
Interface.prototype.checkImplementsError = function(objOrClass,toSure){
    var _type,self = this,toCheck = objOrClass,err='',
        _toSure =toSure?(toSure.constructor == Array?toSure:[toSure]):self.methods;//allow to pass array or string
    if(objOrClass&&( ((_type=typeof objOrClass)=='object') || _type=='function')){
        if(_type == 'function')
            toCheck = objOrClass.prototype; // check the proto to find the implement
        for(var i= 0,j=_toSure.length;i<j;i++){
            var _methodName = _toSure[i];
            if(!(_methodName in toCheck) || toCheck[_methodName]._ji_default){
                err+=['|method:[',_methodName,'] from interface:[',self.name,'] not implement in Class:[',
                    toCheck.constructor.name,//whether the param is obj or class, the constructor always point to the function
                    ']!'].join('');
            }
        }
        return err;
    }
    else{
        return 'params must be object or function!';
    }
}


/*
 todo:模块导出
 */
exports.Interface = Interface;