# Angular DatePicker 
### by [Cuppa Labs](http://www.cuppalabs.com)
[![npm version](https://img.shields.io/npm/v/angular-cuppa-datepicker.svg)](https://www.npmjs.com/package/angular-cuppa-datepicker)

Angular Cuppa Datepicker is a cool responsive Datepicker directive for Web and Mobile. It is Mobile friendly and light weight. Developed by [Cuppa Labs](http://www.cuppalabs.com).

## Demo

View the [Demo here](https://cuppalabs.github.io/angular-cuppa-datepicker/) of Date Picker.
[Click here](https://jsfiddle.net/solomon301/s3hL05s6/) for JSFiddle.

![www.cuppalabs.com](https://raw.githubusercontent.com/CuppaLabs/angular-cuppa-datepicker/master/images/angular-datepicker.png)

## Getting Started
- Install with [npm](https://www.npmjs.com): `npm install angular-cuppa-datepicker`

#### 				OR
#### Steps to Download and setup
#### 1. Add Datepicker Directive
Include the `datepicker-directive.js` script file in the `<head>` section or at the bottom of your html page.
```html
<script src="datepicker-directive.js" type="text/javascript"></script>
```
#### 2. CSS
Include the CSS file in `<head>` section of your page.
```html
<link href="cuppa-datepicker-styles.css" rel="stylesheet">
```

#### 3. Initialize
Inject the directive `cuppaDatepickerDirective` as a dependency into the module where the datepicker needs to be initialized.

```js
angular.module("cuppaDatepicker",["cuppaDatepickerDirective"])
.controller("cuppaDatepickerController",function($scope){
        $scope.myDate = "2016-6-12";
        $scope.myDate2 = "1990-04-18";
});

```
#### 4. HTML
Directive tag declaration.
```html
 <cuppa-datepicker 
 		ng-model="myDate" 
		big-banner="true" 
		format="DD/MM/YYYY" 
		default-open="true"
		on-date-select="onDateSelect(selectedDate)">
</cuppa-datepicker>
```
#### 5. External Dependencies

We have font awesome icons as dependency for the component. Don't forget to include the following dependencies.

```html
<script src="https://use.fontawesome.com/698aa4e2c2.js"></script>
```

## API Documentation

## Configuration

Following directive attirbutes can be configured.

|Property|Required|Default|Description|
|:--- |:--- |:--- |:--- |:--- |
|`ng-model`|YES|`''`| scope model for the date field.|
|`big-banner`   |Optional|`true`|Set to true to have a cool banner above the month table. Set false to have a simple datepicker|
|`format`|optional|`DD/MM/YYYY`|Date format of the calendar. This will be bound to the model as the date's value.|
|`default-open`|optional|`false`|To open the dateoicker popover on load. Default false.|


## Events

- `on-date-select`

Define a callback method to call on select of the date.

Example : 

```html
  on-date-select="onDateSelect(selectedDate)"
```

## Licence

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

--

The MIT License (MIT)
Copyright (c) 2016 Cuppa Labs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

## Credits
Thanks to Font Awesome and Moment.js for the libraries.

## Author
Pradeep Kumar Terli
