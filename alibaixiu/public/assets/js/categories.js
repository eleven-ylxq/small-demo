$(function () {
    //当分类添加表单发生提交事件的时候
    $('#addCategories').on('submit', function () {
        //获取当前添加的数据
        var formData = $(this).serialize();
        //发送请求 添加分类
        $.ajax({
            url: '/categories',
            type: 'post',
            data: formData,
            success: function () {
                location.reload();
            },
            error: function (err) {
                $('.alert-danger').show().html(JSON.parse(err.responseText).message)
            }
        })
        //阻止表单默认提交行为
        return false;
    })

    //查询数据库所有数据
    $.ajax({
        url: '/categories',
        success: function (res) {
            console.log(res)
            var html = template('cateTpl', { data: res });
            // console.log(html)
            $('#cateBox').html(html);
        }
    })

    //通过事件委派点击编辑按钮
    $('#cateBox').on('click', '.btn-info', function () {
        //获取当前编辑项的id
        var id = $(this).attr('data-id');
        // console.log(id);
        //根据id发送请求 查询分类
        $.ajax({
            url: '/categories/' + id,
            success: function (res) {
                // console.log(res)
                var html = template('editCate', res);
                $('#cateTotal').html(html);
            }
        })
    })

    //点击修改按钮
    $('#cateTotal').on('submit', '#editCategories', function () {
        //获取编辑按钮下的data-id的值
        var id = $('#edit').attr('data-id');
        //获取id为cateTotal的表单下的input name的属性值 并且进行拼接
        var formData = $(this).serialize();
        // console.log(formData) 
        //发送请求 完成修改
        $.ajax({
            type: 'put',
            url: '/categories/' + id,
            data: formData,
            success: function (res) {
                // console.log(res)
                // console.log(11)
                location.reload();
            },
            error: function (err) {
                $('.alert-danger').show().html(JSON.parse(err.responseText).message)
            }
        })
        return false
    })

    //根据id删除分类
    $('#cateBox').on('click', '#delete', function () {
        if (confirm('您确定要删除该分类吗?')) {
            // 获取当前删除分类的id
            var id = $(this).attr('data-id');
            //发送请求删除分类
            $.ajax({
                url: '/categories/' + id,
                type: 'delete',
                success: function () {
                    //删除成功
                    location.reload();
                },
                error: function (err) {
                    // 删除失败
                    Z
                }
            })
        }
    })

    //获取全选按钮状态
    var cBox = $('#checkAll');
    //给全选按钮设置change事件
    cBox.on('change', function () {
        //    console.log( $(this).prop('checked'))
        var status = $(this).prop('checked');
        $('#cateBox').find('input').prop('checked', status);
        //判断全选状态 显示或隐藏批量删除按键
        if (status) {
            $('#plsc').show();
        } else {
            $('#plsc').hide();
        }
    })

    //给分类中每个按钮添加change事件
    $('#cateBox').on('change', 'input', function () {
        //   console.log($(this).prop('checked'))
        var inputs = $('#cateBox').find('input')
        if (inputs.length == inputs.filter(':checked').length) {
            cBox.prop('checked', true);
        } else {
            cBox.prop('checked', false);
        }
        //判断批量删除的出现和隐藏
        if (inputs.filter(':checked').length == 0) {
            $('#plsc').hide();
        } else {
            $('#plsc').show();
        }
    })

    //点击批量删除删除分类
    $('#plsc').on('click', function () {
        var inputes = $('#cateBox').find('input').filter(':checked');
        var Ary = [];
        // console.log(inputes);
        inputes.each(function (index, ele) {
            // console.log(index);
            // console.log($(ele).attr('data-id'))
            Ary.push($(ele).attr('data-id'));
        })
        // console.log(Ary);
        if (confirm('您确定要删除这些分类?')) {
            //发送请求实现批量删除
            $.ajax({
                url: '/categories/' + Ary.join('-'),
                type: 'delete',
                success: function () {
                    location.reload();
                },
                error: function (err) {
                    $('.alert-danger').show().html(JSON.parse(err.responseText).message)
                }
            });
        }

    })
})