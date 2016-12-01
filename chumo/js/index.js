$(function(){
    /*******阻止浏览器默认行为*********/
    $("#fullpage").mousedown(function(e){
        e.preventDefault();
    });
    $("#fullpage").mousemove(function(e){
        e.preventDefault();
    });
    /*******滚屏触摸*********/
    var ht=$(window).height();
    var num=0;
    var flag=true;
    touch.on("body","swipeup","#fullpage",function(){
        if(!flag){
            return;
        }
        num++;
        if(num>=$("section").length){
            num=$("section").length-1;
            return
        }
        flag=false;
        $("#fullpage").css({marginTop:-num*ht});
    })
    touch.on("body","swipedown","#fullpage",function(){
        if(!flag){
            return;
        }
        num--;
        if(num==-1){
            num=0;
            return
        }
        $("#fullpage").css({marginTop:-num*ht});
        flag=false;
    });

    $("#fullpage")[0].addEventListener("webkitTransitionEnd",function(){
        flag=true;
        $("section").each(function(index,obj){
            if(num==0){
                return
            }
            if(num!==0){
                if(index==num){
                    $(obj).find(".bdtitle").css({
                        transform:"translateX(0px)",
                        transition:"all 0.6s ease",
                        opacity:1
                    });
                    $(obj).find(".bdcon").css({
                        transform:"translateX(0px)",
                        transition:"all 0.6s ease",
                        opacity:1
                    })
                }else{
                    $(obj).find(".bdtitle").css({
                        transform:"translateX(-50px)",
                        opacity:0
                    });
                    $(obj).find(".bdcon").css({
                        transform:"translateX(50px)",
                        opacity:0
                    })
                }
            }

        })
    });

    var flag1=true;
    $(".flag").click(function(){
        if(flag1){
            $(".navcopy>a").css("display","block");
            $(".flag .bt").addClass("btd");
            $(".navcopy>a").each(function(index,obj){
                $(".navcopy>a").eq(index).css({
                    transition:"all 1s ease "+index*0.2+"s",
                    transform:"rotateX(0deg)",
                    opacity:1
                })

            });

            flag1=false;
        } else if(!flag1){
            $(".flag .bt").removeClass("btd");
            $(".navcopy>a").each(function(index,obj){
                $(".navcopy>a").eq(index).css({
                    transition:"all 1s ease "+(0.6-index*0.1)+"s",
                    transform:"rotateX(-45deg)",
                    opacity:0
                })
            })
                $(".navcopy>a").css("display","none");

            flag1=true;
        }
    });
      /*********检测浏览器大小**********/
    $(window).resize(function(){
        var clientW=$(window).width();
        var clientH=$(window).height();
        $("#fullpage").css({marginTop:-num*clientH});
        if(clientW>=1000){
            $(".navcopy>a").css({
                opacity:0,
                transform:"rotateX(-45deg)"
            })
            $(".flag .bt").removeClass("btd");
            flag1=true;

        }
    })

});

