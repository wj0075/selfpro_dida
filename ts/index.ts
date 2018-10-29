enum Color {
    Red = 1,
    Green = 2,
    Blue = 3
}
let c:Color = Color.Blue;
let colorName: string = Color[3];
console.log('aa', colorName);
console.log('bb', colorName);


/*
let someValue: any = '2345677';
let strLength: number = someValue.length;
console.log('字符串', strLength);*/
function getLength(something: string | number): number {
    if((<string>something).length){
        return (<string>something).length;
    }else {
        something.toString().length;
    }

}

// let [first, ...reset] = [1,2,3,4];
// console.log(first);
// console.log(reset);

/*
let o = {
    a: 'foo',
    b: 12,
    c: 'bar'
};
let {a: d, b: g} = o;
console.log(d);
console.log(g);


let first = [1,2,3,{a:1}];
let second = [5,6];
let both = [0, ...first,4, ...second];
console.log('数组', both);
first[3]['a'] = 10;
console.log('数组2', both);*/


interface LabelledValue {
    label: string;
}
function printLable(labelledObj: LabelledValue) {
    console.log('接口',labelledObj.label)
}
printLable({label:'hello'});

let ab: object[] = [{},{},{},{}];
let ro: ReadonlyArray<number> = [1,3,5,7,9];

/*
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any
}

function createSquare(config: SquareConfig): void {

}
createSquare({color:'sss', widtd: 23});*/

interface SearchFunc {
    (source: string, subString: string):void
}
let mySearch: SearchFunc;
    mySearch= function (source: string, subString: string) {
    return {};
};
    mySearch('1','1');
    
