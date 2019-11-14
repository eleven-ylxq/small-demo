$(function () {
    //为修改密码按钮添加点击事件
    $('.btn-primary').on('click',function () {
        // 获取该修改密码页面中 的form表单的值 并进行拼接
        var formData = $('.form-horizontal').serialize();
        // console.log(formData)
        //发送请求
        $.ajax({
            type:'put',
            url:'/users/password',
            data:formData,
            success:function () {
                //修改成功 则刷新页面
                location.href = '/admin/login.html'
            },
            error:function (err) {
                console.log(err)
            }
        })
        return false;
    })
})