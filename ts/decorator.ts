/*
function testTable(isTable) {
    return function (target) {
        target.prototype.isTable = isTable;
    }
}

@testTable(true)
class MyClassTableTest {
    constructor() {

    }
}

const table = new MyClassTableTest();
console.log(table.isTable);*/

/*
function mixins(...list) {
    return function (target) {
        Object.assign(target.prototype, ...list);
    }
}

const Foo = {
    foo() {
        console.log('foo');
    }
};

@mixins(Foo)
class MyClass {

}
let obj = new MyClass();
console.log(obj.foo());*/
function readonly(target, name, descriptor) {
    // descriptor对象原来的值
    // {
    //     value: specifiedFunction,
    //     enumerableL: false,
    //     configurable: true,
    //     writable: true
    // }
    descriptor.writable = false;
    return descriptor
}
/*readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);*/
/*class Person {
    @readonly
    name(){
        return `jian wang`
    }
}
let person = new Person();
person.name = function () {
    return '3333333';
};*/
// console.log(person.name());

/*class MyMath {
    @log
    add(a, b) {
        return a + b;
    }
}

function log(target, name, descriptor) {
    const oldValue = descriptor.value;

    descriptor.value = function () {
        console.log(`Calling ${name} with`, arguments);
        return oldValue.apply(this, arguments)
    };
    return descriptor
}

const math = new MyMath();
math.add(1, 2);
console.log(math.add(2, 3));*/

function dec(id) {
    console.log('evaluted', id);
    return (target, property, descriptor) => {
        console.log('executed', id)
    }
}

class Example {
    @dec(1)
    @dec(2)
    method(){}
}