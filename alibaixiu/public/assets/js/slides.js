$(function () {
    //获取轮播图列表
    $.ajax({
        url: '/slides',
        success: function (res) {
            console.log(res);
            var html = template('slidesTpl', { data: res });
            //渲染页面
            $('#stBox').html(html);
        },
        error: function (err) {
            $('.alert-danger').show().html(JSON.parse(err.responseText).message)
        }
    })

    //为上传图片的表单添加change事件
    $('#image').on('change', function () {
        var file = this.files[0];
        // console.log(file);
        //创建formData对象
        var formData = new FormData();
        //当文件上传时 给formData表单赋值
        formData.append('image', file)
        //发送请求 上传图片
        $.ajax({
            url: '/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                // console.log(res);
                //图片预览
                $('.help-block').show().attr('src', res[0].image)
                //将获得到的值 赋值给隐藏域
                $('#hiddenImg').val(res[0].image)
            },
            error: function (err) {
                $('.alert-danger').show().html(JSON.parse(err.responseText).message)
            }
        })
    });

    //为form表单添加提交事件
    $('form').on('submit', function () {
        var formData = $(this).serialize();
        // console.log(formData);
        //发送请求 完成轮播图提交功能
        $.ajax({
            url: '/slides',
            type: 'post',
            data: formData,
            success: function (res) {
                // console.log(res);
                location.reload();
            },
            error: function (err) {
                $('.alert-danger').show().html(JSON.parse(err.responseText).message)
            }
        })
        return false;
        //阻止表单默认行为
    });

    //为删除按钮添加点击事件 事件委派
    $('#stBox').on('click', '#delete', function () {
        var id = $(this).attr('data-id');
        // console.log(id);
        //判断用户是否要删除该轮播图
        if (confirm('您是否要删除该轮播图?')) {
            //发送请求 实现删除功能
            $.ajax({
                url: '/slides/' + id,
                type: 'delete',
                success: function () {
                    location.reload();
                },
                error: function (err) {
                    $('.alert-danger').show().html(JSON.parse(err.responseText).message)
                }
            })
        }
    });
});