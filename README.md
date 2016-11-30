# Angular DateTimePicker 
### by [Cuppa Labs](http://www.cuppalabs.com)
[![npm version](https://img.shields.io/npm/v/angular-cuppa-datepicker.svg)](https://www.npmjs.com/package/angular-cuppa-datepicker)

Angular Cuppa DateTimepicker is a cool responsive DateTimepicker directive for Web and Mobile. It is Mobile friendly and light weight. Developed by [Cuppa Labs](http://www.cuppalabs.com).

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
        $scope.myDate = new Date();
        $scope.myDate2 = "04-18-1990 12:15 AM";
});

```
#### 4. HTML
Directive tag declaration.
```html
 <cuppa-datepicker 
 		ng-model="myDate" 
		big-banner="true" 
		format="dd/MM/yyyy hh:mm a" 
		default-open="true"
		time-picker="true" 
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
|`format`|optional|`dd/MM/yyyy`|Date format of the calendar. This will be bound to the model as the date's value.|
|`default-open`|optional|`false`|To open the dateoicker popover on load. Default false.|
|`time-picker`|optional|`false`|Enable timepicker feature.|


## Events

- `on-date-select`

Define a callback method to call on select of the date.

Example : 

```html
  on-date-select="onDateSelect(selectedDate)"
```
## Date Formats Support

format string can be composed of the following elements:

- 'yyyy': 4 digit representation of year (e.g. AD 1 => 0001, AD 2010 => 2010)
- 'yy': 2 digit representation of year, padded (00-99). (e.g. AD 2001 => 01, AD 2010 => 10)
- 'y': 1 digit representation of year, e.g. (AD 1 => 1, AD 199 => 199)
- 'MMMM': Month in year (January-December)
- 'MMM': Month in year (Jan-Dec)
- 'MM': Month in year, padded (01-12)
- 'M': Month in year (1-12)
- 'LLLL': Stand-alone month in year (January-December)
- 'dd': Day in month, padded (01-31)
- 'd': Day in month (1-31)
- 'EEEE': Day in Week,(Sunday-Saturday)
- 'EEE': Day in Week, (Sun-Sat)
- 'HH': Hour in day, padded (00-23)
- 'H': Hour in day (0-23)
- 'hh': Hour in AM/PM, padded (01-12)
- 'h': Hour in AM/PM, (1-12)
- 'mm': Minute in hour, padded (00-59)
- 'm': Minute in hour (0-59)
- 'ss': Second in minute, padded (00-59)
- 's': Second in minute (0-59)
- 'sss': Millisecond in second, padded (000-999)
- 'a': AM/PM marker
- 'Z': 4 digit (+sign) representation of the timezone offset (-1200-+1200)
- 'ww': Week of year, padded (00-53). Week 01 is the week with the first Thursday of the year
- 'w': Week of year (0-53). Week 1 is the week with the first Thursday of the year
- 'G', 'GG', 'GGG': The abbreviated form of the era string (e.g. 'AD')
- 'GGGG': The long form of the era string (e.g. 'Anno Domini')

format string can also be one of the following predefined localizable formats:

- 'medium': equivalent to 'MMM d, y h:mm:ss a' for en_US locale (e.g. Sep 3, 2010 12:05:08 PM)

- 'short': equivalent to 'M/d/yy h:mm a' for en_US locale (e.g. 9/3/10 12:05 PM)
- 'fullDate': equivalent to 'EEEE, MMMM d, y' for en_US locale (e.g. Friday, September 3, 2010)
- 'longDate': equivalent to 'MMMM d, y' for en_US locale (e.g. September 3, 2010)
- 'mediumDate': equivalent to 'MMM d, y' for en_US locale (e.g. Sep 3, 2010)
- 'shortDate': equivalent to 'M/d/yy' for en_US locale (e.g. 9/3/10)
- 'mediumTime': equivalent to 'h:mm:ss a' for en_US locale (e.g. 12:05:08 PM)
- 'shortTime': equivalent to 'h:mm a' for en_US locale (e.g. 12:05 PM)

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
