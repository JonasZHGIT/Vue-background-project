import Mock from 'mockjs';

const mock_data = {
	username: 'jonas',
	password: '123'
};

const access_token = 'jonasisthebestIagreewithyou';

const loginAPI = Mock.mock('http://jonasbackground.com/api/login', 'post', function(options) {
	console.log(JSON.parse(options.body));
	let content = JSON.parse(options.body);
	if(content.username === mock_data.username && content.password === mock_data.password) {
		console.log("yes");
		return access_token;
	} else {
		console.log("no");
		alert("用户名或者密码错误");
	}
});
const doSomethingAPI = Mock.mock('http://jonasbackground.com/api/some', 'get', function(options) {
	let content = JSON.parse(options.body);
	return 'OK';
}); 
export {loginAPI, doSomethingAPI}; 

