import axios from "axios";

/**
 * 最终解决方案：直接返回axios实例，它本身是一个期约
 * @param {object} config 传入axios所需的配置信息
 * @returns 返回请求对象
 */
export function request(config) {
  //创建自己的axios实例
  const instance = axios.create({
    baseURL: 'localhost:8080',
    timeout: 5000
  })
  //使用拦截器
  //1.拦截请求
  instance.interceptors.request.use(
    config => {
      //拦截请求的作用：
      //核对config；
      //请求时间较长时添加等待动画；
      //检查请求，例如是否登录
      // ...
      // statement;
      // ...
      //返回config
      return config
    },
    err => {
      //请求发生错误
      return err
    }
  )
  //2.拦截响应
  instance.interceptors.response.use(
    res => {
      //返回结果
      //可以用于处理结果
      return res;
    },
    err => {
      //返回错误
      return err;
    }
  )
  //发送请求并返回该AxiosPromise对象
  return instance(config);
}