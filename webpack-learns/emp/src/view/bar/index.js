// 引入router
import router from '../../router';

// 引入template 模板

import template from './bar.html';
// const template = require('./bar.html');
// console.log('aa', template);
// 引入css， 会生成<style>块插入到<head>头中
import './style.css';
/*const template = `<div class="bar">
    <h1>Page Bar</h1>
    <a href="javascript:" class="bar__gofoo">goto /foo</a>
</div>`;*/
// 导出类
export default class {
    mount(container) {
        document.title = 'bar';
        container.innerHTML = template;
        console.log('bar__gofoo', container.querySelector('.bar__gofoo'));
        container.querySelector('.bar__gofoo').addEventListener('click', (e) => {
            // 调用router.go方法加载/foo页面
            router.go('/foo')
        })
    }
}