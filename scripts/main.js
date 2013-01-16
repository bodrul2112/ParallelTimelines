

require( ["plugins/domReady"], function(domReady){
    
	
	
	domReady(function(){
		
		require(["thirdparty/jquery", "timeline/TimeLineController"], function(jQuery, TimeLineController) {
			
			
			
			
			var oTimeLineController = new TimeLineController();
			var eTimeLineContainer = $('.timeline_container');
			var eTimeLineContainerWrapper = $('.timeline_wrapper');
			oTimeLineController.setViewElement( eTimeLineContainer, eTimeLineContainerWrapper );
			oTimeLineController.addTimeLineToView( "world" );
			oTimeLineController.renderTimeLines();
			
			
			
			/*
			var oTimeLine = new TimeLine();
			var eTimeLine = oTimeLine.getElement();
			
			
			eTimeLineContainer.append( eTimeLine );
			
			var fResize = function() {
				eTimeLine.css('top', (eTimeLineContainer.height()/2)+"px" );
				console.log("resizing");
			};
			$(window).resize( fResize );
			fResize();
			*/
			
		
			
		});
		
//		console.log("loaded");
//		document.addEventListener('touchmove', function(e){ e.preventDefault(); });
//		myScroll = new iScroll('scroller', { checkDOMChanges: false, bounce: true, momentum: true });
//		myScroll.refresh();
	});
	//This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
	//sugoi
});

