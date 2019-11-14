$(function () {
    //查询文章数量
    $.ajax({
        url: '/posts/count',
        success: function (res) {
            console.log(res);
            $('.list-group').find('li').eq(0).html('<strong>' + res.postCount + '</strong>篇文章（<strong>' + res.draftCount + '</strong>篇草稿）');
        }
    })

    //查询分类数量
    $.ajax({
        url: '/categories/count',
        success: function (res) {
            $('.list-group').find('li').eq(1).html('<strong>' + res.categoryCount + '</strong>个分类')
        }
    })

    //查询评论数量
    $.ajax({
        url: '/comments/count',
        success: function (res) {
            console.log(res);
            $('.list-group').find('li').eq(2).html('<strong>' + res.commentCount + '</strong>条评论')
        }
    })
})