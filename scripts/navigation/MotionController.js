
define(["thirdparty/jQuery", "services/TemplateService" ], function( jQuery, tpl ){
	
	
	var MotionController = function( oTimeLineController ) {
		
		this.m_oTimeLineController = oTimeLineController;
		this.m_eViewElement;
		this.m_pHandleElements = [];
	}
	
	MotionController.prototype.setViewElement = function(){
		this.m_eViewElement;
	}
	
	MotionController.prototype.addHandleBars = function(){
		
		if(this.m_eViewElement){
			this.render()
		}
	}
	
	MotionController.prototype.render = function() {
		
		for(var i=0; i<2; i++){
			var eHandle = tpl.getTemplate(".navigationHandle");
			
		}
		
	}
	
	MotionController.prototype.destroy = function(){
		
		for(var i=0; i<this.m_pHandleElements.length; i++){
			this.m_pHandleElements[i].remove();
		}
	}
	
	return MotionController;
	
});