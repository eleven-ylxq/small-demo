$(function () {
  // 根据ID查询用户
  $.ajax({
    url: '/users/' + userId,
    success: function (res) {
      // console.log(res);
      var html = template('usTpl', res);
      $('.profile').html(html);
      // $('.aside .profile .name').html(res.nickName)
      // if (res.avatar != '') {
      //     $('.aside .profile .avatar').attr('src', res.avatar)
      // } else {
      //     $('.aside .profile .avatar').attr('src', '../assets/img/default.png')
      // }

    }
  })
  var exit = $('.navbar-nav').find('li').eq(1);
  //退出功能
  exit.on('click', function () {
    var isConfirm = confirm('您确定要退出吗？');
    if (isConfirm) {
      $.ajax({
        url: '/logout',
        type: 'post',
        success: function (res) {
          // console.log(res);
          location.href = "/admin/login.html"
        },
        error: function () {
          alert('退出失败，请联系管理员')
        }
      });
    }
  });
});