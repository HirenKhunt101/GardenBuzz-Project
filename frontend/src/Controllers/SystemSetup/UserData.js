export class UserData {
    setData(obj, key) {
      localStorage.setItem(key, btoa(JSON.stringify(obj)));
      return true;
    }
  
    getData(key) {
      if (localStorage.getItem(key)) {
        return JSON.parse((localStorage.getItem(key)));
      } else {
        return false;
      }
    }
    clearData(key) {
      localStorage.removeItem(key);
      return true;
    }
  }