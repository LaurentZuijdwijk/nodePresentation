/*global todomvc */
'use strict';

/**
 * Services that persists and retrieves TODOs from localStorage
*/
todomvc.factory('todoStorage', ['$http',function ($http) {
	var STORAGE_ID = 'todos-angularjs-perf';

	return {
		getAll : function(cb){
			$http({method: 'GET', url: '/todos'}).
				success(function(data, status, headers, config) {
					console.log(data);
					cb(null,data);
				}).
				error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		},
		get: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},
		delete : function(todo){
			$http({
				method: 'DELETE',
				url: '/todos/'+todo._id,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});
			console.log(todo);
		},
		put : function(todo){
			var completed = todo.completed ? 1:0;
			$http({
				method: 'PUT',
				data:{title:todo.title,completed : completed},
				url: '/todos/'+todo._id,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});
		},
		post: function (todo, cb) {

			$http({
				method: 'POST',
				data:todo,
				url: '/todos',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).
				success(function(data, status, headers, config) {
					if(cb){
						cb(null,data);
					}
				}).
				error(function(data, status, headers, config) {
			});
		}
	};
}]);
