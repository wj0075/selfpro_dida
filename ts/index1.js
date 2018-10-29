/*function Person() {

}
var person = new Person();

console.log(person.__proto__ == Person.prototype);
console.log(Person.prototype.constructor == Person);
// 顺便学习一下ES5的方法，可以获得对象的原型
console.log(Object.getPrototypeOf(person));*/

/*function Person() {

}
Person.prototype.name = 'wj';
var person = new Person();
person.name = 'wd';
console.log(person.name);
delete person.name;
console.log(person.name);*/

/*
var obj = new Object();
obj.name = 'wj';
console.log(obj.name)*/

/*function Person() {

}
var person = new Person();

console.log(person.constructor === Person);*/

Function.prototype.call2 = function (context) {
    var context = context || window;
    context.fn = this;
    var args = [];
    for(var i=1,len = arguments.length; i<len; i++){
        args.push('arguments['+i+']');
    }
    console.log(args);
    var result = eval('context.fn('+args+')');
    delete context.fn;
    return result;
};

var foo = {
    value: 1,
};

function bar(name,age) {
    console.log(name);
    console.log(age);
    console.log(this.value)
}

bar.call2(foo,'kevin', 18);

var obj = {
    value: 1,
}

function bar(name, age){
    return {
        value: this.value,
        name: name,
        age: age
    }
}
console.log(bar.call(obj,'kevin', 13));
/*{
    age:13,
    name:"kevin",
    value:1
}*/
