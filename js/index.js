var startY,moveY,endY;
var nowIndex,nextIndex;
var viewHeight=$(window).height();
$(function(){
    $(document).on('touchmove',function (event) {
        event.preventDefault();
    })

    //预加载

    function loadFn(){
        var nums=0;
        //图片路径
        var imgArr=[];
        for(var i = 0 ; i<imgArr.length ; i++){
            var imgObj=new Image();
            imgObj.src=imgArr[i];
            imgObj.onload=function(){
                console.log('图片正在加载');
                nums++;
                var s=parseInt(num/imgArr.length*100);
                s=s+'%';

                if(nums==imgArr.length){
                    //删除动画
                }
            }

            imgObj.onerror=function(){
                //防止图片加载失败程序阻塞
            }
        }

    }
    loadFn();


    $('#list li').on('touchstart',function(event){
        startY = event.originalEvent.changedTouches[0].pageY;
        nowIndex=$(this).index();
        console.log(nowIndex);
        $('#list li').on('touchmove',moveFn);

        $('#list li').on('touchend',endFn);
    })
    $('#list li').on('webkitTransitionEnd transitionEnd',function(){
        $('#list li').css('transition','');
        $('#list li').eq(nextIndex).siblings('li').hide();
        $('#list li').on('touchstart',function(event){
            startY = event.originalEvent.changedTouches[0].pageY;
            nowIndex=$(this).index();
            console.log(nowIndex);
            $('#list li').on('touchmove',moveFn);

            $('#list li').on('touchend',endFn);
        })
    })
})
function endFn(event){
    endY = event.originalEvent.changedTouches[0].pageY;
    console.log(startY);
    console.log(endY);
    if(endY!=startY){
        $('#list li').off('touchstart touchmove touchend');
    }
    $('#list li').eq(nextIndex).css({'top':0});
    $('#list li').eq(nextIndex).css({'transition':'all 1s ease 0s'})

}
function moveFn(event) {
    moveY = event.originalEvent.changedTouches[0].pageY;
    if(moveY<startY){
        //向上滑
        nextIndex=nowIndex+1;
        if(nextIndex>8){
            nextIndex=0;
        }
        $('#list li').eq(nextIndex).show().addClass('current').siblings('li').removeClass('current');
        //top值
        var s=startY-moveY;
        $('#list li').eq(nextIndex).css({'top':viewHeight-s});
    }else if(moveY>startY){
        //向下滑
        nextIndex=nowIndex-1;
        if(nextIndex<0){
            nextIndex=8;
        }
        $('#list li').eq(nextIndex).show().addClass('current').siblings('li').removeClass('current');
        var s=moveY-startY;
        $('#list li').eq(nextIndex).css({'top':-viewHeight+s});
    }else{
        //回到原点
        console.log('。。。。');
    }
}

