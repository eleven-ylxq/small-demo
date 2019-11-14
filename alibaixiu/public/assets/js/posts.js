$(function () {
    //获取地址栏中的参数
    var x = new URLSearchParams(location.search);
    var page = x.get('page') || 1;
    // page = page < 0 ? 1 : page
    // page = page > pages ? pages : page
    //发送请求 实现列表数据展示功能
    $.ajax({
        url: '/posts',
        data: {
            page: page
        },
        success: function (res) {
            if (page > res.pages) {
                location.href = '/admin/posts.html?page=' + res.pages
                return
            }
            //查询分类
            $.ajax({
                url: '/categories',
                success: function (res) {
                    // console.log(res)
                    var select = template('selectTpl', { data: res });
                    // console.log(select)
                    $('#selectT').html(select)
                    // var state = template('stateTpl',{data:res});
                    // $('#stateT').html(state)
                }
            })
            var html = template('postsTpl', res);
            $('#tBox').html(html);
            html = template('pageTpl', res);
            $('.pagination').html(html)


        }
    });

    //封装处理事件函数
    function dateformat(date) {
        //转换为字符串对象
        date = new Date(date);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    window.dateformat = dateformat

    // 筛选
    $('#shaixuan').on('click', function () {
        //获取当前用户点击的分类id
        var category = $('#selectT').val();
        // 获取当前用户点击完成状态的value值
        var state = $('#stateT').val();
        //创建一个空对象接收参数
        var data = {};
        //判断category不等于-1 则说明当前category中有 有效的值
        if (category != -1) {
            data.category = category;
        }

        //判断state的值不等于-1 则说明当前state中有 有效的值
        if (state != -1) {
            data.state = state;
        }
        //发送请求
        //查询分类
        $.ajax({
            url: '/posts',
            data: data,
            success: function (res) {
                var html = template('postsTpl', res);
                $('#tBox').html(html);
                html = template('pageTpl', res);
                $('.pagination').html(html)
            }
        })
        return false
    })

    //删除操作 事件委派
    $('#tBox').on('click', '#delete', function () {
        var id = $(this).attr('data-id');
        console.log(id)
        if (confirm('您是否要删除该文章?')) {
            //发送ajax请求实现删除
            $.ajax({
                url: '/posts/' + id,
                type: 'delete',
                success:function () {
                    console.log(1)
                    location.reload();
                },
                // error:function (err) {
                //     // console.log(err)
                // }
            })
        }
    })


    
    //批量删除操作
    $('#plsc').on('click',function () {
        
    })

})
