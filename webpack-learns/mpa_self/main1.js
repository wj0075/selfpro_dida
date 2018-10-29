import './index.css';
import small from './smallpic.png';
const img = document.createElement('img');
const div = document.querySelector('#test');
console.log(div);
img.src = small;
div.appendChild(img);
console.log('Running App version'+VERSION);
console.log('PRODUCTION', typeof PRODUCTION);
console.log('TWO', TWO);
console.log('BROWER_SUPPORTS_HIML5', typeof BROWER_SUPPORTS_HIML5);
console.log('CONSTANT', CONSTANT);
console.log('saaaaaaaaaaaaaaa');
console.log('aaaaaaa222222222222');
/*let longVariableName = 'Hello';
longVariableName += ' World';*/
/*require.ensure(['./a.js'], (require) => {
    const content = require('./a');
    // document.open();
    // document.write(`<h1>${content}</h1>`);
    // document.close();
});*/
