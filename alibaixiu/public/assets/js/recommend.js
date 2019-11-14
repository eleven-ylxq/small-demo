
$(function () {
  $('.search form').attr('action', 'search.html')
  $('.search form .keys').attr('name', 'key')

  //发送请求 索要热门推荐数据
  $.ajax({
    url: '/posts/recommend',
    success: function (res) {
      // console.log(res)
      // 创建模板字符串
      var recommendTpl = `
            {{each data}}
            <li>
            <a href="detail.html?id={{$value._id}}">
              <img src="{{$value.thumbnail}}" alt="">
              <span>{{$value.title}}</span>
            </a>
          </li>
          {{/each}}
            `
      var html = template.render(recommendTpl, { data: res });
      // console.log(html)
      //渲染模板字符串到页面
      $('#hot').html(html);
    }
  })

  //Random recommended 随机推荐
  $.ajax({
    url: '/posts/random',
    success: function (res) {
      // console.log(res)
      var randomTpl = `
            {{each data}}
            <li>
            <a href="detail.html?id={{$value._id}}">
              <p class="title">{{$value.title}}</p>
              <p class="reading">阅读({{$value.meta.views}})</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
              </div>
            </a>
          </li>
          {{/each}}`
      var html = template.render(randomTpl, { data: res });
      //   console.log(randomTpl)
      //   console.log(html)  
      //渲染随机推荐页面
      $('#randomRecommend').html(html)
    }
  })

  //最新评论
  $.ajax({
    url: '/comments/lasted',
    success: function (res) {
      console.log(res)

      var comments = `
        {{each list}}
        {{if $value.state==1}}
        <li>
        <a href="/detail.html?id={{$value.post}}">
          <div class="avatar">
            <img src="{{$value.author.avatar}}" alt="">
          </div>
          <div class="txt">
            <p>
              <span>{{$value.author.nickName}}</span>{{$value.createAt.substring(0,10)}}说:
            </p>
            <p>{{$value.content}}</p>
          </div>
        </a>
      </li>
      {{/if}}
      {{/each}}`
      var html = template.render(comments, { list: res })
      $('.discuz').html(html);


    }
  })

  //导航栏动态显示
  $.ajax({
    url: '/categories',
    success: function (res) {
      // console.log(res)
      var strnav = `
                {{each list}}
                <li><a href="/list.html?cateId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
                {{/each}}`
      // console.log(strnav)
      var html = template.render(strnav, { list: res })
      // console.log(html)
      $('.nav').html(html)
      $('.topnav ul').html(html)
    }

  })


})