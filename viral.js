void function(root){

	'use strict'

	var create = Object.create || function(o){
		var F = function(){}
		F.prototype = o
		return new F()
	}

	var extend = function(to, from){
		for ( var p in from ) to[p] = from[p]
		return to
	}

	var viral = {}

	viral.Base = {
		extend: function(props){
			return extend(create(this), props)
		},
		make: function(){
			var obj = create(this)
			var ctor = this.constructor

			if ( typeof ctor === 'function' ) ctor.apply(obj, arguments)

			return obj
		}
	}

	// module dance
	if ( typeof module !== 'undefined' && module.exports ) module.exports = viral
	else if ( typeof define === 'function' && define.amd ) define(viral)
	else                                                   root.viral = viral

}(this)
