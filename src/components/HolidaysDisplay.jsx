import { useEffect, useMemo, useState } from 'react';
import { Sparkles, MapPin, PartyPopper, Loader2 } from 'lucide-react';
import { getHolidayTypeStyles } from '../utils/calendar';

const API_KEY = import.meta?.env?.VITE_CALENDARIFIC_KEY

export default function HolidaysDisplay({ currentDate }) {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCountry, setActiveCountry] = useState("BD");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  useEffect(() => {
    setLoading(true);
    fetch(`https://calendarific.com/api/v2/holidays?&api_key=${import.meta.env.VITE_CALENDARIFIC_KEY}&country=${activeCountry}&year=${year}&month=${month}&day=${day}`)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        const todayHolidays = data?.response?.holidays || [];

        if (todayHolidays.length === 0 && activeCountry !== "US") {
          setActiveCountry("US");
        } else {
          setHolidays(todayHolidays);
        }
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  }, [year, month, day, activeCountry]);


  console.log(holidays)

  const header = (
    <div className="flex items-center gap-2 text-muted-foreground mb-4">
      <Sparkles className="h-4 w-4" />
      <span className="text-xs font-medium uppercase tracking-wider">
        {"Today's Holidays"}
      </span>
      <span className="ml-auto text-xs bg-muted px-2 py-1 rounded-full">
        {holidays.length} {holidays.length === 1 ? 'event' : 'events'}
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        {header}
        <div className="flex items-center justify-center py-6 text-muted-foreground gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading holidays…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        {header}
        <div className="text-sm text-red-500">Failed to load holidays: {error}</div>
      </div>
    );
  }

  if (holidays.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        {header}
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <PartyPopper className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm">
            No holidays or observances today
          </p>
          <p className="text-muted-foreground/60 text-xs mt-1">
            Check back tomorrow!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      {header}
      <div className="space-y-3">
        {holidays.map((holiday, index) => (
          <div
            key={`${holiday.name}-${index}`}
            className="flex items-start gap-3 rounded-lg border border-border bg-background/50 p-4 transition-colors hover:bg-muted/50"
          >
            <div className="flex-1">
              <p className="font-medium text-foreground">{holiday.name}</p>
              <p className="font-medium text-gray-400 text-xs">{holiday.description}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span
                  className={`text-xs capitalize px-2 py-0.5 rounded-full border ${getHolidayTypeStyles(holiday.type)}`}
                >
                  {holiday.type}
                </span>
                {holiday.countries?.length ? (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{holiday.countries.join(', ')}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
