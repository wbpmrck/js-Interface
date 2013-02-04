/**
 * Created by kaicui.
 * Date:13-2-4 下午9:34
 * Desc: 代码说明
 * 1、测试和演示Interface的用法
 * 2、
 * ChangeHistory:
 ------------------
 文件创建： 13-2-4下午9:34  by kaicui.
 ------------------
 */

/*
 todo:通用模块导入
 */
var Interface = require('../../interface').Interface;


/*
    todo:接口定义
 */
var IHuman = new Interface('IHuman',['run','shout']); //定义一个名为IHuman的接口，具有一个方法声明:run

/*
 todo:类定义
 */

function SupperMan(name,speed){
    this.name = name;
    this.speed = speed;
}
IHuman.implementWith(SupperMan);//声明该接口使用这个类来实现


//todo:1、demo  the Interface implement
var man1 = new SupperMan('tom','14km/h');
//man1.run();//throw error:method:[run] from interface:[IHuman] not implement in Class:[SupperMan]!

SupperMan.prototype.run=function(){
    console.log('%s run at speed of %s',this.name,this.speed);
}
man1.run();//ok--tom run at speed of 14km/h
//man1.shout('ao~~~');//error:method:[shout] from interface:[IHuman] not implement in Class:[SupperMan]!


//comment these lines to see the error
//SupperMan.prototype.shout=function(msg){
//    console.log('%s shout : %s',this.name,msg);
//}


//todo:2、demo  the Interface check

////ensure all methods
//if(!IHuman.checkImplementsError(man1)){
//    man1.run();
//    man1.shout('haha~~~');
//}
//else
//    console.log(IHuman.checkImplementsError(man1));
//
////ensure one methods
//
//if(!IHuman.checkImplementsError(man1,'run')){
//    man1.run();
//}
//else
//    console.log(IHuman.checkImplementsError(man1,'run'));
//
////ensure some methods
//if(!IHuman.checkImplementsError(man1,['run','shout'])){
//    man1.run();
//    man1.shout('haha~~~');
//}
//else
//    console.log(IHuman.checkImplementsError(man1,['run','shout']));


//todo:3、demo  the Interface check:by Class

//ensure all methods
if(!IHuman.checkImplementsError(SupperMan)){
    man1.run();
    man1.shout('haha~~~');
}
else
    console.log(IHuman.checkImplementsError(SupperMan));

//ensure one methods

if(!IHuman.checkImplementsError(SupperMan,'run')){
    man1.run();
}
else
    console.log(IHuman.checkImplementsError(SupperMan,'run'));

//ensure some methods
if(!IHuman.checkImplementsError(SupperMan,['run','shout'])){
    man1.run();
    man1.shout('haha~~~');
}
else
    console.log(IHuman.checkImplementsError(SupperMan,['run','shout']));