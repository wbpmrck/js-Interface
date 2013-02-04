#js-Interface
<hr/>
##What is this?
js-Interface is a simple library to emulate a 'Interface Patten' in javascript.It's very handy and light weight.
<hr/>
##Features
<ul>
 <li>define you own interfaces.</li>
 <li>auto implement to your new Class.</li>
 <li>check implements,by pass an obj or its constructor.</li>
</ul>
#Demo

##1、create your own Interface
```js
var Interface = require('interface').Interface;
var IHuman = new Interface('IHuman',['run','shout']);//done! now you have a Interface. it has two methods.
//var IHuman = new Interface('IHuman','run');//this works too!
//next step we can see what can it do.
```


##2、create your own Class,and implement the Interface
```js
//define a class
function SupperMan(name,speed){
    this.name = name;
    this.speed = speed;
}
//let the SupperMan Class implements the IHuman Interface.
IHuman.implementWith(SupperMan);

var man1 = new SupperMan('tom','14km/h');
man1.run(); //now although we haven't implement the 'run' method, but this will throw a error and tell u:
//method:[run] from interface:[IHuman] not implement in Class:[SupperMan]!
```


##3、implement the Interface
```js
SupperMan.prototype.run=function(){
    console.log('%s run at speed of %s',this.name,this.speed);
}
man1.run();//ok,display:  tom run at speed of 14km/h

//notice:all methods that haven't be implemented have a clear error tip!
//man1.shout('ao~~~');//error:method:[shout] from interface:[IHuman] not implement in Class:[SupperMan]!
```

##4、check implements
```js

//1、ensure all methods be implement,if not,return the error message
if(!IHuman.checkImplementsError(man1)){
    man1.run();
    man1.shout('haha~~~');
}
else
    console.log(IHuman.checkImplementsError(man1));//display:method:[shout] from interface:[IHuman] not implement in Class:[SupperMan]!

//2、also can check specific method
if(!IHuman.checkImplementsError(man1,'run')){
    man1.run();//tom run at speed of 14km/h
}
else
    console.log(IHuman.checkImplementsError(man1,'run'));
    
//3、also  can check multiple methods one time
if(!IHuman.checkImplementsError(man1,['run','shout'])){
    man1.run();
    man1.shout('haha~~~');
}
else
    console.log(IHuman.checkImplementsError(man1,['run','shout']));
    
//4、ofcourse can check the Class itself:
if(!IHuman.checkImplementsError(SupperMan)){
    man1.run();
    man1.shout('haha~~~');
}
else
    console.log(IHuman.checkImplementsError(SupperMan));
```
## License

MIT
##End
