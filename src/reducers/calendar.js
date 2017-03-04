import moment from 'moment';
import * as bd from '../bd/localstorage';

var firstMonth = moment(new Date()).format('MMM YYYY');
var initialState = fillingCaledar(firstMonth);

// заполнение календаря и занятых дней
function fillingCaledar(firstMonth){
  var firstDay = searchCornerDay(firstMonth)
  if(firstDay==="Invalid date"){
    firstDay = searchCornerDay(toCorrectDateMonth(firstMonth))
  }
  var
    days=[],
    DAY = new Date(firstDay),
    month = moment(firstDay).add(15, 'day').format('MMM YYYY');

  for (var i = 0, day; i < 42; i++) {
    day = moment(DAY).add(i, 'day').format('MMMM D YYYY');
    days.push({
      day,
      busy: bd.getRecByDate(day)
    })
  }

  return {days, month};
}

// привести дату в требуемый для IE вид
function toCorrectDateMonth(val){
  var
    ARR = {
      'Jan': '01',
      'Feb': '02',
      'Mar': '03',
      'Apr': '04',
      'May': '05',
      'Jun': '06',
      'Jul': '07',
      'Aug': '08',
      'Sep': '09',
      'Oct': '10',
      'Nov': '11',
      'Dec': '12'
    },
    num = val.split(' '),
    first = ARR[num[0]];
  return num[1] + '-' + first;
}

// нахождение углового числа
function searchCornerDay(month){
  var
    DAY = moment(new Date(month)),
    date = Number(DAY.format('D')),
    dayOfWeek = Number(DAY.format('e'));

  if (dayOfWeek === 0) {dayOfWeek = 7}
  var firstDay = DAY.add( -(date+dayOfWeek-2), 'day').format('MMMM D YYYY');
  return firstDay;
}

export default function (state=initialState, action) {
  var month;
	if (action.type === "MONTH_LEFT") {
    month = moment(new Date(state.month)).add(-1, 'months').format('MMM YYYY');
    firstMonth = month;
    state =fillingCaledar(month);
    return {
      ...state
    }
	}

  if (action.type === "MONTH_RIGHT") {
    month = moment(new Date(state.month)).add(1, 'months').format('MMM YYYY');
    firstMonth = month;
    state =fillingCaledar(month);
    return {
      ...state
    }
	}

  if (action.type === "UPDATE_BUSY_DAYS") {
    state = fillingCaledar(firstMonth);
    return {
      ...state
    }
  }
	return state;
}
