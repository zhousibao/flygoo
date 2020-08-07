/**
 * @description 节流函数
 * @param fn 需要处理的函数
 * @param delay 节流时间
 */
const throttle = (fn:Function, delay:number = 200) => {
  let previous = 0;
  return (...args:any[]) => {
    const now = Date.now()
    if( now - previous > delay){
      previous = now
      fn.apply(this, args)
    }
  }
}


/**
 * @description 防抖函数
 * @param fn 需要处理的函数
 * @param delay 防抖时间
 * @param immediate 是否立即执行
 */
type TimeOut = null | NodeJS.Timeout
const debounce = (fn:Function, delay:number = 200, immediate:boolean= true) => {
  let timeout:TimeOut = null;
  return (...args:any[]) => {
    if(timeout) clearTimeout(timeout) // 如果存在定时器则取消

    if(immediate && !timeout){ // 第一次立即执行
      fn.apply(this, args)
    }

    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }
  
}
export { throttle, debounce }