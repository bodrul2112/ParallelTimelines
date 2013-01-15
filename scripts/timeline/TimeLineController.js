
define(["thirdparty/jquery", "historicpoint/HistoricPointFactory", "timeline/TimeLine", "timeline/Marker/MarkerController", "navigation/MotionController"], function( jQuery, HistoricPointFactory, TimeLine, MarkerController, MotionController ){
	
	var TimeLineController = function(){

		this.m_oHistoricPointFactory = new HistoricPointFactory();
		this.m_oMarkerController;
		this.m_eViewContainer;
		this.m_pViewableTimeLines = [];
		window.timeline = this;
		this.m_oMotionController = new MotionController(this);
	}
	
	TimeLineController.prototype.addRandomHistoricPoints = function( oTimeLine ){
		
		var nStartDate = oTimeLine.getStartDateMillis();
		var nEndDate = oTimeLine.getEndDateMillis();
		var nPoints = 15; 
		
		var pHistoricPoints = this.m_oHistoricPointFactory.createRandomPointsBetween(nStartDate, nEndDate, nPoints);
		for(var i=0; i<pHistoricPoints.length; i++){
			oTimeLine.addHistoricPoint( pHistoricPoints[i] );
		}
	}
	
	TimeLineController.prototype.combine = function( oTimeLineA, oTimeLineB ){
		
		var oCombinedTimeLine = new TimeLine();
		oCombinedTimeLine.addHistoricPoints( oTimeLineA.getHistoricPoints() );
		oCombinedTimeLine.addHistoricPoints( oTimeLineB.getHistoricPoints() );
		oCominedTimeLine.setStartEndDateMillis( Math.min(oTimeLineA.getStartDateMillis(), oTimeLineB.getStartDateMillis()), 
												Math.max(oTimeLineA.getEndDateMillis(), oTimeLineB.getEndDateMillis()));
		
		
		
	}
	
	TimeLineController.prototype.addUserTimeLinesToView = function( oUser ){
		
		// database timez
	}
	
	TimeLineController.prototype.addTimeLineToView = function( sTimeLineName ){
		
		if( sTimeLineName == "world" ){
			
			var nStartDate = (new Date("1990-01-01 12:00:00")).getTime();
			var nEndDate = (new Date("2000-01-01 12:00:00")).getTime();
			var oTimeLine = new TimeLine( nStartDate, nEndDate );
			oTimeLine.setAsMain(true);
			this.addRandomHistoricPoints( oTimeLine );
			this.m_pViewableTimeLines.push( oTimeLine );
		}
	}
	
	TimeLineController.prototype.setViewElement = function( eViewContainer ){
		
		this.m_eViewContainer = eViewContainer;
		this.m_oMarkerController = new MarkerController( eViewContainer );
		this.m_eViewContainer.append( this.m_eElement );
		$(window).resize( this.onResize.bind(this) );
	}
	
	TimeLineController.prototype.getViewElement = function(){
		
		return this.m_eViewContainer; 
	}
	
	TimeLineController.prototype.getMainTimeLine = function(){
		for(var i=0; i<this.m_pViewableTimeLines.length; i++){
			if(this.m_pViewableTimeLines[i].isMain()){
				return this.m_pViewableTimeLines[i];
			}
		}
	}
	
	
	TimeLineController.prototype.renderTimeLines = function( ) {
		
		//debugger;
		var oMainTimeLine;
		for(var i=0; i< this.m_pViewableTimeLines.length; i++){
			
			oTimeLine = this.m_pViewableTimeLines[i];
			
			if(oTimeLine.isMain()){
				oMainTimeLine = oTimeLine;
			}
			
			this.m_eViewContainer.append( oTimeLine.getElement() );
		}
		
		if( oMainTimeLine ){
			oTimeLine.setY( this.m_eViewContainer.height()/2 );
			oTimeLine.render();
			this.m_oMarkerController.setMainTimeLine( oMainTimeLine );
			this.m_oMarkerController.renderMarkers();
		}
		debugger;
		this.m_oMotionController.render();
		
	}
	
	TimeLineController.prototype.onResize = function() {
		this.renderTimeLines();
	}
	
	TimeLineController.prototype.setAllTimeLinesToStartEndDates = function(nStartDate, nEndDate){
		
		for(var i=0; i<this.m_pViewableTimeLines.length; i++){
			var oTimeLine = this.m_pViewableTimeLines[i];
			oTimeLine.setStartEndDateInMillis( nStartDate, nEndDate );
		}
		
		this.renderTimeLines();
	}
	
	TimeLineController.prototype.bindMotionController = function(){
		this.m
	}
	
	return TimeLineController;
	
	
});