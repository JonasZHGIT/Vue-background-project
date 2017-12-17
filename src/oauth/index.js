import Axios from 'axios';

class OAuth {
	constructor() {
	}
	logout() {
		this.clearCookie('access_token');
	}
    isAuthenticated() {
        return this.getCookie('access_token') ? true : false;
    }
    isGuest(){
        return this.getCookie('access_token') ? false : true;
    }
    getAuthHeaders() {
    	let access_token = this.getCookie('access_token');
    	return access_token;
    	// Axios.defaults.headers.common['Authorization'] = access_token;
    }

    // cookie 方法
    setCookie(c_name, c_value) {
      let exDate = new Date();
      let exDay = 7;
      exDate.setTime(exDate.getTime() + exDay*24*60*60*1000);
      document.cookie = c_name + '=' + c_value + '; expires=' + exDate.toGMTString();
    }
    getCookie(c_name) {
        let name = c_name + '=';
        let c_arr = document.cookie.split(';');
        for(let i=0; i<c_arr.length; i++) {
            let c_str = c_arr[i];
            c_str = c_str.charAt(0) === ' '?c_str.substring(1):c_str;
            if(c_str.indexOf(name) !== -1) {
                return c_str.substring(name.length, c_str.length);
            }
        }
        return false;
    }
    clearCookie(c_name) {
        this.setCookie(c_name, '', -1);
    }
}

export default OAuth;