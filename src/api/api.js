export default [
  {
    name: 'register', //注册
    url: '/register', // postUrl
    method: 'post',
  },

  {
    name: 'login',//登录请求名
    url: '/login',//路径 ,要改成getSuc
    method: 'post'//方法
  },
  {
    name: 'forgetPass',//忘记密码
    url: '/forgetPass',
    method: 'post'
  },
  {
    name: 'manage',
    url: '/getUsers',
    method: 'post'
  },
  {
    name: 'getDatas',//请求温度降水量
    url: '/getDatas',
    method: 'post'
  },
  {
    name: 'initDatas',//请求初始化
    url: '/initDatas',
    method: 'post'
  },
  // {
  //   name: 'changeCity',//请求改变城市
  //   url: '/changeCity',//路径 ,要改成getDatas
  //   method: 'post'//方法
  // }
  {
    name: 'initUser',//初始化个人中心界面
    url: '/initUser',
    method: 'post'
  },

  {
    name: 'saveMsg',//保存修改信息
    url: '/saveMsg',
    method: 'post'
  },
  {
    name: 'vertify',//获取验证码
    url: '/vertify',
    method: 'post'
  },
  {
    name: 'newVertify',//获取验证码
    url: '/newVertify',
    method: 'post'
  },



  {
    name: 'saveChange',//改
    url: '/saveChange',
    method: 'post'
  },
  {
    name: 'addUser',//增
    url: '/addUser',
    method: 'post'
  },
  {
    name: 'deleteUser',//删
    url: '/deleteUser',
    method: 'post'
  },

  {
    name: 'initManager',//初始化管理界面
    url: '/initManager',
    method: 'post'
  },



];
