import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, User, Database, MapPin, Info } from 'lucide-react';

export type ActiveTab = 'dashboard' | 'bulk' | 'explorer' | 'about';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { language, setLanguage, t, isBangla } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard' as ActiveTab, label: t('navDashboard'), icon: User },
    { id: 'bulk' as ActiveTab, label: t('navBulk'), icon: Database },
    { id: 'explorer' as ActiveTab, label: t('navExplorer'), icon: MapPin },
    { id: 'about' as ActiveTab, label: t('navAbout'), icon: Info },
  ];

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4 md:gap-8">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleTabClick('dashboard')}
              className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-emerald-700 transition-colors">
                BD
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap leading-none">
                  {isBangla ? 'বিডি কনট্যাক্টএক্স' : 'BD ContactX'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {isBangla ? 'বাংলাদেশ কন্টাক্ট জেনারেটর' : 'Bangladesh Contact Generator'}
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4 nav links with clean single-line text */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions - Language selector & Dark mode toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Switcher - Segmented Control */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`min-h-[38px] px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  language === 'en'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`min-h-[38px] px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  language === 'bn'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                বাংলা
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? t('lightMode') : t('darkMode')}
              title={isDark ? t('lightMode') : t('darkMode')}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-w-[40px] min-h-[40px] flex items-center justify-center p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full min-h-[44px] flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-xl transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
