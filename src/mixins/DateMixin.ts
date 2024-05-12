
import moment from 'moment'
export const dateMixin=()=>{
    function $convertFromMMDDYYYYwithTimeToDDMMYYYY(date) {
        if (date)
            return moment(date, 'MM/DD/YYYY HH:mm:ss').format('DD/MM/YYYY');
        else
            return null;
    };
    function $convertToCalendarFormat(date) {
        if (!date) return null;
        if (date.includes('T')) {
            let onlyDate = date.split("T");
            return onlyDate[0];
        } else if (date.includes('-')) {
            return date;
        } else if (date.includes(" ") && date.includes("/")) {
            return moment(date, 'MM/DD/YYYY HH:mm:ss').format('YYYY-MM-DD');
        } else if (date.includes("/")) {
            return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
        } else
            return date;
    };
    function $convertFromCalenderToDDMMYYYY(date) {
        return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    }
    function $convertToDDMMYYYYFormat(date) {
        if (!date) return null;
        else if (date.length < 10)
            return date;
        else if (date.includes('T') && date.includes('-')) {
            return moment(date, 'YYYY-MM-DDTHH:mm:ss').format('DD/MM/YYYY');
        } else if (date.includes('-')) {
            return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
        } else if (date.includes(" ") && date.includes("/")) {
            return moment(date, 'MM/DD/YYYY HH:mm:ss').format('DD/MM/YYYY');
        } else if (date.includes("/")) {
            return moment(date, 'MM/DD/YYYY').format('DD/MM/YYYY');
        } else
            return date;
    }
    function $convertToMMDDYYYYFormat(date) {
        if (!date) return null;
        else if (date.length < 10)
            return date;
        else if (date.includes('T') && date.includes('-')) {
            return moment(date, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY');
        } else if (date.includes('-')) {
            return moment(date, 'YYYY-MM-DD').format('MM/DD/YYYY');
        } else if (date.includes(" ") && date.includes("/")) {
            return moment(date, 'MM/DD/YYYY HH:mm:ss').format('MM/DD/YYYY');
        } else if (date.includes("/")) {
            return moment(date, 'DD/MM/YYYY').format('MM/DD/YYYY');
        } else
            return date;
    }
    function $convertAPIDateWithTimeToDDMMYYYYFormat(date) {
        if (!date) return null;
        else if (date.length < 10)
            return date;
        else if (date.includes('T') && date.includes('-')) {
            return moment(date, 'YYYY-MM-DDTHH:mm:ss').format('DD/MM/YYYY');
        } else if (date.includes('-')) {
            return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
        } else if (date.includes(" ") && date.includes("/")) {
            return moment(date, 'MM/DD/YYYY HH:mm:ss').format('DD/MM/YYYY');
        } else
            return date;
    };
    function $isValidDateInDDMMYYYY(date) {
        if (moment(date, 'DD/MM/YYYY', true).isValid() || moment(date, 'DD/M/YYYY', true).isValid() ||
            moment(date, 'D/MM/YYYY', true).isValid() || moment(date, 'D/M/YYYY', true).isValid())
            return true;
        else
            return false;
    };
    function checkValue(str, max) {
        if (str.charAt(0) !== '0' || str == '00') {
            var num = parseInt(str);
            if (isNaN(num) || num <= 0 || num > max) num = 1;
            str = num > parseInt(max.toString().charAt(0)) &&
                num.toString().length == 1 ? '0' + num : num.toString();
        };
        return str;
    };
    function $addAutoSlashToDate(inputDate:any) {
        moment(inputDate).format('DD/MM/YYYY');
    };
    //input must be in same format
    function $dateComparison(date1, date2) {
        var firstDate = moment(date1);
        var secondDate = moment(date2);
        if (firstDate > secondDate) {
            return "Greater";
        } else if (firstDate < secondDate) {
            return "Smaller";
        } else {
            return "ok";
        }
    };
 
    return{
        dateMixin,
        $dateComparison,
        $convertToCalendarFormat,
        $convertFromCalenderToDDMMYYYY,
        $addAutoSlashToDate,
        $convertToDDMMYYYYFormat,
        $convertToMMDDYYYYFormat
        

    }
}
      
