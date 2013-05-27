This binding selects the text in a input field or a textarea when the field get focused.

Usage:

    <input type="text" data-bind="selectOnFocus: true">
    Selects all text when the element is focused.

    <input type="text" data-bind="selectOnFocus: /^[^\.]+/">
    Selects all text before the first period when the element is focused.

    <input type="text" data-bind="selectOnFocus: { pattern: /^[^\.]+/, onlySelectOnFirstFocus: true }">
    Only select the pattern on the first focus.

