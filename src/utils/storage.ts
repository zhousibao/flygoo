const Storage = {
  getItem (key: string): any {
    let value = ''
    try {
      value = JSON.parse(localStorage.getItem(key) || JSON.stringify(''))
    } catch (ex) {
      console.log('localStorage.getItem报错:', ex.message)
    }
    return value
  },
  setItem (key: string, val: any) {
    try {
      localStorage.setItem(key, JSON.stringify(val))
    } catch (ex) {
      console.log('localStorage.setItem报错:', ex.message)
    }
  },
  removeItem (key: string) {
    try {
      localStorage.removeItem(key)
    } catch (ex) {
      console.log('localStorage.removeItem失败:', ex.message)
    }
  },
  clear () {
    try {
      localStorage.clear()
    } catch (ex) {
      console.log('localStorage.clear报错:', ex.message)
    }
  },
}

export default Storage
