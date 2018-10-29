class Animal {
    _name: string;
    constructor(name) {
        this._name = name;
        console.log('aaaaa')
    }
    get name() {
        return 'Jack'
    }
    set name(val) {
        this._name = val;
        console.log('setter '+ val);
    }
    sayHi() {
        return  `My name is ${this._name}`
    }
    static isAnimal(a) {
        return a instanceof Animal;
    }
}
let a = new Animal('Jack');
console.log(Animal.isAnimal(a))

console.log(a.sayHi());
a.name = 'Tome';


console.log('eeee', a.name);
class Cat extends Animal{
    constructor(name){
        super(name); // 调用父类的constructor(name)
        console.log(this.name);
    }
    sayHi() {
        return 'Meow, ' + super.sayHi(); // 调用父类的sayHi()
    }
}

let ca = new Cat('Jack');
console.log(ca.sayHi());

class Person {
    name = 'Jack';
    static age = 21;
    constructor() {

    }
}
var person = new Person;
console.log('vvvvv', person.name);
console.log(Person.age);


abstract class Cars {
    public name;

    public constructor(name) {
        this.name = name;
    }

    public abstract go();
}

class Care extends Cars {
    public go() {
        console.log('aaa', this.name);
    }
}

let car = new Care('Ben');