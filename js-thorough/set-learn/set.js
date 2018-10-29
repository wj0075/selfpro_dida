let arr = [1,2,3];
const set = new Set(arr);
set.delete(2);
arr = [...set];
console.log(arr);

const studentInfo = [
    {name: 'Alice', age: 18, no: 2},
    {name: 'Bob', age: 16, no: 5},
    {name: 'Candy', age: 17, no: 3},
    {name: 'Den', age: 18, no: 4},
    {name: 'Eve', age: 16, no: 1},
];

const nameList = studentInfo.map(({name}) => name);
const ageList = studentInfo.map(({age}) => age);
const noList = studentInfo.map(({no}) => no);

console.log(nameList);
console.log(ageList);
console.log(noList);

const newStudentInfo = studentInfo.filter(({age}) => age <= 17);
console.log(newStudentInfo);

const a = [1, 2, {s: 3}, {s: 4}, {s: 5}];
const b = [{s: 2}, {s: 3}, {s: 4}, 'a'];

const newA = a.map(item => JSON.stringify(item));
const newB = b.map(item => JSON.stringify(item));
const diff = newA.concat(newB)
                .filter(v => !newA.includes(v) || !newB.includes(v))
    .map(item => JSON.parse(item));
console.log(diff);
function f() {
    
}

function f1() {
    
}
if(newA) {

}
const newValue = newA ? 'd' : 'a';
