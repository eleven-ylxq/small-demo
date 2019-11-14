$(function () {
    var x = new URLSearchParams(location.search);
    var key = x.get('key');
    //根据关键词查询
    $.ajax({
        url: '/posts/search/' + key,
        success: function (res) {
            // console.log(res)
            var html = template('articleTpl', { data: res })
            $('.content .panel').html(html)
        }

    })
})