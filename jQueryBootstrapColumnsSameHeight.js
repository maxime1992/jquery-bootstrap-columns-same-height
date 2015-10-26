/*
  Pull requests are welcome :)
  Github : https://github.com/maxime1992/jQueryBootstrapColumnsSameHeight
*/

(function ($) {
	'use strict';

	$.fn.columnsSameHeight = function (options) {
		/**
		  * set the same height for each element
		  * @param {Array} elements
		  * @return null
		  */
		var sameHeightRow = function (elements) {
			// save the size of the tallest element
			var tallest = 0;

			// loop on every child to find the tallest one
			$.each(elements, function (key, child) {
				// reset original size of the element
				if (options.workOnColumnWrapper) {
					$($(child).children()[0]).css('min-height', '0px');
				}

				else {
					$(child).css('min-height', '0px');
				}

				// save his size if taller than previous
				if ($(child).outerHeight() > tallest) {
					tallest = $(child).outerHeight();
				}
			});

			// set height for every child (matching the tallest one)
			$.each(elements, function (key, child) {
				// $(child).css('min-height', tallest + 'px');

				if (options.workOnColumnWrapper) {
					$($(child).children()[0]).css('min-height', tallest + 'px');
				}

				else {
					$(child).css('min-height', tallest + 'px');
				}
			});
		};

		/**
		 * read responsive properties from every column
		 * @param {Object} element, it's the row containing all the columns
		 * @return {Array} columnResponsiveProperties, contains the length of every
		 *                 columns for xs, sm, md, lg
		 *                 for example : [{xs: 12, sm: 6, md: 4, lg: 2}, ...]
		 */
		var getColumnResponsiveProperties = function (element) {
			// get the children of current element (the col-*-*)
			var children = element.children();

			// array to store column properties
			var columnResponsiveProperties = [];

			/**
			 * get the length of xs class for an element
			 * for example : col-xs-6 would return 6
			 * @param {String} classes, contains all the classes to analyze
			 * @return {Int} return the length of xs class
			 */
			var getXs = function (classes) {
				var re = /col-xs-([0-9]{1,2})/.exec(classes);

				if (re) {
					return parseInt(re[1], 10);
				}

				return 0;
			};

			/**
			 * get the length of sm class for an element
			 * for example : col-sm-6 would return 6
			 * @param {String} classes, contains all the classes to analyze
			 * @return {Int} return the length of sm class
			 */
			var getSm = function (classes) {
				var re = /col-sm-([0-9]{1,2})/.exec(classes);

				if (re) {
					return parseInt(re[1], 10);
				}

				return getXs(classes);
			};

			/**
			 * get the length of md class for an element
			 * for example : col-md-6 would return 6
			 * @param {String} classes, contains all the classes to analyze
			 * @return {Int} return the length of md class
			 */
			var getMd = function (classes) {
				var re = /col-md-([0-9]{1,2})/.exec(classes);

				if (re) {
					return parseInt(re[1], 10);
				}

				return getSm(classes);
			};

			/**
			 * get the length of lg class for an element
			 * for example : col-lg-6 would return 6
			 * @param {String} classes, contains all the classes to analyze
			 * @return {Int} return the length of lg class
			 */
			var getLg = function (classes) {
				var re = /col-lg-([0-9]{1,2})/.exec(classes);

				if (re) {
					return parseInt(re[1], 10);
				}

				return getMd(classes);
			};

			// for each element ...
			$.each(children, function (index, child) {
				var classes = $(child).attr('class');
				// ... save his different sizes for xs, sm, md and lg
				columnResponsiveProperties.push({
					xs: getXs(classes),
					sm: getSm(classes),
					md: getMd(classes),
					lg: getLg(classes)
				});
			});

			return columnResponsiveProperties;
		};

		/**
		 * get the current screen size in 'bootstrap format'
		 * for example : 'xs', 'sm', 'md', 'lg'
		 * @param null
		 * @return {String} screen size
		 */
		var getCurrentScreenSize = function () {
			if ($(document).width() < 768) {
				return 'xs';
			}

			else if ($(document).width() >= 768 && $(document).width() < 992) {
				return 'sm';
			}

			else if ($(document).width() >= 992 && $(document).width() < 1200) {
				return 'md';
			}

			return 'lg';
		};

		/**
		 * set the same height to every columns
		 * @param {Object} element, it's the row containing all the columns
		 * @return null
		 */
		var sameHeight = function (element) {
			// get responsive properties from every column
			var columnResponsiveProperties = getColumnResponsiveProperties(element);

			// get the children of current element (the col-*-*)
			var children = element.children();

			// store the differents rows
			var rows = [];

			// save the sum of every column in the current row
			var sumColumnInCurrentRow = 0;

			// save columns to the current row (if enough place)
			var currentRow = [];

			$.each(columnResponsiveProperties, function (index, column) {
				//  if the column fits in the current row

				if (sumColumnInCurrentRow + column[getCurrentScreenSize()] <= 12) {
					// add the column to the current row
					currentRow.push(children[index]);

					// add the column size to the sum
					sumColumnInCurrentRow += column[getCurrentScreenSize()];
				}

				else {
					// push the current row to the rows' array
					rows.push(currentRow);

					// create another row
					currentRow = [];

					// add the column to the current row
					currentRow.push(children[index]);

					// set the sum to the column size (as it's a new one)
					sumColumnInCurrentRow = column[getCurrentScreenSize()];
				}
			});

			// push the last row to rows' array
			if (currentRow.length > 0) {
				rows.push(currentRow);
			}

			// for each row ...
			$.each(rows, function (key, row) {
				// ... set the same height to every elements, based on the tallest one
				sameHeightRow(row);
			});
		};

		for (var i = 0; i < this.length; i++) {
			sameHeight($(this[i]));
		}

		// save this because it will not be the same in window resize function
		var self = this;

		// when window get resized ...
		$(window).resize(function () {
			// ... launch the main script again to refresh
			for (var i = 0; i < self.length; i++) {
				sameHeight($(self[i]));
			}
		});
	};
})(jQuery);

// demo purpose
/*
// launch the script once document is ready
$( document ).ready(function() {
  // pass workOnColumnWrapper option to true
  // if you prefer to set the size on .row.same-height > .col-*-* > div
  // instead of                       .row.same-height > .col-*-*
  $('.same-height').columnsSameHeight({workOnColumnWrapper: false});
});
*/
