$(function () {
    //获取网站配置
    $.ajax({
        url: '/settings',
        success: function (res) {
            console.log(res);
            if (res) {
                $('#logoImg').attr('src', res.logo)
                $('#hiddenImg').val(res.logo)
                $('#site_name').val(res.title)
                $('#site_description').val(res.description)
                $('#site_keywords').val(res.keywords)
                $('#comment_status').prop('checked',res.comment)
                $('#comment_reviewed').prop('checked',res.review)
            }
        }
    })
    $('#logo').on('change', function () {
        var formData = new FormData();
        console.log(this.files[0]);
        formData.append('logo', this.files[0]);
        //图片上传
        $.ajax({
            url: '/upload',
            type: 'post',
            processData: false,
            contentType: false,
            data: formData,
            success: function (res) {
                // console.log(res);
                $('#logoImg').attr('src', res[0].logo)
                $('#hiddenImg').val(res[0].logo)
            }
        })
    })

    //保存网站配置
    $('#settingForm').on('submit', function () {
        console.log($(this).serialize());
        var formData = $(this).serialize();
        //发送请求 保存配置
        $.ajax({
            url: '/settings',
            type: 'post',
            data: formData,
            success: function (res) {
                console.log(res);

            }
        })
        return false
    });

})