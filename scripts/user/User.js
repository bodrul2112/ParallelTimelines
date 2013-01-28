

define( function(){
	
	
	var User = function( nId ){
		this.m_nId = nId;
		this.m_bAuthenticated = false;
	}
	
	User.prototype.authenticate = function(){
		
		// query the db for user credentials
	}
	
	User.protoype.getTimeLineIDList = function(){
		
		this.m_pTimeLineIDList;
		// query db for a list of timeline id
		return this.m_pTimeLineIDList;
	}
	
	return User;
	
	
});