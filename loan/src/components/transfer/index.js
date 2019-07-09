import MyTransfer from './src/main'

/* istanbul ignore next */
MyTransfer.install = function(Vue) {
  Vue.component(MyTransfer.name, MyTransfer)
};

export default MyTransfer