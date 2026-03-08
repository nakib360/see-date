import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import DateDisplay from './components/DateDisplay';
import HolidaysDisplay from './components/HolidaysDisplay';
import LiveClock from './components/LiveClock';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const [currentDate, setCurrentDate] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now);
    setLastUpdated(now.toLocaleString('en-US', { 
      dateStyle: 'medium', 
      timeStyle: 'short' 
    }));
  }, []);

  const refreshDate = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);

    const now = new Date();
    setCurrentDate(now);
    setLastUpdated(now.toLocaleString('en-US', { 
      dateStyle: 'medium', 
      timeStyle: 'short' 
    }));

    // Brief delay so the spin is visible even on fast refresh
    setTimeout(() => setIsRefreshing(false), 400);
  };

  if (!currentDate) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-12 md:py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-48 rounded bg-muted" />
            <div className="grid gap-4 md:grid-cols-3">
              <div className="h-48 rounded-xl bg-muted" />
              <div className="h-48 rounded-xl bg-muted" />
              <div className="h-48 rounded-xl bg-muted" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 md:py-16">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl text-balance">
              See Date
            </h1>
            <p className="text-sm text-muted-foreground">
              Multi-calendar date viewer for daily use
            </p>
          </div>
          <div className="flex items-center gap-3">
            <LiveClock />
            <button
              onClick={refreshDate}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-muted/80 disabled:opacity-60"
              aria-label="Refresh date"
              disabled={isRefreshing}
              aria-busy={isRefreshing}
            >
              <RefreshCw
                className={`h-4 w-4 transition-transform duration-500 ${
                  isRefreshing ? 'animate-spin' : ''
                }`}
              />
            </button>
            <ThemeToggle />
          </div>
        </header>

        {/* Date Cards */}
        <section className="mb-8">
          <DateDisplay currentDate={currentDate} />
        </section>

        {/* Holidays Section */}
        <section className="mb-8">
          <HolidaysDisplay currentDate={currentDate} />
        </section>

        {/* Footer */}
        <footer className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
          <p className="mt-2 text-xs text-muted-foreground/60">
            Build with Nakib
          </p>
        </footer>
      </div>
    </main>
  );
}
