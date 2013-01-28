
define(["services/TemplateService"], function( tpl ){
	
	var EdgeLabel = function( eTimeLine , bIsLeft ){
		
		this.m_eElement = tpl.getTemplate( ".start_end_label_text" );
		this.m_eTimeLineElement = eTimeLine;
		this.m_nHeight = 55;
		this.m_nWidth = 215;
		this.m_bLeft = bIsLeft;
		this.m_sText = "";
	}
	
	EdgeLabel.prototype.setHeightWidth = function( nHeight, nWidth ) {
		
		this.m_nHeight = nHeight;
		this.m_nWidth = nWidth;
	}
	
	EdgeLabel.prototype.setTimeLineElement = function( eTimeLineElement ) {
		
		this.m_eTimeLineElement = eTimeLineElement;
	} 
	
	
	EdgeLabel.prototype.setLeft = function( bLeft ){
		this.m_bLeft = bLeft;
	}
	
	EdgeLabel.prototype.setText = function ( sText ) {
		
		this.m_sText = sText;
		this.m_eElement.text( this.m_sText );
	}
	
	EdgeLabel.prototype.setTextAsDate = function ( nTime ) {
		
		var oDate = new Date( nTime );
		this.m_sText = oDate.getFullYear() +"-"+ (oDate.getMonth()+1) +"-"+ oDate.getDate();
		this.m_eElement.text( this.m_sText );
	}
	
	EdgeLabel.prototype.render = function(){
		
		var nTop = 0;
		var nLeft = 0;
		//var nTimeLineHeight = this.m_nTimeLineElement.height();
		var nTimeLineHeight = 10;
		
		if(this.m_bLeft){
			nTop += nTimeLineHeight;
		}else{
			nTop -= this.m_nHeight;
			nLeft = this.m_eTimeLineElement.width() - this.m_nWidth;
		}

		this.m_eElement.css("top", nTop);
		this.m_eElement.css("left", nLeft);
		
		this.m_eTimeLineElement.append( this.m_eElement );
		
	}
	
	return EdgeLabel
	
});