
define( ["thirdparty/jquery","services/TemplateService", "historicpoint/HistoricPoint"], function( jQuery, tpl, HistoricPoint){
	
	
	var HistoricPointFactory = function(){
		
		
	}
	
	HistoricPointFactory.prototype.createRandomPointsBetween = function( nStartDate, nEndDate, nPoints ){
		
		var pHistoricPoints = [];
		var nSpace = ( nEndDate - nStartDate ) / nPoints;
		
		
		
		for(var i=0; i< nPoints; i++){	
			
			var nK = Math.round( Math.random()*120 );
			if( nK < 35 ){ nK=35; }
			var nWidth = nK;
			var nHeight = nK;
			
			var nDateTimeMillis = nStartDate + (i*nSpace);
			var oHistoricPoint = new HistoricPoint( nDateTimeMillis , nWidth, nHeight );
			pHistoricPoints.push( oHistoricPoint );
		}
		
		return pHistoricPoints;
	}	
	
	return HistoricPointFactory;
	
});