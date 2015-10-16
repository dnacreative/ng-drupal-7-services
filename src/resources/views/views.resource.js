;(function() {
    'use strict';

	/**
	 * Views Resource Modules
	 * 
	 * see sourcecode in services/resources/views_resource.inc
	 * 
	**/
    angular.module('ngDrupal7Services-3_x.resources.views.resource', ['ngDrupal7Services-3_x.commons.configurations', 'ngDrupal7Services-3_x.commons.baseResource', 'ngDrupal7Services-3_x.resources.views.resourceConstant', 'ngDrupal7Services-3_x.resources.views.channel'])
    

    /**
	 * ViewsResource
	 * 
	 * This service mirrors the Drupal views resource of the services 3.x module.
	 * To use this you have to set following line in your Drupal CORS module settings
	 * 
	**/
    .factory('ViewsResource', ViewsResource);

    /**
	 * Manually identify dependencies for minification-safe code
	 * 
	**/
    ViewsResource.$inject = ['$http', 'DrupalApiConstant', 'BaseResource', 'ViewsResourceConstant', 'ViewsChannel'];
    
	/** @ngInject */
	function ViewsResource($http, DrupalApiConstant, BaseResource, ViewsResourceConstant, ViewsChannel) { 
		
		//setup and return service            	
        var viewsResourceService = {
        	retrieve : retrieve
        };
        
        return viewsResourceService;

        ////////////

		/**
		 * retrieve
		 * 
		 * Retrieves a view.
		 * 
		 * Method: GET 
		 * Url: http://drupal_instance/api_endpoint/views/{VIEW_NAME}
		 * 
		 * @params  {Object} data The requests data
		 * 			@key {String} view_name The name of the view to get., required:true, source:path
		 * 			@key {String} display_id The display ID of the view to get., required:false, source:param
		 * 			@key {Array} args A list of arguments to pass to the view., required:false, source:param
		 * 			@key {Integer} offset The number of the entry for the page begin with., required:false, source:param
		 * 			@key {Integer} limit The total number of entries to list., required:false, source:param
		 * 			@key {Boolean} format_output Whether to return the raw data results or style the results., required:false, source:param
		 * 			@key {Array} exposed_filters A list of filters to pass to the view. These are defined by the exposed filters on your view. Example call: /views/your_view?filters[nid]=12345, required:false, source:param
		 * 
		 * 
		 * @return 	{Promise}
		 * 
		 * Custom view settings
		 * exposed filters: create them in the view under "Filter criteria". Expose them for users. Under the more tab in "Configure filter criterion" in the field "Filter identifier" you can change the field name. Use it like => comment_count=4
		 * order by : create them in the view under "Sort criteria".  Expose it for users and use it like => sort_by=created&sort_order=ASC
		 * 
		 *
		 **/
		 function retrieve(data){
			var _data = {};

			//we extend because we dont want to change the views/controllers vlaues
			angular.extend(_data, data);
		
			var retrievePath = DrupalApiConstant.drupal_instance + DrupalApiConstant.api_endpoint + ViewsResourceConstant.resourcePath + '/' + _data.view_name;
			
			delete _data.view_name;
			
			var format = undefined,
				preparedParams = undefined;
			
			angular.forEach(_data, function(value , key) {
				if(key === 'exposed_filters') { format = 'json'; }
				
				preparedParams = BaseResource.prepareGetParams(value, key, format);
				console.log(preparedParams); 
		        type = undefined;
		    });
				
			retrievePath += '?'+BaseResource.getParams.join('&');

    		return BaseResource.retrieve( retrievePath, ViewsChannel.pubRetrieveConfirmed,  ViewsChannel.pubRetrieveFailed);

		};
		

	
	};

})();