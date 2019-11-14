$(function () {
    // console.log(location.search);
    var id = getSearchURL('id')
    //判断用户是否点击了编辑 如果id不等于-1 则说明 id的值存在 即为编辑操作
    if (id != -1) {
        $('#edit').show();
        $('#editSub').show();
        $.ajax({
            url: '/posts/' + id,
            success: function (res) {
                console.log(res);
                $('#title').val(res.title);
                $('#content').val(res.content);
                //特色图片
                if (res.thumbnail != '') {
                    $('.thumbnail').show().attr('src', res.thumbnail);
                    $('#thumbnailId').val(res.thumbnail)
                }
                $('#category').val(res.category._id)
                $('#status').val(res.state)
            }
        })
    }else {
        $('#add').show();
        $('#addSub').show();
    }

    //发送请求 查询分类列表
    $.ajax({
        url: '/categories',
        success: function (res) {
            // console.log(res)
            // res即为当前查询到数据库的所有值
            var html = template('postAddTpl', { data: res });
            //将查询到的值 渲染在页面中
            $('#category').html(html);
        },
        error: function () {
            $('.alert-danger').show().html(JSON.parse(err.responseText).message)
        }
    });

    //图片上传change事件
    $('#feature').on('change', function () {
        //创建FormData对象
        var formData = new FormData();
        //当图片上传是给formData添加属性值
        formData.append('cover', this.files[0]);
        // console.log(this.files[0]);
        //发送请求
        $.ajax({
            url: '/upload',
            type: 'post',
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                console.log(res)
                $('.thumbnail').show().attr('src', res[0].cover)
                $('#thumbnailId').attr('value', res[0].cover)
            }
        })
    })

    //给文章表单添加submit事件
    $('#articleSave').on('submit', function () {
        var formData = $(this).serialize();
        // console.log(formData)
        if (id != -1) {
            $.ajax({
                url: '/posts/' + id,
                type: 'put',
                data: formData,
                success: function (res) {
                    location.href = '/admin/posts.html'
                }
            })
        } else {
            //发送请求创建文章
            $.ajax({
                url: '/posts',
                type: 'post',
                data: formData,
                success: function (res) {
                    console.log(res)
                    location.href = '/admin/posts.html'
                },
                error: function (err) {
                    $('.alert-danger').show().html(JSON.parse(err.responseText).message)
                }
            })
        }


        return false;
    })


    console.log(id);
    //封装函数
    function getSearchURL(name) {
        //   console.log(location.search.substring(1));  
        var searchAry = location.search.substring(1).split('&');

        for (var i = 0; i <= searchAry.length - 1; i++) {
            console.log(searchAry[i].split('='));
            var falg = searchAry[i].split('=');
            if (falg[0] == name) {
                return falg[1];
            }
        }
        return -1;
    }
})