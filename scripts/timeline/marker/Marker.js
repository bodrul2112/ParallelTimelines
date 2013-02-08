
define(["thirdparty/jquery", "services/TemplateService"], function( jQuery, tpl ){
	
	var Marker = function( nTime, nViewIndex, eViewContainer ){
		
		this.m_nTime = nTime;
		this.m_nViewIndex = nViewIndex; 
		this.m_eViewContainer = eViewContainer;

		this.m_eElement = tpl.getTemplate( ".timeline_marker" );
		this.m_sText;
		this.m_bOnScreen = false;
		this.m_bRendered = false;
		
	}
	
	Marker.prototype.setTime = function( nTime ) {
		this.m_nTime = nTime; 
	}
	
	Marker.prototype.setViewIndex = function( nViewIndex ) {
		this.m_nViewIndex = nViewIndex;
	} 
	
	Marker.prototype.getViewIndex = function( ) {
		return this.m_nViewIndex;
	} 
	
	Marker.prototype.setDateFormat = function( sDateFormat ) {
		
		// some default shizzle for now, just the year and month
		var oDate = new Date( this.m_nTime );
		this.m_sText = oDate.getFullYear() + "-" + (oDate.getMonth()+1);
	}
	
	// I could reuse these markers, the code is kinda half there
	// TODO: simplify this
	Marker.prototype.render = function( oMainTimeLine ){
		
		var nLeft;
		var nTop;
//		if( this.m_nTime >= oMainTimeLine.getStartDateMillis() && this.m_nTime <= oMainTimeLine.getEndDateMillis() ){
			
			var nTimeSegment = this.m_nTime - oMainTimeLine.getStartDateMillis();
			var nDifferance = oMainTimeLine.getEndDateMillis() - oMainTimeLine.getStartDateMillis();
			nLeft = Math.floor( (nTimeSegment / nDifferance) * oMainTimeLine.getElement().width() );
//		}else {
//			
//			if(this.m_bOnScreen ){
//				this.m_eElement.remove();
//				return;
//			}
//		}
		
		if( nLeft != undefined ){
			this.m_eElement.css("left", nLeft);
			if( !this.m_bOnScreen ){
				this.m_eViewContainer.append( this.m_eElement );
				this.m_bOnScreen = true;
			}
		}
	
		var eTextLabel = this.m_eElement.find( ".timeline_marker_label" );
		eTextLabel.text( this.m_sText );
		if( this.m_nViewIndex%2 == 0 ){
			this.m_eElement.css("top","-21px");
			eTextLabel.css("top", (this.m_eElement.height()+5)+"px");
		}else{
			this.m_eElement.css("top","21px");
		}

	} 
	
	Marker.prototype.destroy = function( ){
		this.m_eElement.remove();
	}
	
	
	return Marker;
});