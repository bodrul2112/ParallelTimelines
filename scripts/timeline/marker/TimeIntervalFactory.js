

/// TIIIIIIIIIIIIIIIIIIIIIIIIMMMMMEEEE?!!?!?!?!? TODO: write this stuff properly later
//TODO: This class is very VERY much in flux
define( function(){
	
	var TimeIntervalFactory = function( ){
		
		this.m_pIntervals = [
		1000,//sec
		1000*60,//min
		1000*60*60,//hour
		1000*60*60*24,//day
		1000*60*60*24*31,//around month
		1000*60*60*24*365*3,//some years (see what i'm doing here?)
		1000*60*60*24*365*30,//gonna start showing decades now
		1000*60*60*24*365*300,//gonna stop caring now... 
		];
		
		this.m_nShowMillis = 1000;
		this.m_nShowMellenia = 1000*60*60*24*365*300;
		
	}
	
	// returns a map, containing a date formate for the edge labels, a date format for the time labels, and a map of times to be added to the view
	TimeIntervalFactory.prototype.calculateIntervals = function( nStartTime, nEndTime ){
		
	
		var nDifferance = nEndTime - nStartTime;
		/*
		if( nDifferance < this.m_nShowMillis ){
			return this.calculateIntervalsForMillis()
		}else if( nDifferance > this.m_nShowMellenia ){
			
		}else{
			
		}
		*/
		var nTimeIncrement = nDifferance/12;
		nStartTime += (nTimeIncrement/2);
		
		var pTimeArray = [];
		for(var i=nStartTime; i<nEndTime; i+=nTimeIncrement){
			pTimeArray.push(i);
		}
		
		return {
			edgeLabelFormat: "",
			labelFormat: "",
			times: pTimeArray
		}
		
	}
	
	//TODO: what happens when pCurrrentTimes are empty, I need at least 3
	TimeIntervalFactory.prototype.getCalibratedTimeIntervals = function( oTimeLine, pCurrentTimes ){
		
		var nStartTime = oTimeLine.getStartDateMillis();
		var nEndTime = oTimeLine.getEndDateMillis();
		

		var nTimeInterval = pCurrentTimes[1]-pCurrentTimes[0];
		var nFirstCurrentlyDisplayedMarkerTime = pCurrentTimes[0];
		var nLastCurrentlyDisplayedMarkerTime = pCurrentTimes[pCurrentTimes.length-1];
		
		var pBeforeMarkers = [];
		var pAfterMarkers = []
		//time for new markers backwards
		for(var i=nFirstCurrentlyDisplayedMarkerTime-nTimeInterval; i>nStartTime; i-=nTimeInterval){
			pBeforeMarkers.push(i);
		}
		pBeforeMarkers = pBeforeMarkers.reverse();
		
		//time for new markers forwards
		for(var i=nLastCurrentlyDisplayedMarkerTime+nTimeInterval; i<nEndTime; i+=nTimeInterval){
			pAfterMarkers.push(i);
		}
		
		return {
			beforeMarkers: pBeforeMarkers,
			afterMarkers: pAfterMarkers
		};
		
	}
	
	TimeIntervalFactory.prototype.calculateIntervalsForMillis = function( nStartTime, nEndTime) {
		
	}
	
	TimeIntervalFactory.prototype.calculateIntervalsForMellenia = function( nStartTime, nEndTime ) {
		
	}
	
	
	return TimeIntervalFactory;
	
});