import React from 'react';
import { AlertOctagon, ChevronRight } from 'lucide-react';

const severityColors = {
  5: 'border-l-ruby-500 bg-ruby-500/10',
  4: 'border-l-orange-500 bg-orange-500/10',
  3: 'border-l-yellow-500 bg-yellow-500/10'
};

const severityLabels = {
  5: 'Critique',
  4: 'Majeure',
  3: 'Moyenne'
};

const severityBadgeStyles = {
  5: {
    border: '2px solid rgb(225, 29, 72)',
    color: 'rgb(225, 29, 72)',
    boxShadow: '0 0 15px rgba(225, 29, 72, 0.5), inset 0 0 10px rgba(225, 29, 72, 0.1)',
    backgroundColor: 'transparent'
  },
  4: {
    border: '2px solid rgb(249, 115, 22)',
    color: 'rgb(249, 115, 22)',
    boxShadow: '0 0 15px rgba(249, 115, 22, 0.5), inset 0 0 10px rgba(249, 115, 22, 0.1)',
    backgroundColor: 'transparent'
  },
  3: {
    border: '2px solid rgb(234, 179, 8)',
    color: 'rgb(234, 179, 8)',
    boxShadow: '0 0 15px rgba(234, 179, 8, 0.5), inset 0 0 10px rgba(234, 179, 8, 0.1)',
    backgroundColor: 'transparent'
  }
};

export default function ErrorCard({ erreur }) {
  const colorClass = severityColors[erreur.severite] || severityColors[3];
  const badgeStyle = severityBadgeStyles[erreur.severite] || severityBadgeStyles[3];
  
  return (
    <div className={`glass-effect rounded-xl p-6 border-l-4 ${colorClass} card-hover`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-ruby-500/20 p-2 rounded-lg">
            <AlertOctagon className="w-5 h-5 text-ruby-500" />
          </div>
          <div>
            <span className="text-xs font-bold text-platinum-400">Erreur {erreur.id}</span>
            <h4 className="text-lg font-bold text-white">{erreur.titre}</h4>
          </div>
        </div>
        <span 
          className="text-xs font-bold px-3 py-1 rounded-full"
          style={badgeStyle}
        >
          {severityLabels[erreur.severite]}
        </span>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm font-semibold text-platinum-300 mb-1">Impact:</p>
          <p className="text-sm text-platinum-200">{erreur.impact}</p>
        </div>
        
        <div className="pt-3 border-t border-white/10">
          <p className="text-sm font-semibold text-emerald-500 mb-1 flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            Correction:
          </p>
          <p className="text-sm text-platinum-200 pl-6">{erreur.correction}</p>
        </div>
      </div>
    </div>
  );
}
