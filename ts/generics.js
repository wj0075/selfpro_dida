/*function createArray(length: number, value: any): Array<any> {
    let result = [];
    for(let i = 0; i< length; i++) {
        result[i] = value;
    }
    return result;
}
const ary = createArray(3, 'x'); // [ 'x', 'x', 'x' ]
console.log(ary);*/
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
// Property 'length' does not exist on type 'T'
function createArray(lenth, value) {
    var result = [];
    for (var i = 0; i < lenth; i++) {
        result[i] = value;
    }
    return result;
}
