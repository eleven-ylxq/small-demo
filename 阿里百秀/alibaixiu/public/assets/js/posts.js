$(function () {
    //获取地址栏page的值
    var x = new URLSearchParams(location.search);
    var page = x.get('page');
    page = page || 1;
    //获取文章列表
    $.ajax({
        url: '/posts',
        data: {
            page: page
        },
        success: function (res) {
            console.log(res.pages)
            //判断page是否大于pages 如果大于 则让page到pages那一页
            if (page > res.pages) {
                location.href = '/admin/posts.html?page=' + res.pages;
                return;
            }
            //创建模板引擎
            var html = template('articleTpl', res);
            // 渲染页面
            $('#tBox').html(html);
            var pagelist = template('pageTpl', res);
            // console.log(page)
            //渲染页面
            $('#pagelist').html(pagelist);
        }
    })

    //查询分类列表
    $.ajax({
        url: '/categories',
        success: function (res) {
            console.log(res)
            var classify = template('classTpl', { data: res })
            // console.log(classify)
            $('#classifylist').html(classify);
        }
    })

    //当筛选框发生提交事件的时候
    $('#screenForm').on('submit',function () {
        var category = $('#classifylist').val();
        var state = $('#state').val();
        var data = {};

        if(category != -1) {
            data.category = category;
        }
        if(state!=-1) {
            data.state = state;
        }

        //查询分类
        $.ajax({
            url:'/posts',
            data:data,
            success:function (res) {
                console.log(res)
            }
        })
        return false
    })
})