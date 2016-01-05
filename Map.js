/* --- Map.js ---
 *
 *	Based on the es6 Map type ( with tweaks )
 * 
 *	Due to the requirement for array index look ups this isn't the fastest solution
 *	but it should work fine for small to medium Maps that don't need to be blazingly fast
 *
 *	Includes UMD wrapper for portability
 * 
 * --- The MIT License ---
 *
 *	Copyright © 2016 Iain Shorter
 *
 *	Permission is hereby granted, free of charge, to any person obtaining a copy
 *	of this software and associated documentation files (the "Software"), to deal
 *	in the Software without restriction, including without limitation the rights
 *	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *	copies of the Software, and to permit persons to whom the Software is
 *	furnished to do so, subject to the following conditions:
 *
 *	The above copyright notice and this permission notice shall be included in
 *	all copies or substantial portions of the Software.
 *
 *	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *	THE SOFTWARE.
 */
(function (root, factory) {

	if (typeof define === 'function' && define.amd) { 
		// AMD
		define(['exports'], factory); 
	} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
		// CommonJS
		factory(exports);
	} else {
		// Global fallback
		factory(root);
	}
	
}(this, function (exports) {

	'use strict';
	
	class Map {
		
		/* --- constructor ---
		 *	takes no arguments
		 */
		constructor () {
			this._keys = [];
			this._values = [];
		}
		
		/* --- get size ---
		 *	returns current size of the map as an integer
		 */
		get size () {
			return this._keys.length;
		}
		
		/* --- get length ---
		 *	always returns 0 as per the es6 spec
		 */
		get length () {
			return 0;
		}
	
		/* --- get keys ---
		 *	returns an array of all the keys in the map
		 */
		get keys () {
			return this._keys.slice(0);
		}
		
		/* --- get values ---
		 *	returns an array of all the values in the map
		 */
		get values () {
			return this._values.slice(0);
		}
	
		/* --- get entries ----
		 *	returns a 2D array of key value pairs
		 */
		get entries () {
			for (var i = 0, output = [], l = this._values.length; i < l; i++) {
				output.push([this._keys[i], this._values[i]]);
			}
			return output;
		}
		
		/* --- clear ---
		 *	removes all items from the map and returns the resultant length, which is always 0
		 */
		clear () {
			this._values.length = this._keys.length = 0;
			return 0;
		}
	
		/* --- delete ---
		 *	removes a key value pair and returns a boolean indicating if the key existed
		 */
		delete (key) {
			var i = this._keys.indexOf(key);
			if (~i) {
				this._keys.splice(i, 1);
				this._values.splice(i, 1);
				return true;
			} else {
				return false;
			}
		}
	
		/* --- get ---
		 *	returns the value for a given key
		 */
		get (key) {
			var i = this._keys.indexOf(key);
			return this._values[i];
		}
		
		/* --- has ---
		 *	returns a boolean indicating the existence of a key
		 */
		has (key) {
			return !!~this._keys.indexOf(key);
		}
	
		/* --- set ---
		 *	maps a key to a value
		 */
		set (key, value) {
			var i = this._keys.indexOf(key);
			if (~i) {
				this._values[i] = value;
			} else {
				this._keys.push(key);
				this._values.push(value);
			}
		}
		
		/* --- forEach ---
		 *	calls a function for each key value pair with an optional context parameter
		 *	callback receives 3 arguments ( value, key, map )
		 *	keys and values are cached during the function execution to maintain indexes if items are added/removed
		 */
		forEach (fn, context) {
			var keys = this.keys,
				values = this.values,
				i = 0,
				l = values.length; 
			for (; i < l; i++) {
				fn.call(context || this, values[i], keys[i], this);
			}
		}
	}
	
	exports.Map = Map;

}));