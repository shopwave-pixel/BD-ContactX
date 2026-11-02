import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar, ActiveTab } from './components/Navbar';
import { SingleGenerator } from './components/SingleGenerator';
import { BulkGenerator } from './components/BulkGenerator';
import { AddressExplorer } from './components/AddressExplorer';
import { AboutTelecom } from './components/AboutTelecom';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Contact } from './types';
import { generateSingleContact } from './utils/generator';

const MainApp: React.FC = () => {
  const { isBangla } = useLanguage();
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [prefilledContact, setPrefilledContact] = useState<Contact | null>(null);

  const addToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    const newToast: ToastMessage = { id, text, type };
    setToasts((prev) => [...prev.slice(-4), newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSelectLocationFromExplorer = (
    division: string,
    district: string,
    upazila: string
  ) => {
    const contact = generateSingleContact({
      division,
      district,
      upazila,
    });
    setPrefilledContact(contact);
    setActiveTab('dashboard');
    addToast(isBangla ? `${district}, ${division} নির্বাচন করা হয়েছে` : `${district}, ${division} selected in generator`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'dashboard' && (
          <SingleGenerator
            onShowToast={addToast}
            initialContact={prefilledContact}
          />
        )}

        {activeTab === 'bulk' && <BulkGenerator onShowToast={addToast} />}

        {activeTab === 'explorer' && (
          <AddressExplorer
            onShowToast={addToast}
            onSelectLocationForGenerator={handleSelectLocationFromExplorer}
          />
        )}

        {activeTab === 'about' && <AboutTelecom />}
      </main>

      <Footer />
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </ThemeProvider>
  );
}
