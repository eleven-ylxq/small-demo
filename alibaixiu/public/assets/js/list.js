$(function () {
    //获取导航栏点击传过来的id值
    var x = new URLSearchParams(location.search);
    var id = x.get('cateId');
    // console.log(id)
    //根据分类id查询分类
    $.ajax({
        url: '/categories/' + id,
        success: function (res) {
            // console.log(res)
            var html = template('titleTpl', res)
            $('.panel').html(html);
        }
    })
    //根据分类id查询文章列表
    $.ajax({
        url: '/posts/category/' + id,
        success:function (res) {
            // console.log(res);
            var html = template('articleTpl',{data:res})
            $('.panel').append(html)
        }
    })
})