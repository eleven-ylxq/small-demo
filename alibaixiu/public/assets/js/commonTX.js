$(function () {
    // 根据ID查询用户
    $.ajax({
        url: '/users/' + userId,
        success: function (res) {
            // console.log(res);
            if (res.avatar != '') {
                $('.aside .profile .avatar').attr('src', res.avatar)
                $()
            } else {
                $('.aside .profile .avatar').attr('src', '../assets/img/default.png')
            }

        }
    })
})