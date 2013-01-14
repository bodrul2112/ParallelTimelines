
define(["thirdparty/jQuery", "services/TemplateService", "timeline/marker/Marker","timeline/marker/TimeIntervalFactory"], function( jQuery, tpl, Marker, TimeIntervalFactory ){
	
	var MarkerController = function( eViewContainer ){
		
		this.m_oMainTimeLine;
		this.m_eViewContainer = eViewContainer;
		this.m_oTimeIntervalFactory = new TimeIntervalFactory();
		this.m_pMarkers = [];
	}
	
	MarkerController.prototype.setMainTimeLine = function( oTimeLine ){
		
		
		if( this.m_oMainTimeLine != oTimeLine ){
			this.m_oMainTimeLine = oTimeLine;
			console.log("creating markers");
			this._createMarkers();
			this.m_oMainTimeLine.setSynced( true );
		}else{
			if( !this.m_oMainTimeLine.isSynced() ){
				console.log("creating markers 2");
				this._createMarkers();
				this.m_oMainTimeLine.setSynced( true );
			}
		}
		
	}
	
	MarkerController.prototype.getMarkers = function() {
		return this.m_pMarkers;
	}
	
	MarkerController.prototype._createMarkers = function() {
		
		var mTimeParams = this.m_oTimeIntervalFactory.calculateIntervals( this.m_oMainTimeLine.getStartDateMillis(),  this.m_oMainTimeLine.getEndDateMillis() );
		var pMarkerTimes = mTimeParams.times; 
		
		//debugger;
		for(var i=0; i<this.m_pMarkers.length; i++){
			this.m_pMarkers[i].destroy();
		}
		
		this.m_pMarkers = [];
		
		var j=0;
		for(var i=0; i<pMarkerTimes.length; i++){
			 var oMarker = new Marker( pMarkerTimes[i], j, this.m_eViewContainer );
			 j++;
			 this.m_pMarkers.push( oMarker );
		}
	}
	
	
	// going to be switching the main timeline, trying to think ahead a wee bit
	MarkerController.prototype.renderMarkers = function(){
		
		// TODO:don't ask me about this...just..dont..give me back my half hour of life
		var nContainerHeight = this.m_eViewContainer.height();
		
		for(var i=0; i<this.m_pMarkers.length; i++){
			
			this.m_pMarkers[i].setDateFormat("");
			this.m_pMarkers[i].render( this.m_oMainTimeLine, nContainerHeight );
		}
	}
	
	return MarkerController;
	
});