// Bengali month names
const bengaliMonths = [
  "বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন",
  "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"
];

// Bengali numerals
const bengaliNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// Bengali weekday names
const bengaliWeekdays = [
  "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"
];

// Convert number to Bengali numerals
export function toBengaliNumeral(num) {
  return num.toString().split('').map(d => bengaliNumerals[parseInt(d)]).join('');
}

// Get Bengali date from Gregorian date
export function getBengaliDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  let bengaliYear = year - 593;
  
  const monthDays = [
    { start: [3, 14], days: 31 },
    { start: [4, 15], days: 31 },
    { start: [5, 15], days: 31 },
    { start: [6, 16], days: 31 },
    { start: [7, 16], days: 31 },
    { start: [8, 16], days: 30 },
    { start: [9, 16], days: 30 },
    { start: [10, 15], days: 30 },
    { start: [11, 15], days: 30 },
    { start: [0, 14], days: 30 },
    { start: [1, 13], days: 30 },
    { start: [2, 15], days: 30 },
  ];
  
  let bengaliMonth = 0;
  let bengaliDay = 1;
  
  for (let i = 0; i < monthDays.length; i++) {
    const [startMonth, startDay] = monthDays[i].start;
    const nextIndex = (i + 1) % 12;
    const [endMonth] = monthDays[nextIndex].start;
    
    const currentDate = new Date(year, month, day);
    const periodStart = new Date(year, startMonth, startDay);
    
    if (startMonth > endMonth) {
      if (month < startMonth) {
        periodStart.setFullYear(year - 1);
      }
    }
    
    const periodEnd = new Date(
      startMonth > endMonth && month >= startMonth ? year + 1 : year,
      monthDays[nextIndex].start[0],
      monthDays[nextIndex].start[1]
    );
    
    if (currentDate >= periodStart && currentDate < periodEnd) {
      bengaliMonth = i;
      const diffTime = currentDate.getTime() - periodStart.getTime();
      bengaliDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
      if (i >= 9) {
        bengaliYear = year - 594;
      }
      break;
    }
  }
  
  return {
    day: bengaliDay,
    month: bengaliMonths[bengaliMonth],
    year: bengaliYear,
    weekday: bengaliWeekdays[date.getDay()]
  };
}

// Get Hijri date using Intl API
export function getHijriDate(date) {
  const hijriFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
  });
  
  const parts = hijriFormatter.formatToParts(date);
  const dayPart = parts.find(p => p.type === 'day');
  const monthPart = parts.find(p => p.type === 'month');
  const yearPart = parts.find(p => p.type === 'year');
  const weekdayPart = parts.find(p => p.type === 'weekday');
  
  return {
    day: parseInt(dayPart?.value || '1'),
    month: monthPart?.value || '',
    year: parseInt(yearPart?.value || '1'),
    weekday: weekdayPart?.value || ''
  };
}

// Get Gregorian date info
export function getGregorianDate(date) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
  const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
  
  return {
    day: date.getDate(),
    month: monthFormatter.format(date),
    year: date.getFullYear(),
    weekday: weekdayFormatter.format(date),
    fullDate: formatter.format(date)
  };
}

// Holiday data - worldwide holidays
export function getHolidays(date) {
  const month = date.getMonth();
  const day = date.getDate();
  const holidays = [];
  
  const holidayData = {
    "0-1": [{ name: "New Year's Day", type: "international" }],
    "0-26": [{ name: "Republic Day", type: "national", countries: ["India"] }],
    "1-14": [{ name: "Valentine's Day", type: "observance" }],
    "1-21": [{ name: "International Mother Language Day", type: "international" }],
    "2-8": [{ name: "International Women's Day", type: "international" }],
    "2-17": [{ name: "St. Patrick's Day", type: "observance" }],
    "2-21": [{ name: "World Poetry Day", type: "international" }],
    "2-26": [{ name: "Independence Day", type: "national", countries: ["Bangladesh"] }],
    "3-1": [{ name: "April Fool's Day", type: "observance" }],
    "3-14": [{ name: "Bengali New Year (Pohela Boishakh)", type: "national", countries: ["Bangladesh", "India"] }],
    "3-22": [{ name: "Earth Day", type: "international" }],
    "4-1": [{ name: "International Workers' Day", type: "international" }],
    "4-9": [{ name: "Victory Day", type: "national", countries: ["Russia"] }],
    "5-5": [{ name: "World Environment Day", type: "international" }],
    "5-21": [{ name: "International Yoga Day", type: "international" }],
    "6-4": [{ name: "Independence Day", type: "national", countries: ["USA"] }],
    "7-15": [{ name: "Independence Day", type: "national", countries: ["India"] }],
    "8-16": [{ name: "International Day for the Preservation of the Ozone Layer", type: "international" }],
    "9-2": [{ name: "International Day of Non-Violence", type: "international" }],
    "9-24": [{ name: "United Nations Day", type: "international" }],
    "9-31": [{ name: "Halloween", type: "observance" }],
    "10-11": [{ name: "Veterans Day", type: "national", countries: ["USA"] }],
    "11-10": [{ name: "Human Rights Day", type: "international" }],
    "11-16": [{ name: "Victory Day", type: "national", countries: ["Bangladesh"] }],
    "11-25": [{ name: "Christmas Day", type: "international" }],
    "11-26": [{ name: "Boxing Day", type: "observance", countries: ["UK", "Canada", "Australia"] }],
    "11-31": [{ name: "New Year's Eve", type: "observance" }],
  };
  
  const key = `${month}-${day}`;
  if (holidayData[key]) {
    holidays.push(...holidayData[key]);
  }
  
  return holidays;
}

// Get holiday type styles
export function getHolidayTypeStyles(type) {
  switch (type) {
    case 'national':
      return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
    case 'religious':
      return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
    case 'international':
      return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
    case 'observance':
      return 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
  }
}
