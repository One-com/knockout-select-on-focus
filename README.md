# knockout.selectOnFocus

This binding selects the text in a input field or a textarea when the field get focused.

[Click here to see an example](http://one-com.github.io/knockout-select-on-focus/)

## Install

### NPM

`npm install knockout-select-on-focus`

## Usage

    <input type="text" data-bind="selectOnFocus: true">
    Selects all text when the element is focused.

    <input type="text" data-bind="selectOnFocus: /^[^\.]+/">
    Selects all text before the first period when the element is focused.

    <input type="text" data-bind="selectOnFocus: { pattern: /^[^\.]+/, onlySelectOnFirstFocus: true }">
    Only select the pattern on the first focus.

## License

Knockout.selectOnFocus is licensed under a standard 3-clause BSD license -- see the `LICENSE`-file for details.
