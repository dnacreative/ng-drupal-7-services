;(function() {
    'use strict';

	/**
	 * TaxonomyTerms Resource Modules
	 * 
	 * see sourcecode in services/resources/taxonomy_terms_resource.inc
	**/
    angular.module('ngDrupal7Services-3_x.resources.taxonomy_terms.resource', ['ngDrupal7Services-3_x.commons.configurations', 'ngDrupal7Services-3_x.resources.taxonomy_terms.resourceConstant', 'ngDrupal7Services-3_x.resources.taxonomy_terms.channel', 'ngDrupal7Services-3_x.commons.baseResource'])
    
    /**
	 * TaxonomyTermsResource
	 * 
	 * This service mirrors the Drupal taxonomy_terms resource of the services 3.x module.
	 * To use this you have to set following line in your Drupal CORS module settings
	 * your_api_endpoint/taxonomy_terms/*|<mirror>|POST|Content-Type,Authorization|true
	 * 
	**/
    .factory('TaxonomyTermsResource', TaxonomyTermsResource);

    /**
	 * Manually identify dependencies for minification-safe code
	 * 
	**/
    TaxonomyTermsResource.$inject = ['$http', 'BaseResource', 'DrupalApiConstant', 'TaxonomyTermsResourceConstant', 'TaxonomyTermsChannel'];
    
	/** @ngInject */
	function TaxonomyTermsResource($http, BaseResource, DrupalApiConstant, TaxonomyTermsResourceConstant, TaxonomyTermsChannel) { 
		
		//setup and return service            	
        var taxonomy_termsResourceService = {
        	//CRUD operations
        	retrieve 	: retrieve,
    		create 		: create,
    		update 		: update,
    		delete 		: _delete,
    	    index 		: index,
    	    //Actions
    	    selectNodes	: selectNodes,
        	
        };
        
        return taxonomy_termsResourceService;

        ////////////
        
        /**
		 * retrieve
		 * 
		 * Retrieve a term
		 * 
		 * Method: GET 
		 * Url: http://drupal_instance/api_endpoint/taxonomy_terms/{TID}
		 * 
		 * @params  {Object} data The requests data
		 * 			@key 	{Integer} tid TID of the taxonomy_terms to get, required:true, source:path
		 * 
		 * @return 	{Promise} A taxonomy_terms object
		 * 
		**/
    	function retrieve(data) {
    		var retrievePath = DrupalApiConstant.drupal_instance + DrupalApiConstant.api_endpoint + TaxonomyTermsResourceConstant.resourcePath + '/' + data.tid;
    		return BaseResource.retrieve( retrievePath,TaxonomyTermsChannel.pubRetrieveConfirmed,  TaxonomyTermsChannel.pubRetrieveFailed);
	    };
	    
	    /**
	     * create
	     * 
	     * Create a term
	     * This function uses drupal_form_submit() and as such expects all input to match
	     * the submitting form in question.
	     * 
	     * Method: POST
	     * Url: http://drupal_instance/api_endpoint/taxonomy_terms
	     * 
	     * @params  {Object} term The data of the taxonomy_terms to create, required:true, source:post body
	     * 
		 *
		 *  Roles can be passed in a roles property which is an associative
		 *  array formatted with '<role id>' => '<role id>', not including the authenticated taxonomy_terms role, which is given by default.
	     * 
	     * @return 	{Promise} The taxonomy_terms object of the newly created taxonomy_terms.
	     *
	    **/
	    function create(term) {
	    	
	    	var createPath = DrupalApiConstant.drupal_instance + DrupalApiConstant.api_endpoint + TaxonomyTermsResourceConstant.resourcePath;

	    	var createData 	= { 
    				term : term 
    		};

    		return BaseResource.create( createData, createPath,  TaxonomyTermsChannel.pubCreateConfirmed, TaxonomyTermsChannel.pubCreateFailed);

	    };
	        
	    /**
	     * update
	     * 
	     * Update a term
	     * 
	     * Method: PUT
	     * Url: http://drupal_instance/api_endpoint/taxonomy_terms/{TID}
	     * 
	     * @params  {Object} data The requests data
	     * 			@key 	{Integer} tid The unique identifier for this taxonomy term., required:true, source:path
	     * 			@key 	{Array}  data The taxonomy term data to update, required:true, source:post body
	     * 
	     * @return 	{Promise}
	     *
	    **/
	    function update(data) {
	    	
	    	var updatePath = DrupalApiConstant.drupal_instance + DrupalApiConstant.api_endpoint + TaxonomyTermsResourceConstant.resourcePath + '/' + data.tid;
	    	
    		var updateData 	= {term : data};
    		
    		return BaseResource.update( updateData, updatePath, TaxonomyTermsChannel.pubUpdateConfirmed, TaxonomyTermsChannel.pubUpdateFailed);

	    };
	    
	    /**
	     * delete
	     * 
	     * Delete the term
	     * 
	     * Method: DELETE
	     * Url: http://drupal_instance/api_endpoint/taxonomy_terms/{TID}
	     * 
	     * @params  {Object} data the requests data
	     * 			@key 	{Integer} tid The id of the taxonomy_terms to delete, required:true, source:path
	     * 
	     * @return 	{Promise}
	     *
	    **/
	    function _delete(data) {
	    	var deletePath = DrupalApiConstant.drupal_instance + DrupalApiConstant.api_endpoint + TaxonomyTermsResourceConstant.resourcePath + '/' + data.tid
	    	return BaseResource.delete(deletePath, TaxonomyTermsChannel.pubDeleteConfirmed, TaxonomyTermsChannel.pubDeleteFailed);
	    };
	    
	    /**
	     * index
	     * 
	     * List all taxonomy_termss
	     * 
	     * Method: GET
		 * Url: http://drupal_instance/api_endpoint/taxonomy_terms
		 * 
		 * @params  {Object} data the requests data
		 * 		@key 	{Integer} page The zero-based index of the page to get. defaults to 0., required:false, source:param
		 * 		@key 	{Integer} pagesize Number of records to get per page., required:false, source:param
		 * 		@key 	{String} fields The fields to get., required:false, source:param
		 * 		@key 	{Array} parameters Parameters, required:false, source:param
		 * 		
	     * 
	     * @return 	{Promise}
	     *
	    **/
	    function index(data) {
	    	var indexPath = DrupalApiConstant.drupal_instance + DrupalApiConstant.api_endpoint + TaxonomyTermsResourceConstant.resourcePath + '/';
	    	return BaseResource.index(data, indexPath,TaxonomyTermsChannel.pubIndexConfirmed,  TaxonomyTermsChannel.pubIndexFailed);
	    };
	    
		/**
		 * selectNodes
		 * 
		 * Returns all nodes with provided taxonomy id.
		 * 
		 * Method: POST
		 * Url: http://drupal_instance/api_endpoint/taxonomy_terms/selectNodes
		 * 
		 * @params  {Object} data the requests data
		 * 		@key 	{Integer} tid The vocabulary ids to retrieve, separated by comma., required:true, source:post body
		 * 		@key 	{Integer} pager Whether the nodes are to be used with a pager (the case on most Drupal pages) or not (in an XML feed, for example)., required:false, source:post body
		 * 		@key 	{String} limit Maximum number of nodes to find., required:false, source:post body
		 * 		@key 	{Array} order The order clause for the query that retrieve the nodes., required:false, source:post body
		 * 		
		 * 
		 * @return 	{Promise}
		 * 
		**/
		function selectNodes(data) {
			var  pathToSelectNodes = DrupalApiConstant.drupal_instance + DrupalApiConstant.api_endpoint + TaxonomyTermsResourceConstant.resourcePath + '/' + TaxonomyTermsResourceConstant.actions.selectNodes,
				 requestConfig = {
			     	url		: pathToSelectNodes,
			     	method	: 'POST',
			     	data : data
				};
			
			
			
			return BaseResource.request(requestConfig,TaxonomyTermsChannel.pubSelectNodesConfirmed,  TaxonomyTermsChannel.pubSelectNodesFailed);

		};
					
	};

})();