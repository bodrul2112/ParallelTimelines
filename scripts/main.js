

require( ["plugins/domReady","thirdparty/jquery", "timeline/TimeLineController"], function(domReady, jQuery, TimeLineController){
	
	domReady(function(){
		
		require(["thirdparty/jquery", "timeline/TimeLineController"], function(jQuery, TimeLineController) {
			
			var oTimeLineController = new TimeLineController();
			var eTimeLineContainer = $('.timeline_container');
			var eTimeLineContainerWrapper = $('.timeline_wrapper');
			oTimeLineController.setViewElement( eTimeLineContainer, eTimeLineContainerWrapper );
			oTimeLineController.addTimeLineToView( "world" );
			oTimeLineController.addTimeLineToView( "topline" );
			oTimeLineController.renderTimeLines();
			
		});
		
	});

});

