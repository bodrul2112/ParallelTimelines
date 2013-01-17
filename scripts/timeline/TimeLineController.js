
define(["thirdparty/jquery", "historicpoint/HistoricPointFactory", "timeline/TimeLine", "timeline/Marker/MarkerController", "navigation/MotionController"], function( jQuery, HistoricPointFactory, TimeLine, MarkerController, MotionController ){
	
	var TimeLineController = function(){

		this.m_oHistoricPointFactory = new HistoricPointFactory();
		this.m_oMarkerController;
		this.m_eViewContainer;
		this.m_eViewContainerWrapper;
		this.m_pViewableTimeLines = [];
		this.m_oMainTimeLine;
		window.timeline = this;
		this.m_oMotionController = new MotionController(this);
		
		this.m_nIncrementPixels = 500;
		
		this.m_nViewPortStartTime = null;
		this.m_nViewPortEndTime = null;
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
		
		// database timez ;'p
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
	
	//Yes i know, this is bad code. I'll change it later. (or never)
	TimeLineController.prototype.setViewElement = function( eViewContainer, eViewContainerWrapper ){
		
		this.m_eViewContainer = eViewContainer;
		this.m_eViewContainerWrapper = eViewContainerWrapper;
		this.m_oMarkerController = new MarkerController( eViewContainer );
		this.m_eViewContainer.append( this.m_eElement );
		this.m_eViewContainer.css("left",-this.m_eViewContainerWrapper.width()/2)
		$(window).resize( this.onResize.bind(this) );
	}
	
	TimeLineController.prototype.getViewElement = function(){
		
		return this.m_eViewContainer; 
	}
	
	TimeLineController.prototype.getViewElementWrapper = function(){
		
		return this.m_eViewContainerWrapper;
	}
	
	TimeLineController.prototype.getMainTimeLine = function(){
		for(var i=0; i<this.m_pViewableTimeLines.length; i++){
			if(this.m_pViewableTimeLines[i].isMain()){
				return this.m_pViewableTimeLines[i];
			}
		}
	}
	
	
	TimeLineController.prototype.renderTimeLines = function( ) {
		
		
		
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
			this.m_oMainTimeLine = oMainTimeLine;
		}
		
		this._configureViewPortTimes();
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
	
	TimeLineController.prototype.incrementallyMoveBackward = function(){

		nLeft = this.m_eViewContainer.position().left + this.m_nIncrementPixels;
		this.m_eViewContainer.css("left", nLeft);
		
		this._configureViewPortTimes();
	}
	
	TimeLineController.prototype.incrementallyMoveForward = function(){

		nLeft = this.m_eViewContainer.position().left - this.m_nIncrementPixels;
		this.m_eViewContainer.css("left", nLeft);
		
		this._configureViewPortTimes();
//		var nExtendTimeLine = this.m_nIncrementPixels * this._getTimePerPixel();
//		this.m_oMainTimeLine.setEndDateMillis( this.m_oMainTimeLine.getEndDateMillis() + nExtendTimeLine);
//		this.renderTimeLines();
		
		//nLeft = this.m_eViewContainer.position().left + this.m_nIncrementPixels;
		//this.m_eViewContainer.css("left", nLeft);
	}
	
	TimeLineController.prototype._configureViewPortTimes = function(){

		var nLeft = -this.m_eViewContainer.position().left;

		var nTimePerPixel = this._getTimePerPixel();
		var nTimeMovedStart = nLeft * nTimePerPixel;
		var nTimeMovedEnd = (nLeft+this.m_eViewContainerWrapper.width()) * nTimePerPixel;
		this.m_nViewPortStartTime = this.m_oMainTimeLine.getStartDateMillis()+nTimeMovedStart;
		this.m_nViewPortEndTime = this.m_oMainTimeLine.getStartDateMillis()+nTimeMovedEnd;
		
		console.log("VP, start time is " + new Date(this.m_nViewPortStartTime) + ", end time is " + new Date(this.m_nViewPortEndTime));
	}
	
	TimeLineController.prototype._getTimePerPixel = function(){
		
		var nStartDate = this.m_oMainTimeLine.getStartDateMillis();
		var nEndDate = this.m_oMainTimeLine.getEndDateMillis();
		var nTimeDifferance = nEndDate - nStartDate;
		var nTimePerPixel = nTimeDifferance / this.m_eViewContainer.width();
		return nTimePerPixel;
	}
	
	return TimeLineController;
	
});