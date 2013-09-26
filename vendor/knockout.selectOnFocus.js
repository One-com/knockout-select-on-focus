/*global ko*/

// Github repository: https://github.com/One-com/knockout-dragdrop
// License: standard 3-clause BSD license https://raw.github.com/One-com/knockout-dragdrop/master/LICENCE

/**
 * This binding selects the text in a input field or a textarea when the
 * field get focused.
 *
 * Usage:
 *     <input type="text" data-bind="selectOnFocus: true">
 *     Selects all text when the element is focused.
 *
 *     <input type="text" data-bind="selectOnFocus: /^[^\.]+/">
 *     Selects all text before the first period when the element is focused.
 *
 *     <input type="text" data-bind="selectOnFocus: { pattern: /^[^\.]+/, onlySelectOnFirstFocus: true }">
 *     Only select the pattern on the first focus.
 */
(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["knockout"], factory);
    } else {
        // <script> tag: use the global `ko` and `jQuery`
        factory(ko);
    }
})(function (ko) {
    function getOptions(valueAccessor) {
        var options = ko.utils.unwrapObservable(valueAccessor());
        if (options.pattern) {
            return options;
        } else {
            return {pattern: options};
        }
    }

    function selectText(field, start, end) {
        if (field.createTextRange) {
            var selRange = field.createTextRange();
            selRange.collapse(true);
            selRange.moveStart('character', start);
            selRange.moveEnd('character', end);
            selRange.select();
            field.focus();
        } else if (field.setSelectionRange) {
            field.focus();
            field.setSelectionRange(start, end);
        } else if (typeof field.selectionStart !== 'undefined') {
            field.selectionStart = start;
            field.selectionEnd = end;
            field.focus();
        }
    }

    ko.bindingHandlers.selectOnFocus = {
        init: function (element, valueAccessor) {
            var firstFocus = true;
            ko.utils.registerEventHandler(element, 'focus', function (e) {
                setTimeout(function () {
                    var options = getOptions(valueAccessor);
                    var pattern = ko.utils.unwrapObservable(options.pattern);
                    var onlySelectOnFirstFocus = ko.utils.unwrapObservable(options.onlySelectOnFirstFocus);

                    if (!onlySelectOnFirstFocus || firstFocus) {
                        if (Object.prototype.toString.call(pattern) === '[object RegExp]') {
                            var matchInfo = pattern.exec(element.value);
                            if (matchInfo) {
                                var startOffset = matchInfo.index,
                                endOffset = matchInfo.index + matchInfo[0].length;
                                selectText(element, startOffset, endOffset);
                            }
                        } else {
                            element.select();
                        }
                        firstFocus = false;
                    }
                }, 1);
            });
        }
    };
});