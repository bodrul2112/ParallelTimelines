

define( ["services/TemplateService" ], function( tpl ) {
	
	var HistoricPoint = function( nDate, nWidth, nHeight ){
		
		this.m_eElement =  tpl.getTemplate(".historic_point");
		this.m_nDate = nDate ? nDate : (new Date()).getTime();
		this.m_nWidth = nWidth;
		this.m_nHeight = nHeight;
	}
	
	HistoricPoint.prototype.getElement = function(){
		return this.m_eElement;
	}
	
	HistoricPoint.prototype.setTime = function( nTimeDate ) {
		this.m_nDate = nTimDate
	}
	
	HistoricPoint.prototype.getTime = function() {
		return this.m_nDate; 
	}
	
	HistoricPoint.prototype.setDimensions = function( nWidth, nHeight ) {
		this.m_nWidth = nWidth;
		this.m_nHeight = nHeight;
	}
	
	HistoricPoint.prototype.setWidth = function( nWidth ) {
		this.m_nWidth = nWidth;
	}
	
	HistoricPoint.prototype.setHeight= function( nHeight ) {
		this.m_nHeight = nHeight;
	}
	
	HistoricPoint.prototype.getWidth= function() {
		return this.m_nWidth;
	}
	
	HistoricPoint.prototype.getHeight = function() {
		return this.m_nHeight;
	}
	
	HistoricPoint.prototype.destroy = function(){
		this.m_eElement.remove();
	}
	
	return HistoricPoint;
	
});