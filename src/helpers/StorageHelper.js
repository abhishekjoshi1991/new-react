export default class StorageHelper {
  static setLocal(params) {
      var val = params
      localStorage.setItem('token',val);
  }

  static getToken(){
      return localStorage.getItem('token');
  }
}

