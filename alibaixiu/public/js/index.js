$(function () {
    //获取轮播图列表
    $.ajax({
        url: '/slides',
        success: function (res) {
            // console.log(res[0].image);
            // console.log(res);
            var str = '';
            $(res).each((index, item) => {
                // console.log(item);
                // console.log(index);
                if (index == 0) {
                    str += '<span class="active"></span>'
                } else {
                    str += '<span></span>'
                }
            });
            // // console.log(str);
            $('.cursor').html(str)
            for (var i = 0; i <= res.length - 1; i++) {
                res[i].image = res[i].image.substring(1)
            }

            // res.image = res.image.substring(1);
            var html = template('slidesShow', { data: res })
            $('#imgshow').html(html);
            //轮播图效果
            var swiper = Swipe(document.querySelector('.swipe'), {
                auto: 2000,

                transitionEnd: function (index) {
                    // index++;

                    $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
                }
            });

            // 上/下一张
            $('.swipe .arrow').on('click', function () {
                var _this = $(this);

                if (_this.is('.prev')) {
                    swiper.prev();
                } else if (_this.is('.next')) {
                    swiper.next();
                }
            })
        }
    })

    //获取最新发布
    $.ajax({
        url: '/posts/lasted',
        success: function (res) {
            // console.log(res)
            var html = template('releaseTpl', { data: res })
            // console.log(html)
            $('#newest').html(html)
        }
    })

});