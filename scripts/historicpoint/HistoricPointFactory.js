
define( ["thirdparty/jquery","services/TemplateService", "historicpoint/HistoricPoint"], function( jQuery, tpl, HistoricPoint){
	
	
	var HistoricPointFactory = function(){
		
		
	}
	
	HistoricPointFactory.prototype.createRandomPointsBetween = function( nStartDate, nEndDate, nPoints ){
		
		var pHistoricPoints = [];
		var nSpace = ( nEndDate - nStartDate ) / nPoints;
		
		
		var maxSize = 70;
		var minSize = 35;
		for(var i=0; i< nPoints; i++){	
			
			var nK = Math.round( Math.random()*maxSize );
			if( nK < minSize ){ nK=minSize; }
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