
// NO. This would be too slow
define(["thirdparty/jQuery"], function( jQuery, tpl ){

	var DragListener = function( eTimeline ){
		
		this.m_eTimeLine = eTimeLine;
		this.m_bIsDragging = false;
		this.m_nStartX = false; // whoa whats going on here, you'll see
		this.m_nEndX = false;
		this.m_nMinimumDrag = 50; //pixels that is
		this.m_nDragged = 0;
	};
	
	DragListner.prototype.onMouseDown = function(e) {
		this.m_nStartX =  e.getX();
		
	};
	
	DragListner.prototype.onMouseUp = function(e) {
		
		if( this.m_nStartX !== false && this.m_nEndX !== false ){
			
			this.m_nDragged = this.m_nStartX - this.m_nEndX ;
			if(this.m_nDragged >= this.m_nDragged){
				this._dragged();
			}
		}
	};
	
	DragListner.prototype._dragged = function(e){
		
		
	};
	
	return DragListener;

});