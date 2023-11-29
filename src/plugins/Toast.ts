import { createApp } from 'vue';
import Toast from '../components/Toast/index.vue';
let toastDom: any = null;
let app: any = null;
const xToast = (options: any) => {
  const dom = document.body.querySelector('.my-toast');
  // toast元素是否存在
  if (!dom) {
    // 创建元素节点
    toastDom = document.createElement('div');
    // 给元素设置class
    toastDom.className = `my-toast`;
    // 在body标签内部插入此元素
    document.body.appendChild(toastDom);
  } else {
    app.unmount();
  }

  // 创建应用实例（第一个参数是根组件。第二个参数可选，它是要传递给根组件的 props）
  app = createApp(Toast, {
    ...options,
    hide() {
      if (app) {
        // 卸载实例
        app.unmount();
        app = null;
      }
      if (toastDom) {
        // 删除dom
        document.body.removeChild(toastDom);
        toastDom = null;
      }
    },
  });
  // 将实例挂载到创建的 DOM 元素上
  return app.mount(toastDom);
};
// toast显示
xToast.show = (options: any) => xToast(options).show();

export default xToast;
