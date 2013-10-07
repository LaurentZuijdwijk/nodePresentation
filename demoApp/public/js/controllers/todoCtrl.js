/*global todomvc */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TodoCtrl', function TodoCtrl($scope, $location, todoStorage, filterFilter) {
	var todos = $scope.todos = []
	todoStorage.getAll(function(err, data){
		todos = $scope.todos = data;
		$scope.remainingCount = filterFilter(todos, {completed: false}).length;
	});

	$scope.remainingCount = 0

	$scope.newTodo = '';
	$scope.editedTodo = null;

	if ($location.path() === '') {
		$location.path('/');
	}

	$scope.location = $location;

	$scope.$watch('location.path()', function (path) {
		$scope.statusFilter = { '/active': {completed: false}, '/completed': {completed: true} }[path];
	});

	$scope.$watch('remainingCount == 0', function (val) {
		$scope.allChecked = val;
	});

	$scope.addTodo = function () {
		var newTodo = $scope.newTodo.trim();
		if (newTodo.length === 0) {
			return;
		}

		todos.push({
			title: newTodo,
			completed: 0
		});
		todoStorage.post({title:newTodo});

		$scope.newTodo = '';
		$scope.remainingCount++;
	};

	$scope.editTodo = function (todo) {
		$scope.editedTodo = todo;
	};

	$scope.doneEditing = function (todo) {
		$scope.editedTodo = null;
		todo.title = todo.title.trim();

		if (!todo.title) {
			$scope.removeTodo(todo);
		}

		todoStorage.put(todo);
	};

	$scope.removeTodo = function (todo) {
		$scope.remainingCount -= todo.completed ? false : true;
		todos.splice(todos.indexOf(todo), 1);
		todoStorage.delete(todo);
	};

	$scope.todoCompleted = function (todo) {
		if(todo.completed == true){
			$scope.remainingCount -= 1;
		}
		else{
			$scope.remainingCount += 1;
	
		}
		todoStorage.put(todo);
	};

	$scope.clearCompletedTodos = function () {
		$scope.todos = todos = todos.filter(function (val) {
			return !val.completed;
		});
		todoStorage.put(todos);
	};

	$scope.markAll = function (completed) {
		todos.forEach(function (todo) {
			todo.completed = completed;
			todoStorage.put(todo);
		});
		$scope.remainingCount = completed ? 0 : todos.length;
	};
});
