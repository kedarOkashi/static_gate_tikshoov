$(document).ready(function(){
  if($(window).width() < 767 ) {
	  $("#bxSliderMobile").bxSlider({
      autoStart:(($("#bxSliderMobile li").length > 1)? true:false),
	  pager:(($("#bxSliderMobile li").length > 1)? true:false),
	  controls:true,
	  auto:true,
	  mode: 'fade'
  // 	video:true
	});
  }else{
	  $("#bxSliderDesktop").bxSlider({
      autoStart:(($("#bxSliderDesktop li").length > 1)? true:false),
	  pager:(($("#bxSliderDesktop li").length > 1)? true:false),
	  controls:true,
	  auto:true,
	  mode: 'fade'
  // 	video:true
	});
  }
});