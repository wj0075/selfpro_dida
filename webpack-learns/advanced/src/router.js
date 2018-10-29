// 将async/await转换成ES5代码后需要这个运行时库来支持
import 'regenerator-runtime/runtime'
import Foo from './views/foo';
import Bar from './views/bar.do'
const routes = {
  // import()返回promise
  '/foo':Foo,
  '/bar.do': Bar
}
class Router {
  start() {
    window.addEventListener('popstate', () => {
      this.load(location.pathname)
    })

    this.load(location.pathname)
  }

  go(path) {
    history.pushState({}, '', path)
    this.load(path)
  }

  // 加载path路径的页面
  // 使用async/await语法
  async load(path) {
    if (path === '/') path = '/foo'
    // 动态加载页面
    const view = new routes[path]();
    view.mount(document.body)
  }
}

export default new Router()
