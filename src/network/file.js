import { request } from "./request"

export function getFileList(dir) {
  return request({
    url: 'file',
    method: 'get',
    params: {
      dir
    }
  })
}

export function test(dir) {
  return request({
    url: './testt.json',
    method: 'get',
    params: {
      dir
    }
  })
}