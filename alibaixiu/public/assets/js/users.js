//用户管理页面
$(function () {
    //当表单发生提交行为的时候
    $('#btn').on('click', function () {
        //获取到用户在表单中输入的内容并将内容格式化参数字符串
        var f = $('#addUser').serialize();
        //向服务器发送添加用户的请求
        $.ajax({
            url: '/users',
            type: 'post',
            data: f,
            success: function (res) {
                //刷新页面
                location.reload();
            },
            error: function (err) {
                // alert('添加用户失败，请联系管理员')
                // alert(err.message )
                // console.log(JSON.parse(err.responseText).message)
                $('.alert-danger').show().html(JSON.parse(err.responseText).message)
            }
        });
    });


    // //当表单发生提交行为的时候
    // $('#addUser').on('submit', function () {
    //     //获取到用户在表单中输入的内容并将内容格式化参数字符串
    //     var formData = $(this).serialize();
    //     // alert(formData);
    //     //向服务器发送添加用户的请求
    //     $.ajax({
    //         url: '/users',
    //         type: 'post',
    //         success: function (res) {
    //             // console.log(res);
    //             //刷新页面
    //             location.reload();
    //         },
    //         error: function () {
    //             console.log('提交失败');
    //         }
    //     });
    // });
    // return false;


    //当用户选择文件的时候
    $('#formBox').on('change', '#avatar', function () {
        console.log(this.files);
        // 创建一个FormData对象，用来实现文件上传
        var formData = new FormData();
        // 往空的fromData中添加需要上传的文件
        formData.append('avatar', this.files[0]);
        //发送请求
        $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            //不需要设置contentType ajax会自动帮我们设置
            contentType: false,
            //processData不需要解析传递的数据
            processData: false,
            success: function (res) {
                // 如果执行到了res,则说明图片上传成功了
                // 打印res结果，res中包含了图片上传的信息
                // console.log(res);
                //当图片上传成功后，需要预览图片
                $('#imgHeader').attr('src', res[0].avatar)
                //需要将图片的地址保存到一个隐藏域当中
                $('#hidden').val($('#imgHeader').attr('src'))
            },
            error: function (err) {
                // console.log(err);
                // alert('图片上传失败，请联系管理员')
                $('.alert-danger').show().html(JSON.parse(err.responseText).message)
            }
        });
    })

    //发送ajax请求获取所有的用户信息
    $.ajax({
        url: '/users',
        success: function (res) {
            console.log(res);    
            var html = template('tpl', {
                data: res
            })
            $('#tBox').html(html);
        },
        error: function (err) {
            $('.alert-danger').show().html(JSON.parse(err.responseText).message)
        }
    })

    //编辑用户
    $('#tBox').on('click', '.edit', function () {
        //获取被点击用户的id值
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'GET',
            url: '/users/' + id,
            success: function (res) {
                // console.log(res);
                var html = template('modifyTpl', res);
                // console.log(html);
                $('#formBox').html(html)
            },
            error: function (err) {
                $('.alert-danger').show().html(JSON.parse(err.responseText).message)
            }
        });
    });

    //获取编辑好的用户
    $('#formBox').on('submit', '#modifyUser', function () {
        // 获取用户在表单中输入的内容
        var formData = $(this).serialize();
        // 获取要修改的那个用户的id值
        // console.log(formData);
        var id = $(this).attr('data-id');
        // console.log(id)
        //发送请求 修改用户信息
        $.ajax({
            type: 'put',
            url: '/users/' + id,
            data: formData,
            success: function (res) {
                // console.log(res)
                location.reload();
            }
        });
        //阻止表单默认行为
        return false;
    })

    //删除用户
    $('#tBox').on('click', '.delete', function () {
        //判断用户是否删除用户
        if (confirm('您确定要删除用户吗？')) {
            // console.log(111);
            var id = $(this).attr('data-id');
            //发送删除请求
            $.ajax({
                type: 'delete',
                url: '/users/' + id,
                success: function () {
                    location.reload();
                },
                error: function (err) {
                    // console.log('删除失败，请联系管理员');
                    $('.alert-danger').show().html(JSON.parse(err.responseText).message)
                }
            })
        }
    });

    //获取全选按钮
    var checkBox = $('#checkAll');
    //为全选按钮添加change事件
    checkBox.on('change', function () {
        //定义变量falg 用来后期判断当前全选框是否被选中
        var falg = $(this).prop('checked');
        // console.log(falg)
        //让用户的选择框随着全选框的选中而选中
        $('#tBox').find('input').prop('checked', falg);
        //如果全选框选中 则显示批量删除按钮
        if (falg) {
            $('#plsc').show();
        } else {
            //否则批量删除按钮隐藏
            $('#plsc').hide();
        }
    });

    //用户复选框 change事件
    $('#tBox').on('change', 'input', function () {
        //获取用户按钮
        var inputs = $('#tBox').find('input');
        // console.log($(this).prop('checked'))
        //定义falg来接收tbody下所有用户(包括选中与非选中)的input标签的长度与只选中的input标签的长度 做比较的值 (该falg获得的是一个布尔值)
        var falg = inputs.length == inputs.filter(':checked').length
        if (falg) {
            // 当falg为真 即为全选状态下 则全选按钮为勾选状态
            checkBox.prop('checked', true);
        } else {
            // 否则 全选按钮则为未选中状态
            checkBox.prop('checked', false);
        }
        // 判断tbody下input下被选中的input的个数
        if (inputs.filter(':checked').length == 0) {
            // 如果input的个数为0 则一个都未选中 此时批量删除按钮隐藏
            $('#plsc').hide();
        } else {
            // 否则input的个数不为0,则批量删除的按钮显示
            $('#plsc').show();
        }
    });

    //批量删除添加点击事件
    $('#plsc').on('click', function () {
        //定义一个空数组 来接收选中input中的data-id值
        var Ary = [];
        //定义falg来接收tbody下input标签被选中的数量
        var falg = $('#tBox').find('input').filter(':checked');
        // console.log(falg)
        //遍历被选中的input
        falg.each(function (index, element) {
            // console.log(index)
            // console.log(element
            // 将falg中被选中的input中的data-id值 依次添加到Ary数组中
            Ary.push($(falg[index]).attr('data-id'))
        });
        // console.log(Ary.join('-'))
        //判断用户是否要删除
        if (confirm('您确定要批量删除这些用户信息?')) {
            //发送批量删除请求
            $.ajax({
                type: 'delete',
                url: '/users/' + Ary.join('-'),
                success: function () {
                    // alert('成功')
                    //重新刷新页面
                    location.reload();
                },
                error: function (err) {
                    // console.log(err)
                    $('.alert-danger').show().html(JSON.parse(err.responseText).message)
                }
            })
        }
    });

    // //个人中心
    // $('#grzx').on('click', function () {
    //     location.href = '/admin/profile.html'
    //     // console.log(userId)
    //     $.ajax({
    //         url: '/users/' + userId,
    //         success: function (res) {
    //             var html = template('centerTpl',res);
    //             $('#centerUser').html(html);
    //         }
    //     })
    // });
});





