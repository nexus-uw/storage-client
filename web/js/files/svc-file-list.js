"use strict";
angular.module("gapi-file", ["gapi", "medialibraryServices"])
  .factory("FileListFactory", ["$q", "$log", "storageAPILoader", "LocalFiles", "$rootScope", function ($q, $log, storageAPILoader, LocalFiles, $rootScope) {
    var factory = {};
    factory.listFiles = function (companyId, folder) {
      var deferred = $q.defer();

      if (companyId) {
         storageAPILoader.get().then(function (storageApi) {
          var request = storageApi.files.get({
            "companyId": companyId,
            "folder": folder
          });
          request.execute(function (resp) {
            if (resp.code === 403 || resp.code === 401 || resp.code === 400) {
              deferred.resolve({
                authError: true,
                code: resp.code
              });
            }
            else if (resp.code === 404) {
              deferred.resolve({
                notFound: true,
                code: resp.code
              });
            }
            else {
              deferred.resolve({
                local: false,
                files: resp.files
              });
            }
          });
        });
      }
      else {
        console.log(window.location.href);
        LocalFiles.query(function(mediaFiles) {
          deferred.resolve({
            local: true,
            files: mediaFiles
          });
        });
      }

      return deferred.promise;
    };
    return factory;
  }]);
