
// could do more with this class

define(["thirdparty/jquery"], function( jQuery ){
	
	
	TEMPLATE_SERVICE = function()
	{	
		
	}

	TEMPLATE_SERVICE.prototype.getTemplate = function( sTemplateClassName )
	{
		var eTemplate = $( sTemplateClassName ); 
		return eTemplate.clone();
	}
	
	return new TEMPLATE_SERVICE(); 
	
});



