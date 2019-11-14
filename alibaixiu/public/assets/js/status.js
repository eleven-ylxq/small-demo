// 用户管理功能 
//判断当前用户的登陆状态 isLogin 如果为真 则不进此判断 否则需要登陆
if (!isLogin) {
    alert('当前未登录，请重新登录')
    location.href = '/admin/login.html'
}
