$(function () {
    //获取分类列表
    $.ajax({
        url: '/categories',
        success: function (res) {
            // console.log(res)
            //添加模板引擎
            var list = template('listTpl', { data: res });
            //将模板引擎渲染到页面内
            $('#category').html(list);
        },
        error: function () {
            $('.alert-danger').show().html(JSON.parse(err.responseText).message)
        }
    });

    //为图片上传添加change事件
    $('#feature').on('change', function () {
        //创建FormData对象的实例
        var formData = new FormData();
        //为创建的formData对象赋值
        formData.append('thumbnail', this.files[0]);
        // console.log(this.files[0])
        //发送请求 完成图片上传
        $.ajax({
            url: '/upload',
            type: 'post',
            processData: false,
            contentType: false,
            data: formData,
            success: function (res) {
                // console.log(res)
                $('.thumbnail').show().attr('src', res[0].thumbnail);
                $('#hiddenThumbnail').val(res[0].thumbnail)
            },
            error: function () {
                $('.alert-danger').show().html(JSON.parse(err.responseText).message)
            }
        })
    })

    //当saveForm表单发生提交时
    $('#saveForm').on('submit', function () {
        // 使用serialize方法来获取表单中的值 并且进行拼接操作
        var formData = $(this).serialize();
        console.log(formData)
        //发送请求 完成创建文章操作
        $.ajax({
            url: '/posts',
            type: 'post',
            data: formData,
            success: function (res) {
                //如果创建成功 则跳转至文章列表
                console.log(res)
                location.href = '/admin/posts.html'
            },
            error: function () {
                $('.alert-danger').show().html(JSON.parse(err.responseText).message)
            }
        })
        //阻止表单默认行为
        return false
    })
})