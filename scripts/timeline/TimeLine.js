
define(["thirdparty/jquery","services/TemplateService", "timeline/EdgeLabel"], function(jQuery, tpl, EdgeLabel) {	

	var TimeLine = function( nStartDate, nEndDate ){
		
		this.m_bIsMainTimeLine = false;
		this.m_eElement = tpl.getTemplate(".timeline");
		
		this.m_nStartDate = nStartDate || ( new Date("1990-01-01 00:00:00") ).getTime();
		this.m_nEndDate = nEndDate || ( new Date("2012-01-01 00:00:00") ).getTime();
		
		this.m_pHistoricPoints = [];
		this.m_eContainer;
		
		this.m_nY = 0;
		
		this.m_oLeftLabel = new EdgeLabel( this.m_eElement, true );
		this.m_oRightLabel = new EdgeLabel( this.m_eElement, false );
		
		this.m_bSynced = false;
		
	}
	
	TimeLine.prototype.getElement = function(){
		return this.m_eElement;
	}

	TimeLine.prototype.getHistoricPoints = function(){
		return this.m_pHistoricPoints;
	}
	
	TimeLine.prototype.setAsMain = function( bIsMain ){
		this.m_bIsMainTimeLine = bIsMain;
	}
	
	TimeLine.prototype.isMain = function(){
		return this.m_bIsMainTimeLine;
	}
	
	TimeLine.prototype.setY = function( nY ){
		this.m_nY = nY;
		this.m_eElement.css('top', this.m_nY+"px" );
	}
	
	TimeLine.prototype.setStartEndDateInMillis = function( nStartDate, nEndDate ){
		
		this.m_nStartDate = nStartDate;
		this.m_nEndDate = nEndDate;
		this.m_bSynced = false;
	}
	
	TimeLine.prototype.getStartDateMillis = function(){
		return this.m_nStartDate;
	}
	
	TimeLine.prototype.getEndDateMillis = function(){
		return this.m_nEndDate;
	}
	
	TimeLine.prototype.setStartDateMillis = function( nStartDateMillis ){
		this.m_nStartDate = nStartDateMillis;
		this.m_bSynced = false;
	}
	
	TimeLine.prototype.setEndDateMillis = function( nEndDateMillis ){
		this.m_nEndDate = nEndDateMillis;
		this.m_bSynced = false;
	}
	
	TimeLine.prototype.setSynced = function( bSynced ){
		this.m_bSynced = bSynced;
	}
	
	TimeLine.prototype.isSynced = function(){
		return this.m_bSynced;
	}
	
	TimeLine.prototype._initialiseFromDatabase = function(){
		
	}
	
	TimeLine.prototype._initaliseFromCacheDatabase = function(){
		
	}
	
	TimeLine.prototype.addHistoricPoint = function( oHistoricPoint ) {
		
		this.m_pHistoricPoints.push( oHistoricPoint );
	}
	
	TimeLine.prototype.addHistoricPoints = function( pHistoricPoints ) {
		
		for(var i=0; i<pHistoricPoints.length; i++){
			this.m_pHistoricPoints.push( pHistoricPoints[i] );
		}
	}
	
	
	// yup this is a giant block of codey coderson, no i'm not going to be a good programmer and break this down
	TimeLine.prototype.render = function() {
		
		this.m_oLeftLabel.setTextAsDate( this.m_nStartDate );
		this.m_oRightLabel.setTextAsDate( this.m_nEndDate );
		this.m_oLeftLabel.render();
		this.m_oRightLabel.render();
		
		// this shizzle is gonna go off the hizzle with dates before the epoch
		
		var nTimeDifferance = this.m_nEndDate - this.m_nStartDate;  
		
		for(var i=0; i< this.m_pHistoricPoints.length; i++){
			var oHistoricPoint = this.m_pHistoricPoints[i];
			var nTime = oHistoricPoint.getTime();
			
			if( nTime >= this.m_nStartDate && nTime <= this.m_nEndDate ){
				
				var eHistoricPoint = oHistoricPoint.getElement();
				var nTimeFragment = oHistoricPoint.getTime() - this.m_nStartDate ;
				var nLeft = Math.round( ( nTimeFragment / nTimeDifferance) * this.m_eElement.width() );
				// half the size of the circle 
				nLeft -=  (oHistoricPoint.getWidth()/2);
				var nTop = -(oHistoricPoint.getHeight()/2)+5;
				
				eHistoricPoint.width( oHistoricPoint.getWidth() );
				eHistoricPoint.height( oHistoricPoint.getWidth() );
				eHistoricPoint.css("left", nLeft+"px");
				eHistoricPoint.css("top", nTop+"px");
				
				this.m_eElement.append( eHistoricPoint );
				
				var nRedBorderWidth = 7;
				var eWhiteCircle = eHistoricPoint.find('.outer_white_circle');
				eWhiteCircle.width( oHistoricPoint.getWidth()-(nRedBorderWidth*2))
				eWhiteCircle.height( oHistoricPoint.getHeight()-(nRedBorderWidth*2))
				eWhiteCircle.css("left",nRedBorderWidth+"px");
				eWhiteCircle.css("top",nRedBorderWidth+"px");
				
			}else{
				//this.m_eElement.remove( oHistoricPoint.getElement() );
				oHistoricPoint.destroy();
			}
		}
	}
	
	return TimeLine;
	
});