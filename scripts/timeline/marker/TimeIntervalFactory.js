

/// TIIIIIIIIIIIIIIIIIIIIIIIIMMMMMEEEE?!!?!?!?!? TODO: write this stuff properly later
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
	
	TimeIntervalFactory.prototype.calculateIntervalsForMillis = function( nStartTime, nEndTime) {
		
	}
	
	TimeIntervalFactory.prototype.calculateIntervalsForMellenia = function( nStartTime, nEndTime ) {
		
	}
	
	
	return TimeIntervalFactory;
	
});