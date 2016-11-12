angular.module("cuppaDatepickerDirective",[])
.directive('cuppaDatepicker',function(){
    return {
        restrict:'E',
        replace: true,
        scope:{
            bigBanner:"=",
            defaultOpen:"=",
            defaultDate:"=ngModel",
            format: "@",
            callback:"&onDateSelect"
        },
        template:`<div class="winkel-calendar">
                    <input type="hidden" class="wc-input" value="{{myDate | date: 'dd/MM/yyyy'}}">
                    <div class="wc-date-container" ng-click="popover = !popover"><span>{{myDate | date: 'dd/MM/yyyy'}}</span><i class="fa fa-calendar"></i></div>
                    <div class="wc-date-popover" ng-class="{'banner-true': bigBanner == true}" ng-show="popover">
                        <div class="wc-banner">
                            <div class="wc-day-row">{{myDate | date: 'EEEE'}}</div>
                            <div class="wc-date-row">{{myDate | date: 'dd'}}</div>
                            <div class="wc-my-sec">
                                <div class="wc-month-row" ng-click="monthsView = !monthsView">
                                <div>{{myDate | date: 'MMM'}}</div>
                                </div>
                                <div class="wc-year-row" ng-click="generateYearList()">
                                <div>{{myDate | date: 'yyyy'}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="wc-details">
                            <i class="wc-prev fa fa-angle-left" ng-click="prevMonth($event)"></i>
                            <div class="month-year">{{myDate | date: 'MMMM'}} {{myDate | date: 'yyyy'}}</div>
                            <i class="wc-next fa fa-angle-right" ng-click="nextMonth($event)"></i>
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
                            <span ng-repeat="month in cal_months_labels_short" value="{{month}}">{{month}}</span>
                        </div>
                        <div class="years-view" ng-show="yearView">
                            <div class="fa fa-angle-left prev" ng-click="generateYearList('prev')"></div>
                            <div class="fa fa-angle-right next" ng-click="generateYearList('next')"></div>
                            <div class="years-list-view" ng-click="setYear($event)">
                                <span ng-repeat="year in yearsList" value="{{year}}" ng-class="{'current-year': year == myDate.getFullYear()}">{{year}}</span>
                            </div>
                        </div>
                        <table class="calendar-days" ng-click="setDay($event);">
                            <tr ng-repeat="week in monthDays">
                                <td class="calendar-day" ng-class="{'today': day == today.getDate() && myDate.getMonth() == today.getMonth() && myDate.getFullYear() == today.getFullYear(),'selected-day': day == myDate.getDate()}" ng-repeat="day in week track by $index">
                                    <span ng-if="day != 0" value="{{day}}">{{day}}</span>
                                </td>
                                
                            </tr>
                        </table>
                    </div>
                    </div>`,
        link: function(scope, elem, attr){

            console.log(scope.defaultDate);

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
                        console.log(day+" -- "+monthLength);
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
                console.log(dateArr);
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
                 var selectedMonth = parseInt(scope.cal_months_labels_short.indexOf(evt.target.getAttribute('value')));
                   scope.myDate.setMonth(selectedMonth);
                   scope.monthsView = !scope.monthsView;
            }
            scope.setDay = function(evt){
                  var selectedDay = parseInt(evt.target.getAttribute('value'));
                  scope.myDate.setDate(selectedDay);  
                  scope.popover = false;
                  console.log(scope.myDate);
                  scope.callback({"selectedDate":scope.myDate});
            }

        }
    }
});
