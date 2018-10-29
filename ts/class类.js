var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal(name) {
        this._name = name;
        console.log('aaaaa');
    }
    Object.defineProperty(Animal.prototype, "name", {
        get: function () {
            return 'Jack';
        },
        set: function (val) {
            this._name = val;
            console.log('setter ' + val);
        },
        enumerable: true,
        configurable: true
    });
    Animal.prototype.sayHi = function () {
        return "My name is " + this._name;
    };
    Animal.isAnimal = function (a) {
        return a instanceof Animal;
    };
    return Animal;
}());
var a = new Animal('Jack');
console.log(Animal.isAnimal(a));
console.log(a.sayHi());
a.name = 'Tome';
console.log('eeee', a.name);
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name) {
        var _this = _super.call(this, name) || this;
        console.log(_this.name);
        return _this;
    }
    Cat.prototype.sayHi = function () {
        return 'Meow, ' + _super.prototype.sayHi.call(this); // 调用父类的sayHi()
    };
    return Cat;
}(Animal));
var ca = new Cat('Jack');
console.log(ca.sayHi());
var Person = /** @class */ (function () {
    function Person() {
        this.name = 'Jack';
    }
    Person.age = 21;
    return Person;
}());
var person = new Person;
console.log('vvvvv', person.name);
console.log(Person.age);
var Cars = /** @class */ (function () {
    function Cars(name) {
        this.name = name;
    }
    return Cars;
}());
var Care = /** @class */ (function (_super) {
    __extends(Care, _super);
    function Care() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Care.prototype.go = function () {
        console.log('aaa', this.name);
    };
    return Care;
}(Cars));
var car = new Care('Ben');
