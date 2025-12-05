import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Database, 
  Calendar,
  Menu,
  X
} from 'lucide-react';

const tabs = [
  { id: 'synthese', label: 'Synthèse', icon: LayoutDashboard },
  { id: 'criteres', label: 'Critères', icon: FileText },
  { id: 'analyse', label: 'Analyse', icon: Search },
  { id: 'erreurs', label: 'Erreurs', icon: AlertTriangle, badge: '11' },
  { id: 'modele', label: 'Modèle Corrigé', icon: CheckCircle },
  { id: 'sql', label: 'SQL', icon: Database },
  { id: 'plan', label: 'Plan d\'Action', icon: Calendar }
];

export default function Sidebar({ activeTab, onTabChange }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg glass-effect text-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen
        w-72 glass-effect-sidebar border-r border-white/10
        flex flex-col z-40
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ruby-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base font-bold text-white truncate">Audit MCD</h1>
              <p className="text-xs text-platinum-400 truncate">Bibliothèque</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <div key={tab.id} className="relative nav-item-wrapper">
                  <button
                    onClick={() => {
                      onTabChange(tab.id);
                      if (window.innerWidth < 1024) setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl
                      transition-all duration-300 relative group
                      ${isActive 
                        ? 'bg-gradient-to-r from-ruby-500 to-emerald-500 text-white shadow-lg nav-active' 
                        : 'text-platinum-300 hover:bg-white/5 nav-inactive'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 transition-transform duration-300 ${!isActive && 'group-hover:scale-110 group-hover:rotate-3'}`} />
                    <span className="font-medium">{tab.label}</span>
                    {tab.badge && (
                      <span className="ml-auto bg-ruby-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                  {/* Tooltip */}
                  {!isActive && (
                    <div className="tooltip">
                      {tab.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="glass-effect rounded-lg p-3 status-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-ruby-500 pulse-glow"></div>
                <span className="text-platinum-300 font-semibold text-xs">Action Requise</span>
              </div>
              <span className="text-ruby-500 font-bold text-xs">11</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
