import { Calendar, Sun, Moon } from 'lucide-react';
import { getGregorianDate, getBengaliDate, getHijriDate, toBengaliNumeral } from '../utils/calendar';

function CalendarCard({ icon: Icon, label, weekday, day, month, year, yearSuffix, accentColor }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-md">
      <div className="flex items-center gap-2 text-muted-foreground mb-4">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{weekday}</p>
        <p className="text-4xl font-semibold tracking-tight text-foreground">{day}</p>
        <p className="text-lg text-foreground/80">{month}</p>
        <p className="text-sm text-muted-foreground">
          {year} {yearSuffix && <span>{yearSuffix}</span>}
        </p>
      </div>
      <div 
        className={`absolute -bottom-4 -right-4 h-24 w-24 rounded-full transition-transform group-hover:scale-110 ${accentColor}`} 
      />
    </div>
  );
}

export default function DateDisplay({ currentDate }) {
  const gregorian = getGregorianDate(currentDate);
  const bengali = getBengaliDate(currentDate);
  const hijri = getHijriDate(currentDate);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <CalendarCard
        icon={Calendar}
        label="Gregorian"
        weekday={gregorian.weekday}
        day={gregorian.day}
        month={gregorian.month}
        year={gregorian.year}
        accentColor="bg-green-500/10"
      />
      
      <CalendarCard
        icon={Sun}
        label="বাংলা"
        weekday={bengali.weekday}
        day={toBengaliNumeral(bengali.day)}
        month={bengali.month}
        year={toBengaliNumeral(bengali.year)}
        yearSuffix="বঙ্গাব্দ"
        accentColor="bg-amber-500/10"
      />
      
      <CalendarCard
        icon={Moon}
        label="Hijri"
        weekday={hijri.weekday}
        day={hijri.day}
        month={hijri.month}
        year={hijri.year}
        yearSuffix="AH"
        accentColor="bg-blue-500/10"
      />
    </div>
  );
}
