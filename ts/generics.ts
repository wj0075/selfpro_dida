/*function createArray(length: number, value: any): Array<any> {
    let result = [];
    for(let i = 0; i< length; i++) {
        result[i] = value;
    }
    return result;
}
const ary = createArray(3, 'x'); // [ 'x', 'x', 'x' ]
console.log(ary);*/

/*function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for(let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
const ary = createArray<string>(3, 'x');
console.log(ary); // [ 'x', 'x', 'x' ]*/

/*function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}
console.log(swap([7, 'jack']));*/
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
// Property 'length' does not exist on type 'T'

function createArray<T = string>(lenth: number, value: T): Array<T> {
    let result: T[] = [];
    for(let i = 0; i < lenth; i++) {
        result[i] = value;
    }
    return result;
}