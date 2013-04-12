var viral = require('../viral.min.js')
var a = require('assert')

var isPrototypeOf = function(child, parent){
	var F = function(){}
	F.prototype = parent
	return child instanceof F
}


describe('viral.Base', function(){

	describe('.extend', function(){

		it('should make a new object, inheriting from the previous one', function(){
			var Person = viral.Base.extend()

			a.ok(isPrototypeOf(Person, viral.Base))
		})

		it('should mix in properties passed in', function(){
			var Person = viral.Base.extend({
				walks: function(){ return true }
			})

			a.equal(typeof Person.walks, 'function')
			a.equal(viral.Base.walks, undefined)
		})

	})

	describe('.make', function(){

		it('should make a new instance of a prototype', function(){
			var Person = viral.Base.extend({})
			var hugh = Person.make()

			a.ok(isPrototypeOf(hugh, Person))
		})

		it('should call constructor', function(){
			var Person = viral.Base.extend({
				constructor: function(name){ this.name = name }
			})

			var hugh = Person.make('hugh')

			a.equal(hugh.name, 'hugh')
			a.equal(Person.name, undefined)
			a.ok(isPrototypeOf(hugh, Person))
		})
	})
})
