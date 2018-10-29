var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var c = Color.Blue;
var colorName = Color[3];
console.log('aa', colorName);
console.log('bb', colorName);
/*
let someValue: any = '2345677';
let strLength: number = someValue.length;
console.log('字符串', strLength);*/
function getLength(something) {
    if (something.length) {
        return something.length;
    }
    else {
        something.toString().length;
    }
}
function printLable(labelledObj) {
    console.log('接口', labelledObj.label);
}
printLable({ label: 'hello' });
var ab = [{}, {}, {}, {}];
var ro = [1, 3, 5, 7, 9];
var mySearch;
mySearch = function (source, subString) {
    return {};
};
mySearch('1', '1');
