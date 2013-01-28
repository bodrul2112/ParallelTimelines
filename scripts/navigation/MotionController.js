
define(["thirdparty/jQuery", "services/TemplateService" ], function( jQuery, tpl ){
	
	
	var MotionController = function( oTimeLineController ) {
		
		this.m_oTimeLineController = oTimeLineController;
		this.m_pHandleElements = [];
	}
	
	MotionController.prototype.addHandleBars = function(){
		
		if(this.m_eViewElement){
			this.render()
		}
	}
	
	MotionController.prototype.render = function() {
		
		this.destroy();
		var eViewElement = this.m_oTimeLineController.getViewElementWrapper();
		
		for(var i=0; i<2; i++){
			var eHandle = tpl.getTemplate(".navigationArrowHandle");
			if(i%2==0){
				//bottom left
				eHandle.css("left", 0);
				eHandle.css("top", eViewElement.height()-60);
				eHandle.addClass('arrow-left');
				eHandle.click(this.leftHandleClick.bind(this));
			}else{
				//top right
				eHandle.css("left", eViewElement.width()-20);
				eHandle.css("top", 20);
				eHandle.addClass('arrow-right');
				eHandle.click(this.rightHandleClick.bind(this));
			}
			this.m_pHandleElements.push(eHandle);
			eViewElement.append(eHandle);
		}
	}
	
	MotionController.prototype.destroy = function(){
		
		for(var i=0; i<this.m_pHandleElements.length; i++){
			this.m_pHandleElements[i].remove();
		}
		this.m_pHandleElements = [];
	}
	
	MotionController.prototype.leftHandleClick = function(){
		console.log("left handle clicked");
		this.m_oTimeLineController.incrementallyMoveBackward();
	}
	
	MotionController.prototype.rightHandleClick = function(){
		console.log("right handle clicked");
		this.m_oTimeLineController.incrementallyMoveForward();
	}
	
	return MotionController;
	
});