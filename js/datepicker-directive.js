angular.module("cuppaDatepickerDirective",[])
.directive('cuppaDatepicker',function($document){
    return {
        restrict:'E',
        replace: true,
        scope:{
            bigBanner:"=",
            defaultOpen:"=",
            timePicker:"=",
            defaultDate:"=ngModel",
            format: "@",
            callback:"&onDateSelect"
        },
        template:`<div class="winkel-calendar">
                    <input type="hidden" class="wc-input" value="{{myDate | date: format}}">
                    <div class="wc-date-container" ng-click="popover = !popover"><span>{{myDate | date: format}}</span><i class="fa fa-calendar"></i></div>
                    <div class="wc-date-popover" ng-class="{'banner-true': bigBanner == true}" ng-show="popover">
                        <div class="wc-banner" ng-if="bigBanner" ng-class="{'timepicker-true': timePicker == true}">
                            <div class="wc-day-row">{{myDate | date: 'EEEE'}}</div>
                            <div class="wc-date-row">{{myDate | date: 'dd'}}</div>
                            <div class="wc-my-sec">
                                <div class="wc-month-row">
                                <div>{{myDate | date: 'MMM'}}</div> 
                                </div>
                                <div class="wc-year-row"  >
                                <div>{{myDate | date: 'yyyy'}}</div>
                                </div>
                            </div>
                            <div class="wc-time-sec" ng-if="timePicker" ng-click="toggleTimeView()">
                                <div class="time">
                                    <div class="hour">
                                        <i class="fa fa-chevron-up" ng-click="updateHours('increment')"></i>
                                        <input type="text" value="{{myDate | date: 'hh'}}" autofocus disabled/>
                                        <i class="fa fa-chevron-down" ng-click="updateHours('decrement')"></i>
                                    </div>
                                    <div class="time-divider">:</div>
                                    <div class="minutes">
                                        <i class="fa fa-chevron-up" ng-click="updateMinutes('increment')"></i>
                                        <input type="text" value="{{myDate | date: 'mm'}}" disabled/>
                                        <i class="fa fa-chevron-down" ng-click="updateMinutes('decrement')"></i>
                                    </div>
                                </div>
                                <div class="timestate">
                                        <span>{{myDate | date: 'a'}}</span>
                                 <!--   <span ng-class="{'active': myDate.getHours() <= 11}" ng-click="setMeridian('AM')">AM</span> &nbsp &nbsp
                                    <span ng-class="{'active': myDate.getHours() > 11}" ng-click="setMeridian('PM')">PM</span> -->
                                </div>
                            </div>
                        </div>
                         <div class="wc-details">
                                <i class="wc-prev fa fa-angle-left" ng-click="prevMonth($event)"></i>
                                <div class="month-year" ng-if="bigBanner" ng-click="toggleMonthView()">{{myDate | date: 'MMMM'}}
                                <!-- <i ng-show="!monthsView" class="fa fa-arrow-down"></i>
                                 <i ng-show="monthsView" class="fa fa-arrow-up"></i> -->
                                </div> 
                                <div class="month-year" ng-if="!bigBanner" ng-click="toggleMonthView()">
                                    {{myDate | date: 'MMMM'}} &nbsp 
                                 <!--    <i ng-show="!monthsView" class="fa fa-arrow-down" ng-click="toggleMonthView()"></i>
                                    <i ng-show="monthsView" class="fa fa-arrow-up" ng-click="toggleMonthView()"></i>  -->
                                    
                                </div>
                                <i class="wc-next fa fa-angle-right" ng-click="nextMonth($event)"></i>
                            </div>
                            <div class="year-title">
                                <div class="year-dropdown" ng-click="generateYearList()">
                                    {{myDate | date: 'yyyy'}}
                                    <i ng-show="!yearView" class="fa fa-angle-down"></i>
                                    <i ng-show="yearView" class="fa fa-angle-up"></i>
                                </div>
                            </div>
                        <table class="calendar-header">
                            <tr>
                                <td class="calendar-header-day">Su</td>
                                <td class="calendar-header-day">Mo</td>
                                <td class="calendar-header-day">Tu</td>
                                <td class="calendar-header-day">We</td>
                                <td class="calendar-header-day">Th</td>
                                <td class="calendar-header-day">Fr</td>
                                <td class="calendar-header-day">Sa</td>
                            </tr>
                        </table>
                        <div class="months-view" ng-show="monthsView" ng-click="setMonth($event)">
                            <span ng-repeat="month in cal_months_labels_short" value="{{month}}" ng-class="{'current-month': month == cal_months_labels_short[myDate.getMonth()]}">{{month}}</span>
                        </div>
                        <div class="years-view" ng-show="yearView">
                            <div class="fa fa-angle-left prev" ng-click="generateYearList('prev')"></div>
                            <div class="fa fa-angle-right next" ng-click="generateYearList('next')"></div>
                            <div class="years-list-view" ng-click="setYear($event)">
                                <span ng-repeat="year in yearsList" value="{{year}}" ng-class="{'current-year': year == myDate.getFullYear()}">{{year}}</span>
                            </div>
                        </div>
                        <div class="time-view" ng-show="timeView">
                                <div class="time">
                                    <div class="hour">
                                        <input type="text" value="{{hourValue | numberFixedLen:2}}" autofocus disabled/>
                                    </div>
                                    <div class="time-divider">:</div>
                                    <div class="minutes">
                                        <input type="text" value="{{minValue  | numberFixedLen:2}}" disabled/>
                                    </div>
                                </div>
                                <div>
                                    <div class="cuppa-btn-group">
                                        <button ng-class="{'active': timeViewMeridian == 'AM'}" class="button" ng-model="timeViewMeridian" ng-click="toggleMeridian('AM')">AM</button>
                                        <button ng-class="{'active': timeViewMeridian == 'PM'}"  class="button" ng-model="timeViewMeridian" ng-click="toggleMeridian('PM')">PM</button>
                                    </div>
                                </div>
                                <h5>Hours</h5>
                                <div range-slider
                                            floor="1"
                                            ceiling="12"
                                            step="1"
                                            precision="5"
                                            highlight="left"
                                            ng-model="hourValue"
                                            on-change="onHourUpdate(val)"></div>
                                <h5>Minutes</h5>
                                <div range-slider
                                            floor="0"
                                            ceiling="59"
                                            step="1"
                                            precision="5"
                                            highlight="left"
                                            ng-model="minValue"
                                            on-change="onMinUpdate(val)"></div>
                                <div class="time-view-btn">
                                    <button class="button button-sm" ng-click="setTimeView()">Set Time</button>
                                </div>
                        </div>
                        <table class="calendar-days" ng-click="setDay($event);">
                            <tr ng-repeat="week in monthDays">
                                <td class="calendar-day" ng-class="{'today': day == today.getDate() && myDate.getMonth() == today.getMonth() && myDate.getFullYear() == today.getFullYear(),'selected-day': day == myDate.getDate()}" ng-repeat="day in week track by $index">
                                    <span ng-if="day != 0" value="{{day}}">{{day}}</span>
                                </td>
                                
                            </tr>
                        </table>
                        <div ng-if="!bigBanner">
                            <i class="fa fa-clock-o" aria-hidden="true" ng-click="toggleTimeView()"></i>
                        </div>
                        <div class="cal-util">
                            <div class="ok" ng-click="popover = false"><i class="fa fa-check"></i>Done
                        </div>
                    </div>
                    </div>`,
        link: function(scope, elem, attr){
            
            scope.cal_days_labels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
            scope.cal_full_days_lables = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            scope.cal_months_labels = ['January', 'February', 'March', 'April',
                            'May', 'June', 'July', 'August', 'September',
                            'October', 'November', 'December'];
            scope.cal_months_labels_short = ['JAN', 'FEB', 'MAR', 'APR',
                                'MAY', 'JUN', 'JUL', 'AUG', 'SEP',
                                'OCT', 'NOV', 'DEC'];
            
            scope.cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];       

            scope.myDate = new Date(scope.defaultDate);
            scope.timeViewDate = new Date(scope.myDate);
           // scope.hourValue = 0;
            //scope.minValue = 0;
            scope.timeViewMeridian = "";
            scope.timeView = false;
            if(scope.myDate.getHours() <= 11 ){
                    scope.hourValue = scope.myDate.getHours();
                    scope.timeViewMeridian = "AM";
                }
                else{
                    scope.hourValue = scope.myDate.getHours() - 12;
                    scope.timeViewMeridian = "PM";
                }
                if(scope.myDate.getHours() == 0 || scope.myDate.getHours() == 12){
                    scope.hourValue = 12;
                }
                scope.minValue = scope.myDate.getMinutes();
            scope.today = new Date();
            scope.monthDays = [];
            scope.yearsList = [];
            if(scope.defaultOpen == true){
                scope.popover = true;
            }
            else{
                scope.popover = false;
            }
            scope.generateDays = function(){
                  scope.monthDays = [];
                var year = scope.myDate.getFullYear(),
                    month = scope.myDate.getMonth(),
                    current_day = scope.myDate.getDate(),
                    today = new Date();
                var firstDay = new Date(year, month, 1);
                var startingDay = firstDay.getDay();
                var monthLength = scope.getMonthLength(month,year);
                var day = 1;
                var dateArr = [];
                var dateRow =[];
                // this loop is for is weeks (rows)
                for (var i = 0; i < 9; i++) {
                    // this loop is for weekdays (cells)
                    dateRow = [];
                    for (var j = 0; j <= 6; j++) { 
                        var dateCell = 0;
                    if (day <= monthLength && (i > 0 || j >= startingDay)) {
                        dateCell = day;
                    if(day == parseInt(current_day)){
                       // dateCell.classList.add('selected-day');
                    }
                    if(day == parseInt(today.getDate()) &&  scope.myDate.getMonth() == today.getMonth() &&  scope.myDate.getFullYear() == today.getFullYear()){
                       // dateCell.classList.add('today');
                    }
                        day++;
                    }
                    dateRow.push(dateCell);
                    }
                    // stop making rows if we've run out of days
                    if (day > monthLength) {
                        dateArr.push(dateRow);
                    break;
                    } else {
                        dateArr.push(dateRow);
                    }
                }
                  scope.monthDays = dateArr;
            }

            scope.getMonthLength = function(month,year){
                var monthLength = scope.cal_days_in_month[month];
                
                // compensate for leap year
                if (month == 1) { // February only!
                    if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
                    monthLength = 29;
                    }
                }
                return monthLength;
            }
            scope.generateDays();

            scope.prevMonth = function(e){
                e.stopPropagation();
                var self = this;
                if(scope.myDate.getMonth() == 0){
                    scope.myDate.setMonth(11);
                    scope.myDate.setFullYear(scope.myDate.getFullYear() - 1);
                }else{
                    var prevmonthLength = scope.getMonthLength(scope.myDate.getMonth() - 1, scope.myDate.getFullYear());
                    var currentDate = scope.myDate.getDate();
                    if(currentDate > prevmonthLength ){
                        scope.myDate.setDate(prevmonthLength);
                    }
                    scope.myDate.setMonth(scope.myDate.getMonth() - 1);
                }
                 scope.generateDays();
            }
            scope.nextMonth = function(e){
                e.stopPropagation();
                var self = this;
                if(scope.myDate.getMonth() == 11){
                    scope.myDate.setMonth(0);
                    scope.myDate.setFullYear(scope.myDate.getFullYear() + 1);
                }else{
                    var nextmonthLength = scope.getMonthLength(scope.myDate.getMonth() + 1, scope.myDate.getFullYear());
                    var currentDate = scope.myDate.getDate();
                    if(currentDate > nextmonthLength){
                        scope.myDate.setDate(nextmonthLength);
                    }
                    scope.myDate.setMonth(scope.myDate.getMonth() + 1);
                    
                }
                scope.generateDays();
            }
            scope.generateYearList = function(param){
                var startYear = null;
                var currentYear = null;
                if(param == "next"){
                    startYear = scope.yearsList[8] + 1;
                    currentYear = scope.myDate.getFullYear();
                }
                else if(param == "prev"){
                    startYear = scope.yearsList[0] - 9;
                    currentYear = scope.myDate.getFullYear();
                }
                else{
                    currentYear = scope.myDate.getFullYear();
                    startYear = currentYear - 4;
                    scope.yearView = !scope.yearView;
                    scope.monthsView = false;
                }
                 for(var k=0; k< 9; k++){
                         scope.yearsList[k] = startYear + k;
                    }
            }
            scope.setYear = function(evt){
                  console.log( evt.target );
                  var selectedYear = parseInt(evt.target.getAttribute('value'));
                  scope.myDate.setYear(selectedYear);
                   scope.yearView = !scope.yearView;
            }
            scope.setMonth = function(evt){
                if(evt.target.getAttribute('value')){
                 var selectedMonth = parseInt(scope.cal_months_labels_short.indexOf(evt.target.getAttribute('value')));
                   scope.myDate.setMonth(selectedMonth);
                   scope.monthsView = !scope.monthsView;
                }
            }
            scope.setDay = function(evt){
                if(evt.target.getAttribute('value')){
                  var selectedDay = parseInt(evt.target.getAttribute('value'));
                  scope.myDate.setDate(selectedDay);  
                 // scope.popover = false;
                  console.log(scope.myDate);
                  scope.callback({"selectedDate":scope.myDate});
                }
            }
            scope.toggleMonthView = function(){
                scope.yearView = false;
                scope.monthsView =  !scope.monthsView;
            }
            scope.getAmPm = function (date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'PM' : 'AM';
                return ampm;
            }
            scope.updateHours = function(type){
                if(type == "increment"){
                    var hours = scope.myDate.getHours() + 1;
                    scope.myDate.setHours(hours);
                }
                else{
                    scope.myDate.setHours(scope.myDate.getHours() - 1);
                }
            }
            scope.updateMinutes = function(type){
                if(type == "increment"){
                    var minutes = scope.myDate.getMinutes() + 1;
                    scope.myDate.setMinutes(minutes);
                }
                else{
                    scope.myDate.setMinutes(scope.myDate.getMinutes() - 1);
                }
            }
            scope.setMeridian = function(type){
                    var hour = scope.myDate.getHours();
                    var minute = scope.myDate.getMinutes();
                    if(type == "AM" && hour > 11){
                       var hourstoSet =      hour - 12;
                       scope.myDate.setHours(hourstoSet);
                    }
                    if(type == "PM"  && hour <= 11){
                         var hourstoSet =      hour + 12;
                         scope.myDate.setHours(hourstoSet);
                    }
            }
            scope.toggleTimeView = function(){
              //  if(scope.timeView == false){
                if(scope.myDate.getHours() <= 11 ){
                    scope.hourValue = scope.myDate.getHours();
                    scope.timeViewMeridian = "AM";
                }
                else{
                    scope.hourValue = scope.myDate.getHours() - 12;
                    scope.timeViewMeridian = "PM";
                }
                if(scope.myDate.getHours() == 0 || scope.myDate.getHours() == 12){
                    scope.hourValue = 12;
                }
                scope.minValue = scope.myDate.getMinutes();
               // }
                scope.timeView = !scope.timeView;
            }
            scope.onHourUpdate = function(hour){
                scope.hourValue = hour;
                //scope.timeViewDate.setHours(hour);
            };
            scope.onMinUpdate = function(minutes){
                scope.minValue = minutes;
                //scope.timeViewDate.setMinutes(minutes);
            };
            scope.toggleMeridian = function(val){
                scope.timeViewMeridian = val;
            }
            scope.setTimeView = function(){
                if(scope.timeViewMeridian == "AM"){
                    if(scope.hourValue == 12){
                        scope.myDate.setHours(0);
                    }
                    else{
                        scope.myDate.setHours(scope.hourValue);
                    }
                    scope.myDate.setMinutes(scope.minValue);
                }
                else{
                    if(scope.hourValue == 12){
                        scope.myDate.setHours(scope.hourValue);
                    }
                    else{
                        scope.myDate.setHours(scope.hourValue + 12);
                    }
                    scope.myDate.setMinutes(scope.minValue);
                }
                scope.timeView = !scope.timeView;
            }
           $document.on('click',function(e){
                if(!angular.element(elem)[0].contains(e.target)){
                    scope.popover = false;   
                    scope.timeView = false; 
                    scope.monthsView = false;
                    scope.yearView = false;
                    scope.$apply();  
                }
            });
        }
    }
})
.directive('rangeSlider', ['$timeout', function($timeout){

    var modes = {
      single  : 'SINGLE',
      range   : 'RANGE'
    };

    var events = {
      mouse: {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup'
      },
      touch: {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend'
      }
    };

    function roundStep(value, precision, step, floor) {
      var remainder = (value - floor) % step;
      var steppedValue = remainder > (step / 2) ? value + step - remainder : value - remainder;
      var decimals = Math.pow(10, precision);
      var roundedValue = steppedValue * decimals / decimals;
      return parseFloat(roundedValue.toFixed(precision));
    }

    function offset(element, position) {
      return element.css({
        left: position
      });
    }

    function pixelize(position) {
      return position + "px";
    }

    function contain(value) {
      if (isNaN(value)) return value;
      return Math.min(Math.max(0, value), 100);
    }

    return {

      restrict: 'EA',

      scope: {
        floor       : '@',
        ceiling     : '@',
        step        : '@',
        highlight   : '@',
        precision   : '@',
        buffer      : '@',
        dragstop    : '@',
        ngModel     : '=?',
        ngModelLow  : '=?',
        ngModelHigh : '=?',
        onChange    : '&'
      },

      link : function(scope, element, attrs) {

        element.addClass('angular-range-slider');

        var currentMode = (attrs.ngModel == null) && (attrs.ngModelLow != null) && (attrs.ngModelHigh != null) ? modes.range : modes.single;

        // Dom Components
        var children = element.children();
        var bar         = angular.element(children[0]),
            lowPointer  = angular.element(children[1]),
            highPointer = angular.element(children[2]),
            floorBubble = angular.element(children[3]),
            ceilBubble  = angular.element(children[4]),
            lowBubble   = angular.element(children[5]),
            highBubble  = angular.element(children[6]),
            highlight   = angular.element(bar.children()[0]),
            ngDocument  = angular.element(document);

        var low, high;
        if (currentMode === modes.single) {
          low = 'ngModel';
          highPointer.remove();
          highBubble.remove();
        } else {
          low = 'ngModelLow';
          high = 'ngModelHigh';
        }

        scope.local = {};
        scope.local[low] = scope[low];
        scope.local[high] = scope[high];

        // Control Dimensions Used for Calculations
        var handleHalfWidth = 0,
            barWidth = 0,
            minOffset = 0,
            maxOffset = 0,
            minValue = 0,
            maxValue = 0,
            valueRange = 0,
            offsetRange = 0;

        var bindingsSet = false;

        var updateCalculations = function() {

          if (scope.step === undefined) scope.step = 1;
          if (scope.floor === undefined) scope.floor = 0;
          if (scope.ceiling === undefined) scope.ceiling = 100; //TODO: Make this more intelligent
          if (scope.precision === undefined) scope.precision = 0;

          if (currentMode === modes.single) {
            scope.ngModelLow = scope.ngModel;
            scope.onChange({"val":scope.ngModelLow});
            console.log(scope.ngModelLow);
          }

          scope.local[low] = scope[low];
          scope.local[high] = scope[high];

          scope.floor = roundStep(parseFloat(scope.floor), parseInt(scope.precision), parseFloat(scope.step), parseFloat(scope.floor));
          scope.ceiling = roundStep(parseFloat(scope.ceiling), parseInt(scope.precision), parseFloat(scope.step), parseFloat(scope.floor));

          if (currentMode === modes.range) {
            scope.ngModelLow = roundStep(parseFloat(scope.ngModelLow), parseInt(scope.precision), parseFloat(scope.step), parseFloat(scope.floor));
            scope.ngModelHigh = roundStep(parseFloat(scope.ngModelHigh), parseInt(scope.precision), parseFloat(scope.step), parseFloat(scope.floor));
          } else {
            scope.ngModel = roundStep(parseFloat(scope.ngModel), parseInt(scope.precision), parseFloat(scope.step), parseFloat(scope.floor));
          }

          handleHalfWidth = lowPointer[0].offsetWidth / 2;
          barWidth = bar[0].offsetWidth;
          minOffset = 0;
          maxOffset = barWidth - lowPointer[0].offsetWidth;
          minValue = parseFloat(scope.floor);
          maxValue = parseFloat(scope.ceiling);
          valueRange = maxValue - minValue;
          offsetRange = maxOffset - minOffset;

        };

        var updateDOM = function () {
          updateCalculations();

          var percentOffset = function (offset) {
            return contain(((offset - minOffset) / offsetRange) * 100);
          };

          var percentValue = function (value) {
            return contain(((value - minValue) / valueRange) * 100);
          };

          var pixelsToOffset = function (percent) {
            return pixelize(percent * offsetRange / 100);
          };

          var setPointers = function () {
            offset(ceilBubble, pixelize(barWidth - ceilBubble[0].offsetWidth));

            var newLowValue, newHighValue;
            newLowValue = percentValue(scope.local[low]);
            offset(lowPointer, pixelsToOffset(newLowValue));
            offset(lowBubble, pixelize(lowPointer[0].offsetLeft - (lowBubble[0].offsetWidth / 2) + handleHalfWidth));
            offset(highlight, pixelize(lowPointer[0].offsetLeft + handleHalfWidth));

            if (currentMode === modes.range) {
              newHighValue = percentValue(scope.local[high]);
              offset(highPointer, pixelsToOffset(newHighValue));
              offset(highBubble, pixelize(highPointer[0].offsetLeft - (highBubble[0].offsetWidth / 2) + handleHalfWidth));

              highlight.css({
                width: pixelsToOffset(newHighValue - newLowValue)
              });

            } else if (scope.highlight === 'right') {

              highlight.css({
                width: pixelsToOffset(110 - newLowValue)
              });

            }
            else if (scope.highlight === 'left') {

              highlight.css({
                width: pixelsToOffset(newLowValue)
              });

              offset(highlight, 0);
            }

          };

          var bind = function (handle, bubble, ref, events) {

            var currentRef = ref;

            var onEnd = function () {
              bubble.removeClass('active');
              handle.removeClass('active');
              ngDocument.unbind(events.move);
              ngDocument.unbind(events.end);
              if (scope.dragstop) {
                scope[high] = scope.local[high];
                scope[low] = scope.local[low];
              }
              currentRef = ref;
              scope.$apply();
            };

            var onMove = function (event) {

              // Suss out which event type we are capturing and get the x value
              var eventX = 0;
              if (event.clientX !== undefined) {
                eventX = event.clientX;
              }
              else if ( event.touches !== undefined && event.touches.length) {
                eventX = event.touches[0].clientX;
              }
              else if ( event.originalEvent !== undefined &&
                        event.originalEvent.changedTouches !== undefined &&
                        event.originalEvent.changedTouches.length) {
                eventX = event.originalEvent.changedTouches[0].clientX;
              }

              var newOffset = Math.max(Math.min((eventX - element[0].getBoundingClientRect().left - handleHalfWidth), maxOffset), minOffset),
                  newPercent = percentOffset(newOffset),
                  newValue = minValue + (valueRange * newPercent / 100.0);

              if (currentMode === modes.range) {
                switch (currentRef) {
                  case low:
                    if (newValue > scope.local[high]) {
                      currentRef = high;
                      lowPointer.removeClass('active');
                      lowBubble.removeClass('active');
                      highPointer.addClass('active');
                      highBubble.addClass('active');
                      setPointers();
                    } else if (scope.buffer > 0) {
                      newValue = Math.min(newValue, scope.local[high] - scope.buffer);
                    }
                    break;
                  case high:
                    if (newValue < scope.local[low]) {
                      currentRef = low;
                      highPointer.removeClass('active');
                      highBubble.removeClass('active');
                      lowPointer.addClass('active');
                      lowBubble.addClass('active');
                      setPointers();
                    } else if (scope.buffer > 0) {
                      newValue = Math.max(newValue, parseInt(scope.local[low]) + parseInt(scope.buffer));
                    }
                }
              }

              newValue = roundStep(newValue, parseInt(scope.precision), parseFloat(scope.step), parseFloat(scope.floor));
              scope.local[currentRef] = newValue;

              if (!scope.dragstop) {
                scope[currentRef] = newValue;
              }

              setPointers();
              scope.$apply();
            };

            var onStart = function (event) {
              updateCalculations();
              bubble.addClass('active');
              handle.addClass('active');
              setPointers();
              event.stopPropagation();
              event.preventDefault();
              ngDocument.bind(events.move, onMove);
              return ngDocument.bind(events.end, onEnd);
            };

            handle.bind(events.start, onStart);
          };

          var setBindings = function () {
            var method, i;
            var inputTypes = ['touch', 'mouse'];
            for (i = 0; i < inputTypes.length; i++) {
              method = inputTypes[i];

              if (currentMode === modes.range) {
                bind(lowPointer, lowBubble, low, events[method]);
                bind(highPointer, highBubble, high, events[method]);
              } else {
                bind(lowPointer, lowBubble, low, events[method]);
              }
            }

            bindingsSet = true;
          };

          if (!bindingsSet) {
            setBindings();
          }

          setPointers();
        };

        // Watch Models based on mode
        scope.$watch(low, updateDOM);

        if (currentMode === modes.range) {
          scope.$watch(high, updateDOM);
        }

        window.addEventListener('resize', updateDOM);
      },

      template :  '<div class="bar"><div class="selection"></div></div>' +
                  '<div class="handle low"><span style="display: block;margin-top: 3px;" class="bubble value low">{{ ngModelLow }}</span></div>' +
                  '<div class="handle high"></div>' +
                  '<div class="bubble limit low">{{ floor }}</div>' +
                  '<div class="bubble limit high">{{ ceiling }}</div>' +
                  '<div class="bubble value high">{{ ngModelHigh }}</div>'

    }

  }])
  .filter('numberFixedLen', function () {
        return function (n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) {
                return n;
            }
            num = ''+num;
            while (num.length < len) {
                num = '0'+num;
            }
            return num;
        };
    });
