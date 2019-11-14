$(function () {
  $.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function (res) {
      // console.log(res);
      var html = template('centerTpl', res);
      $('#userCenter').html(html)
    }
  })
  //为更新按钮添加事件委派事件
  $('#userCenter').on('submit', '#updateUser', function () {
    // alert(1);
    var id = $('.btn-primary').attr('data-id');
    var formData = $('#updateUser').serialize();
    // console.log(id);
    //发送请求 修改用户
    $.ajax({
      url: '/users/' + id,
      type: 'put',
      data: formData,
      success: function () {
        location.reload();
      }
    })
    //阻止表单默认提交行为
    return false;
  })

  //图片上传
  $('#userCenter').on('change', '#avatar', function () {
    //创建FormData对象
    var formData = new FormData();
    //为formData对象赋值
    // console.log(this.files[0]);
    formData.append('avatar', this.files[0]);
    //发送请求 完成图片上传
    $.ajax({
      url: '/upload',
      type: 'post',
      data: formData,
      processData: false,
      contentType: false,
      success:function(res){
        console.log(res);
        $('#immg').attr('src',res[0].avatar);
        $('#hiddenText').val(res[0].avatar);
      }
    })
  });
});