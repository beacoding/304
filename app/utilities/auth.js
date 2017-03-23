module.exports = {
	isAuthenticated: function (nextState, replace, next) {
	  if (localStorage['user']) {
	    replace('/dashboard');
	  }
	  next();
	},

	requireAuth: function (nextState, replace, next) {
	  if (!localStorage['user']) {
	    replace('/login');
	  }
	  next();
	}
}