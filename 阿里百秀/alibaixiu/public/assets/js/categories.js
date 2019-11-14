$(function () {
    //查询分类 渲染页面
    $.ajax({
        url: '/categories',
        success: function (res) {
            // console.log(res)
            // 将res中的数据添加到模板中
            var html = template('listTpl', { data: res })
            //将模板添加到html页面中
            $('#tBox').html(html)
        }
    });
    //添加分类
    //为当前form表单添加提交事件
    $('form').on('submit', function () {
        //获取当前表单下 用户输入的值 并且进行拼接操作
        var formData = $(this).serialize();
        //发送请求 添加分类
        $.ajax({
            type: 'post',
            url: '/categories',
            data: formData,
            success: function (res) {
                // console.log(res)
                location.reload();
            },
            error: function (err) {
                // console.log(JSON.parse(err.responseText).message)
                $('.alert-danger').show().html(JSON.parse(err.responseText).message)
            }
        })
        return false;
        //阻止表单默认提交行为
    })

    //点击编辑按钮 为编辑按钮添加事件委托
    $('#tBox').on('click', '#edit', function () {
        confirm('您确定要编辑该分类?')
        // 获取当前点击的编辑标签下的data-id的属性值 并且赋值给id
        var id = $(this).attr('data-id');
        // console.log(id)
        //发送请求 根据id删除分类
        $.ajax({
            url: '/categories/' + id,
            type: 'get',
            success: function (res) {
                // console.log(res)
                var edit = template('editTpl', res);
                //渲染页面
                $('#Form').html(edit);
            }
        });
        return false
    })

    //为编辑表单添加提交事件
    $('#Form').on('submit', '#editForm', function () {
        //获取当前编辑后的信息 并且拼接
        var formData = $(this).serialize();
        console.log(formData)
        //获取id
        var id = $('#edit').attr('data-id');
        //发送请求 完成编辑
        $.ajax({
            url: '/categories/' + id,
            type: 'put',
            data: formData,
            success: function (res) {
                // console.log(res)
                location.reload();
            }
        });
        return false;
    })

    //点击删除按钮 需要通过事件委派
    $('#tBox').on('click', '#delete', function () {
        // alert(11)
        //获取当前删除分类的 data-id 值
        var id = $(this).attr('data-id');
        if (confirm('您是否要删除此分类?')) {
            //发送请求 实现删除
            $.ajax({
                url: '/categories/' + id,
                type: 'delete',
                success: function () {
                    //删除成功 重新刷新页面
                    location.reload();
                },
                error: function (err) {
                    //删除失败 显示错误
                    $('.alert-danger').show().html(JSON.parse(err.responseText).message)
                }
            })
        }
    })

    //获取全选按钮
    var cBoxAll = $('#checkedAll');
    //为全选按钮添加点击事件
    cBoxAll.on('click', function () {
        //获取全选按钮的状态
        var status = $(this).prop('checked');
        // console.log(status)
        // 找到其他用户的选择按钮 当全选按钮选中时 其余的按钮也跟随全选按钮选中
        $('#tBox').find('input').prop('checked', status);
        //如果全选按钮 为选中状态 则显示批量删除按钮 否则 则不显示
        if (status) {
            $('#plsc').show();
        } else {
            $('#plsc').hide();
        }
    })

    //为用户选择按钮添加选择状态 需要加事件委派
    $('#tBox').on('click', 'input', function () {
        //获取当前用户如果全选 则全选按钮也该被选中
        var inputs = $('#tBox').find('input')
        // console.log(inputs.length == inputs.filter(':checked').length)
        // 定义falg变量 接收当前判断返回的布尔值
        var falg = inputs.length == inputs.filter(':checked').length;
        if (falg) {
            // 如果为真 则说明 用户选择按钮已经被全部选择 此时的全选按钮 应该被选中
            cBoxAll.prop('checked', true);
        } else {
            // 否则 则说明 用户选择按钮没有全部被选中 则此时的全选按钮 不应该被选中
            cBoxAll.prop('checked', false);
        }
        //判断当前选中的input的长度 如果不为0 则显示批量删除按钮
        if (inputs.filter(':checked').length != 0) {
            $('#plsc').show();
        } else {
            $('#plsc').hide();
        }
    })

    //点击批量删除按钮 实现批量删除功能
    $('#plsc').on('click', function () {
        //定义一个空数组 接收选中input的id值
        var Ary = [];
        //获取当前选中的input
        var inputs = $('#tBox').find('input').filter(':checked');
        //遍历inputs 将inputs中input的id值 依次添加到Ary数组中
        inputs.each((index, item) => {
            // console.log(index)
            // console.log($(item).attr('data-id'))
            Ary.push($(item).attr('data-id'));
        });
        // console.log(Ary)
        // console.log(Ary.join('-'))
        //判断用户是否要批量删除选中的分类
        if (confirm('您确定要删除这些分类吗?')) {
            //发送请求 完成批量删除功能 
            $.ajax({
                url: '/categories/' + Ary.join('-'),
                type: 'delete',
                success: function (res) {
                    location.reload();
                },
                error: function (err) {
                    $('.alert-danger').show().html(JSON.parse(err.responseText).message)
                }
            })
        }
    })

    
})