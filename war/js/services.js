'use strict';

/* Services */

angular.module('medialibraryServices', ['ngResource']).
    factory('MediaFiles', function($resource){
    return $resource('/getFiles?companyId=:companyId', {}, {
      query: {method:'GET', params:{companyId:''}, isArray:true}
  });
}).
    factory('MediaFile', function($resource){
    return $resource('/files/files.json', {}, {
      query: {method:'GET', params:{}, isArray:true}
  });
});