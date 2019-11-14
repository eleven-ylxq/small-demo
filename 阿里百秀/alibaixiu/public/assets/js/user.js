$(function () {
    // alert(11)
    //获取用户列表
    $.ajax({
        url: '/users',
        success: function (res) {
            // console.log(res);
            var html = template('userTpl', { datas: res })
            $('#tBox').html(html);
        },
        error: function () {
            console.log('用户信息获取失败,请联系管理员');
        }
    });

    //添加用户
    $("#submit").on('click', function () {
        // console.log(1)
        var formData = $('#addUser').serialize();
        // console.log(formData)
        //发送请求添加用户
        $.ajax({
            url: '/users',
            type: 'post',
            data: formData,
            success: function (res) {
                // console.log(res)
                location.reload();
            },
            error: function (err) {
                console.log(err)
                // console.log('添加用户失败,请联系管理员')
                $('.alert-danger').show().html(JSON.parse(err.responseText).message);
            }
        })
        return false
    })

    //图片上传
    $('#userBox').on('change', '#avatar', function () {
        var formData = new FormData();
        formData.append('avatar', this.files[0]);
        //发送上传图片请求
        $.ajax({
            url: '/upload',
            type: 'post',
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                // console.log(res)
                $('#imgHeader').attr('src', res[0].avatar);
                $('#uploadImg').val(res[0].avatar)
            },
            error: function (err) {
                $('.alert-danger').show().html(JSON.parse(err.responseText).message);
            }
        });
    })

    //编辑用户信息
    $('#tBox').on('click', '#edit', function () {
        // alert(11)
        var id = $(this).attr('data-id');
        // console.log(id)
        //发送请求修改用户
        $.ajax({
            type: 'get',
            url: '/users/' + id,
            success: function (res) {
                // console.log(res)
                var html = template('editTpl', res);
                $('#userBox').html(html)
            }
        });
    })

    //提交修改
    $('#userBox').on('submit', '#editUser', function () {
        var formData = $(this).serialize();
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'put',
            url: '/users/' + id,
            data: formData,
            success: function () {
                location.reload();
            },
            error: function (err) {
                // console.log('用户修改失败,请联系管理员')
                $('.alert-danger').show().html(JSON.parse(err.responseText).message);
            }
        })
    })

    //删除用户
    $('#tBox').on('click', '#delete', function () {
        var falg = confirm('您确定要删除此用户');
        if (falg) {
            var id = $(this).attr('data-id');
            // console.log(id)
            $.ajax({
                type: 'delete',
                url: '/users/' + id,
                success: function () {
                    location.reload();
                },
                error: function () {
                    console.log('删除失败,请联系管理员')
                }
            });
        }

    })

    //获取全选按钮
    var checkAll = $('#checkAll');
    //获取批量删除按钮
    var plsc = $('#batches');
    //全选按钮添加change事件
    checkAll.on('change', function () {
        // 获取到全选按钮的状态
        var status = $(this).prop('checked')
        // alert(status);
        //获取到所有用户 并将这些用户的表单状态和全选按钮保持一致
        $('#tBox').find('input').prop('checked', status);
        if (status) {
            // 全选状态为正 显示批量删除按钮
            plsc.show();
        } else {
            plsc.hide();
        }
    })

    //为每一个用户添加change事件 监听复选框的状态
    $('#tBox').on('change', '#userCheck', function () {
        // alert(1);
        // 判断表格中所有的复选框的数量 与 当前选中的复选框的数量是否相等 若相等 则为全选状态 否则 则为非全选状态
        var inputs = $('#tBox').find('input');
        var falg = inputs.length == inputs.filter(':checked').length
        // console.log(a)
        if (falg) {
            checkAll.prop('checked', true);
        } else {
            checkAll.prop('checked', false);
        }
        //如果选中的状态的长度==0 则批量删除
        if (inputs.filter(':checked').length == 0) {
            plsc.hide();
        } else {
            plsc.show();
        }
    })

    //为批量删除添加点击事件
    plsc.on('click', function () {
        //创建一个空数组 来接收id
        var Ary = [];
        //筛选当前选中状态中的id
        var inputs = $('#tBox').find('input').filter(':checked');
        // console.log(Ary)
        // console.log(inputs)
        inputs.each(function (index, element) {
            // console.log(index,element)
            //获取每一个选中的表单的id值
            //并且添加到Ary数组中
            Ary.push($(element).attr('data-id'));
        })
        // console.log(Ary)
        // 将Ary转换为字符串 并且以-隔开
        var AryId = Ary.join('-');
        // console.log(AryId)
        //创建批量删除的表单 让用户选择是否删除
        var falg = confirm('您是否需要删除这些用户信息');
        //如果falg为真 则实现批量删除
        if (falg) {
            //发送请求实现批量删除
            $.ajax({
                type: 'delete',
                url: '/users/' + AryId,
                success: function () {
                    //删除成功 重新刷新页面
                    location.reload();
                },
                error: function (err) {
                    //删除失败 则显示报错信息
                    $('.alert-danger').show().html(JSON.parse(err.responseText).message);
                }
            })
        }
    })
})