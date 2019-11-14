$(function () {
    //获取id
    var x = new URLSearchParams(location.search);
    var id = x.get('id');
    // console.log(id)
    //通过id获取文章
    $.ajax({
        url: '/posts/' + id,
        success: function (res) {
            // console.log(res)
            var html = template('articleTpl', res)
            //渲染文章
            $('.hots').before(html)
            //获取用户是否登录 和 管理员是否开启评论功能
            $.ajax({
                url: '/settings',
                success: function (res) {
                    // console.log(res)
                    // console.log(isLogin)
                    if (isLogin) {
                        if (res.comment) {
                            //评论
                            var str = `<div id="comments" style="margin-top:10px">
                             <form>
                               <textarea placeholder="请输入您评论的内容" style="width: 100%;height: 200px;outline: none;resize: none;" name="" id="" cols="30" rows="10"></textarea>
                               <input style="width: 100px;height: 50px;font-size: 15px;color: black;font-weight: 600;" type="submit" value="提交评论">
                             </form>
                            </div>`
                            $('.content .meta').after(str)
                        } else {
                            var str = `<div id="comments" style="margin-top:10px;">
                            
                            
                               <textarea style="width: 100%;height: 200px;outline: none;resize: none;" disabled="disabled" name="" id="" cols="30" rows="10"> 管理员暂时未开启评论功能,暂时无法评论该文章,请联系管理员</textarea>
                               <input style="width: 100px;height: 50px;font-size: 15px;color: black;font-weight: 600;" disabled type="submit" value="提交评论">
                             
                           </div>`
                            $('.content .meta').after(str)
                        }
                    } else {
                        var str = `<div id="comments" style="margin-top:10px;position: relative;z-index:999">
                               <textarea style="width: 100%;height: 200px;outline: none;resize: none;" disabled="disabled" name="" id="" cols="30" rows="10">请输入您的评论</textarea>
                               <input style="width: 100px;height: 50px;font-size: 15px;color: black;font-weight: 600;" disabled type="submit" value="提交评论">
                               <div style="width:100%;height:200px;position:absolute;left:0;top:0;background:rgba(0,0,0,.2);text-align:center;line-height:200px">您当前未登录,请<a href="/admin/login.html">先登录</a>在进行评论操作</div>
                           </div>`
                        $('.content .meta').after(str)
                    }

                }
            })

        }
    })

    $('.content').on('click', '.like', function () {
        //发送点赞ajax请求
        $.ajax({
            url: '/posts/fabulous/' + id,
            type: 'post',
            success: function (res) {
                console.log(res)
                $('.like span').html('赞(' + res.meta.likes + ')')
            }
        })
    })

    $('.content').on('click', '.stamp', function () {
        //发送点赞ajax请求
        $.ajax({
            url: '/posts/subtract/' + id,
            type: 'post',
            success: function (res) {
                console.log(res)
                $('.stamp span').html('踩(' + res.meta.subtract + ')')
            }
        })
    })

    //点击评论
    $('.content').on('submit', '#comments form', function () {
        var state;
        // alert(1);
        var content = $('textarea').val();
        $.ajax({
            url: '/settings',
            success: function (res) {
                console.log(res.comment)
                if (res.review) {
                    state = 0;
                } else {
                    state = 1;
                }
                //发送请求完成评论
                $.ajax({
                    type: 'post',
                    url: '/comments',
                    data: {
                        state: state,
                        content: content,
                        post: id
                    },
                    success:function (res) {
                        // alert('评论成功')
                        location.reload();
                    }

                })
            }
        })
        return false
    })
})