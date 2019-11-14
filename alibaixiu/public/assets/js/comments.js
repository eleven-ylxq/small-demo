$(function () {
    //获取评论列表
    $.ajax({
        url: '/comments',
        success: function (res) {
            // console.log(res)
            var html = template('commentsTpl', res);
            // console.log(html)
            //渲染评论页面
            $('#commentsBox').html(html);
            var page = template('listTpl', res)
            $('.pagination-sm').html(page);
        }
    })

    //实现分页
    function changePage(page) {
        $.ajax({
            url: '/comments',
            data: {
                page: page
            },
            success: function (res) {
                console.log(res)
                var html = template('commentsTpl', res);
                // console.log(html)
                //渲染评论页面
                $('#commentsBox').html(html);
                var page = template('listTpl', res)
                $('.pagination-sm').html(page);
            }
        })
    }
    window.changePage = changePage

    // //当审核按钮被点击时
    $('#commentsBox').on('click', '.status', function () {
        //获取当评论的状态
        var state = $(this).attr('data-state')

        //获取当前要修改评论的id
        var id = $(this).attr('data-id')
        // console.log(state)
        //发送请求 更改状态
        $.ajax({
            type: 'put',
            url: '/comments/' + id,
            data: {
                state: state == 0 ? 1 : 0
            },
            success: function () {
                location.reload();
            }
        })

    })

    //删除评论
    $('#commentsBox').on('click', '.delete', function () {
        var id = $(this).attr('data-id');
        // console.log(id)
        if (confirm('您是否要删除该评论?')) {
            //发送请求删除评论
            $.ajax({
                url: '/comments/' + id,
                type: 'delete',
                success:function () {
                    location.reload();
                }
            })
        }
    })
})