// 引入router
import router from '../../router';

// 引入html模板，会被作为字符串引入

// import template from './bar.html';

// 引入css，会生成<style>快插入到<head>中

// 导出类
var template = `<div class="foo">
    <h1>Page Foo</h1>
    <a href="javascript:" class="foo__gobar">goto /bar</a>

    <p>
        <!--
            小于10kb的图片，<img>标签的src被编译为Data URI格式
            <img src="data:image/png;base64,">
        -->
        <img src="smallpic.png">
    </p>

    <p>
        <!--
            大于10kb的图片，图片会被储存到输出目录，src会被替换为打包后的路径
            <img src="/assets/f78661bef717cf2cc2c2e5158f196384.png">
        -->
        <img src="largepic.png">
    </p>
</div>`;
export default class {
    mount(container) {
        document.title = 'foo';
        container.innerHTML = template;
        console.log('foo__gobar',container.querySelector('.foo__gobar'));
        console.log('foo__gobar',container);
        container.querySelector('.foo__gobar').addEventListener('click', () => {
            // 调用router.go方法加载/bar页面
            router.go('/bar');
        })
    }
}
