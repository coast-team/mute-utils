/*
 *	Copyright 2014 Matthieu Nicolas
 *
 *	This program is free software: you can redistribute it and/or modify
 *	it under the terms of the GNU General Public License as published by
 *	the Free Software Foundation, either version 3 of the License, or
 * 	(at your option) any later version.
 *
 *	This program is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *	GNU General Public License for more details.
 *
 *	You should have received a copy of the GNU General Public License
 *	along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var ArrayIterator = function (aItems) {
	this.items = aItems;
	this.index = 0;
};
ArrayIterator.prototype = {
	constructor: ArrayIterator,
	first: function() {
		this.reset();
		return this.next();
	},
	next: function() {
		return this.items[this.index++];
	},
	hasNext: function() {
		return this.index < this.items.length;
	},
	reset: function() {
		this.index = 0;
	}
};

module.exports = {
	Result: {
		B1AfterB2: 'B1AfterB2',
		B1BeforeB2: 'B1BeforeB2',
		B1InsideB2: 'B1InsideB2',
		B2InsideB1: 'B2InsideB1',
		B1ConcatB2: 'B1ConcatB2',
		B2ConcatB1: 'B2ConcatB1'
	},
	RopesNodes: {
		LEFT: 0,
		RIGHT: 1
	},
	insert: function (s, index, string) {
		var positiveIndex = Math.max(0, index);
		return s.slice(0, positiveIndex) + string + s.slice(positiveIndex);
	},
	del: function (s, begin, end) {
		return s.slice(0, begin) + s.slice(end + 1);
	},
	pushAll: function(arr, elts) {
		arr.push.apply(arr, elts);
	},
	iterator: function(arr) {
	    return new ArrayIterator(arr);
	},
	getLast: function (arr) {
		return arr[arr.length-1];
	},
	copy: function (arr) {
		var result = [];
		var item;

		var i = arr.length;
		while(i > 0) {
			i--;

			item = arr[i];
			if (item instanceof Object && "copy" in item &&
				item.copy instanceof Function && item.copy.length === 0) {

				result[i] = item.copy();
			}
			else {
				result[i] = item;
			}
		}

		return result;
	},
	occurrences: function (string, substring) {
		var result = 0;
		var substringLength = substring.length;

		var pos = string.indexOf(substring);
		while (pos !== -1) {
			result++;
			pos = string.indexOf(substring, pos + substringLength);
		}

		return result;
	},
	// MongoDB can't store keys containing dots so have to replace it
	replaceDots: function (str) {
		return str.replace(/\./g, 'U+FF0E');
	}
};
