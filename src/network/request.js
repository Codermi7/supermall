import axios from 'axios'
//安装库  npm install axios --save
export function request(config) {
  //1.创建axios实例
    const instance = axios.create({
      baseURL:'http://106.54.54.237:8000/api/hy',
      timeout: 5000
    })
  //2.axios拦截器
  //比如每次发送请求，都希望在界面显示一个请求图标
  instance.interceptors.request.use(config => {
    //console.log(config);
    return config
  },err => {
    //console.log(err);
  })
  instance.interceptors.response.use(res =>{
    //console.log(res);
    return res.data
  },err => {
    //console.log(err);
  })
  //3.发送真正的网络请求
  return instance(config);
}

