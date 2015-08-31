(function() {
    'use strict';

	/**
	 * System Resource Modules
	**/
    angular.module('ngDrupal7Services-3_x.resources.system.resource', ['ngDrupal7Services-3_x.commons.configurations', 'ngDrupal7Services-3_x.resources.system.resourceConstant', 'ngDrupal7Services-3_x.resources.system.channel'])
    

    /**
	 * SystemResource
	 * 
	 * This service mirrors the Drupal system resource of the services 3.x module.
	 * To use this you have to set following line in your Drupal CORS module settings
	 * your_api_endpoint/system/*|<mirror>|POST|Content-Type,Authorization|true
	 * 
	**/
    .factory('SystemResource', SystemResource);

    /**
	 * Manually identify dependencies for minification-safe code
	 * 
	**/
    SystemResource.$inject = ['$http', '$q', 'DrupalApiConstant', 'SystemResourceConstant', 'SystemChannel'];
    
	/** @ngInject */
	function SystemResource($http, $q, DrupalApiConstant, SystemResourceConstant, SystemChannel) { 
		
		//setup and return service            	
        var systemResourceService = {
			connect 		: connect,
			get_variable 	: get_variable,
			set_variable 	: set_variable,
			del_variable 	: del_variable
        };
        
        return systemResourceService;

        ////////////
        
        /**
		 * connect
		 * 
		 * Returns the logged in state of the current user.
		 * 
		 * Method: POST 
		 * Url: http://drupal_instance/api_endpoint/system/connect
		 * Headers: Content-Type:application/json
		 * 
		 * @return 	{Promise}
		 * 
		**/
		function connect() {
			
			var connectPath = DrupalApiConstant.drupal_instance + DrupalApiConstant.api_endpoint + SystemResourceConstant.resourcePath + '/' + SystemResourceConstant.actions.connect,
			defer = $q.defer(),
			requestConfig = {
					method :'POST',
					url : connectPath,
					headers : {
						"Content-Type"	: "application/json",
					}
			};
			
			$http(requestConfig)
			.success(function(responseData, status, headers, config){
				SystemChannel.pubSystemConnectConfirmed(responseData);
				defer.resolve(responseData);
			})
			.error(function(responseData, status, headers, config){
				SystemChannel.pubSystemConnectFailed(responseData);
				defer.reject(responseData);
			});
			
			return defer.promise;
	
		};
		
		/**
		 * get_variable
		 * 
		 * Returns the value of a system variable using variable_get().
		 * 
		 * Method: POST
		 * Url: http://drupal_instance/api_endpoint/system/get_variable
		 * Headers: Content-Type:application/json
		 * 
		 * @params  {Object} data the requests data
		 * 			@key 	{String} name The name of the variable to return, required:true, source:post body
		 * 			@key 	{String} _default The default value to use if this variable has never been set, required:false, source:post body
		 * 
		 * @return 	{Promise}
		 *
		**/
		function get_variable(data){
			
			var getVariablePath = DrupalApiConstant.drupal_instance + DrupalApiConstant.api_endpoint + SystemResourceConstant.resourcePath + '/' + SystemResourceConstant.actions.get_variable,
			defer = $q.defer(),
			requestConfig = {
					method 	:'POST',
					url 	: getVariablePath,
					headers : {
						"Content-Type"	: "application/json",
					},
					data 	: {
						name : data.name,
						default : data.default
					}
			},
			errors = [];
			
			if(!data.default) {
				delete requestConfig.data.default;
			}
			
			//basic validation
			if(!data.name) { 
				errors.push('Param name is required.');
			}
			
			if(errors.length != 0) {
				SystemChannel.pubSystemGetVariableFailed(errors);
				defer.reject(errors); 
				return defer.promise;
			}
			
			$http(requestConfig)
			.success(function(responseData, status, headers, config){
				SystemChannel.pubSystemGetVariableConfirmed(responseData);
				defer.resolve(responseData);
			})
			.error(function(responseData, status, headers, config){
				SystemChannel.pubSystemGetVariableFailed(responseData);
				defer.reject(responseData);
			});
			
			return defer.promise;
		};
		
		/**
		 * set_variable
		 * 
		 * Returns the value of a system variable using variable_get().
		 * Method: POST
		 * Url: http://drupal_instance/api_endpoint/system/get_variable
		 * Headers: Content-Type:application/json
		 * 
		 * @params  {Object} data the requests data
		 * 			@key 	{String} name The name of the variable to set, required:true, source:post body
		 * 			@key 	{String} value The value to set, required:true, source:post body
		 * 
		 * @return 	{Promise}
		 * 
		**/
		function set_variable(data){
			var setVariablePath = DrupalApiConstant.drupal_instance + DrupalApiConstant.api_endpoint + SystemResourceConstant.resourcePath + '/' + SystemResourceConstant.actions.set_variable,
			defer = $q.defer(),
			requestConfig = {
					method 	:'POST',
					url 	: setVariablePath,
					headers : {
						"Content-Type"	: "application/json",
					},
					data 	: {
						name 	: data.name,
						value 	: data.value
					}
			},
			errors = [];
			
			//basic validation
			if(!data.name) { errors.push('Param name is required.'); }
			if(!data.value) { errors.push('Param value is required.');}
					
			if(errors.length != 0) {
				SystemChannel.pubSystemSetVariableFailed({data: errors});
				defer.reject(errors); 
				return defer.promise;
			}
			
			
			$http(requestConfig)
			.success(function(responseData, status, headers, config){
				SystemChannel.pubSystemSetVariableConfirmed(responseData);
				defer.resolve(responseData);
			})
			.error(function(responseData, status, headers, config){
				SystemChannel.pubSystemSetVariableFailed(responseData);
				defer.reject(responseData);
			});
			
			return defer.promise;
		};
		
		/**
		 * del_variable
		 * 
		 * Deletes a system variable using variable_del().
		 * Method: POST
		 * Url: http://drupal_instance/api_endpoint/system/get_variable
		 * Headers: Content-Type:application/json
		 * 
		 * @params  {Object} data the requests data
		 * 			@key 	{String} name The name of the variable to delete, required:true, source:post body
		 * 
		 * @return 	{Promise}
		 * 
		**/
		function del_variable(data){
			var delVariablePath = DrupalApiConstant.drupal_instance + DrupalApiConstant.api_endpoint + SystemResourceConstant.resourcePath + '/' + SystemResourceConstant.actions.del_variable,
			defer = $q.defer(),
			requestConfig = {
					method 	:'POST',
					url 	: delVariablePath,
					headers : {
						"Content-Type"	: "application/json",
					},
					data 	: {
						name : data.name
					}
			},
			errors = [];
			
			//basic validation
			if(!data.name) { 
				errors.push('Param name is required.');
			}
			
			if(errors.length != 0) {
				SystemChannel.pubSystemDelVariableFailed(errors);
				defer.reject(errors); 
				return defer.promise;
			}
			
			$http(requestConfig)
			.success(function(responseData, status, headers, config){
				SystemChannel.pubSystemDelVariableConfirmed(responseData);
				defer.resolve(responseData);
			})
			.error(function(responseData, status, headers, config){
				SystemChannel.pubSystemDelVariableFailed(responseData);
				defer.reject(responseData);
			});
			
			return defer.promise;
		};
	
	};

})();