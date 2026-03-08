import { Sparkles, MapPin, PartyPopper } from 'lucide-react';
import { getHolidays, getHolidayTypeStyles } from '../utils/calendar';

export default function HolidaysDisplay({ currentDate }) {
  const holidays = getHolidays(currentDate);

  if (holidays.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-medium uppercase tracking-wider">
            {"Today's Holidays"}
          </span>
        </div>
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
      <div className="flex items-center gap-2 text-muted-foreground mb-4">
        <Sparkles className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wider">
          {"Today's Holidays"}
        </span>
        <span className="ml-auto text-xs bg-muted px-2 py-1 rounded-full">
          {holidays.length} {holidays.length === 1 ? 'event' : 'events'}
        </span>
      </div>
      <div className="space-y-3">
        {holidays.map((holiday, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-lg border border-border bg-background/50 p-4 transition-colors hover:bg-muted/50"
          >
            <div className="flex-1">
              <p className="font-medium text-foreground">{holiday.name}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span
                  className={`text-xs capitalize px-2 py-0.5 rounded-full border ${getHolidayTypeStyles(holiday.type)}`}
                >
                  {holiday.type}
                </span>
                {holiday.countries && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{holiday.countries.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
