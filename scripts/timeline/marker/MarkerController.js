
define(["thirdparty/jQuery", "services/TemplateService", "timeline/marker/Marker","timeline/marker/TimeIntervalFactory"], function( jQuery, tpl, Marker, TimeIntervalFactory ){
	
	var MarkerController = function( eViewContainer ){
		
		this.m_oMainTimeLine;
		this.m_eViewContainer = eViewContainer;
		this.m_oTimeIntervalFactory = new TimeIntervalFactory();
		
		this.m_pMarkerTimes = [];
		this.m_pMarkers = [];
		
		this.m_bDrawn = false;
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
	
	MarkerController.prototype._markerWithinWindow = function() {
		
	}
	
	MarkerController.prototype._createMarkers = function() {
		
		if( !this.m_bDrawn ){
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
			this.m_pMarkerTimes = pMarkerTimes;
			this.m_bDrawn = true;
		}else{
			this._calibrateMarkers( this.m_oMainTimeLine, this.m_pMarkerTimes );
		}
	}
	
	MarkerController.prototype._calibrateMarkers = function(){
		
		var bufferMarkers = this.m_oTimeIntervalFactory.getCalibratedTimeIntervals( this.m_oMainTimeLine, this.m_pMarkerTimes);
		var pBeforeMarkerTimes = bufferMarkers.beforeMarkers;
		var pAfterMarkerTimes = bufferMarkers.afterMarkers;
		var nStartIndex = this.m_pMarkers[0].getViewIndex()-pBeforeMarkerTimes.length;
		var nEndIndex = this.m_pMarkers[this.m_pMarkers.length-1].getViewIndex()+1;
		
		var pBeforeMarkers = [];
		var pAfterMarkers = [];
		
		for(var i=0; i<pBeforeMarkerTimes.length; i++){
			var oMarker = new Marker( pBeforeMarkerTimes[i], nStartIndex+i, this.m_eViewContainer );
			pBeforeMarkers.push( oMarker );
		}
		
		for(var i=0; i<pAfterMarkerTimes.length; i++){
			var oMarker = new Marker( pAfterMarkerTimes[i], nEndIndex+i, this.m_eViewContainer );
			pAfterMarkers.push( oMarker );
		}
		this.m_pMarkerTimes = pBeforeMarkerTimes.concat(this.m_pMarkerTimes, pAfterMarkerTimes);
		this.m_pMarkers = pBeforeMarkers.concat(this.m_pMarkers, pAfterMarkers);
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