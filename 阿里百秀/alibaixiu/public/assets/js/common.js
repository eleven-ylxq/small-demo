$(function () {
    $("#exit").on('click', function () {
        var isConfirm = confirm('您确定要退出吗');
        // console.log(isConfirm)
        if(isConfirm) {
            $.ajax({
                url:'/logout',
                type:'post',
                success:function () {
                    location.href='/admin/login.html'
                },
                error:function () {
                    console.log('退出失败，请联系管理员')
                }
            })
        }
    })
})