

module.exports = function(app, restful){
	var mongoose = restful.mongoose;

	var todoSchema = mongoose.Schema({
		title: 'string',
		createdAt: {
			type : 'Date',
			'default' : new Date()
		},
		completed : {
			type : 'boolean',
			'default' : false
		}
	});
	
	var Todo = restful.model('todo', todoSchema);
	Todo.methods(['get', 'post', 'put', 'delete']);
	Todo.register(app, '/todos');
};