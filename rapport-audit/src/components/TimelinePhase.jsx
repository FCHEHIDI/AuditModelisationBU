import React from 'react';
import { Clock, CheckCircle2, Circle } from 'lucide-react';

const priorityColors = {
  critique: 'border-ruby-500 bg-ruby-500/5',
  haute: 'border-orange-500 bg-orange-500/5',
  moyenne: 'border-yellow-500 bg-yellow-500/5'
};

const priorityBadgeStyles = {
  critique: {
    border: '2px solid rgb(225, 29, 72)',
    color: 'rgb(225, 29, 72)',
    boxShadow: '0 0 15px rgba(225, 29, 72, 0.5), inset 0 0 10px rgba(225, 29, 72, 0.1)',
    backgroundColor: 'transparent'
  },
  haute: {
    border: '2px solid rgb(249, 115, 22)',
    color: 'rgb(249, 115, 22)',
    boxShadow: '0 0 15px rgba(249, 115, 22, 0.5), inset 0 0 10px rgba(249, 115, 22, 0.1)',
    backgroundColor: 'transparent'
  },
  moyenne: {
    border: '2px solid rgb(234, 179, 8)',
    color: 'rgb(234, 179, 8)',
    boxShadow: '0 0 15px rgba(234, 179, 8, 0.5), inset 0 0 10px rgba(234, 179, 8, 0.1)',
    backgroundColor: 'transparent'
  }
};

export default function TimelinePhase({ phase, index }) {
  const borderColor = priorityColors[phase.priorite] || priorityColors.moyenne;
  const badgeStyle = priorityBadgeStyles[phase.priorite] || priorityBadgeStyles.moyenne;
  
  return (
    <div className="relative">
      {/* Timeline connector */}
      {index !== 0 && (
        <div className="absolute left-6 -top-8 w-0.5 h-8 bg-gradient-to-b from-emerald-500/50 to-transparent"></div>
      )}
      
      <div className={`glass-effect rounded-xl p-6 border-l-4 ${borderColor} card-hover`}>
        <div className="flex items-start gap-4">
          {/* Phase number */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ruby-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
              {index + 1}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-bold text-white">{phase.phase}</h4>
              <span 
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={badgeStyle}
              >
                {phase.priorite.toUpperCase()}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-platinum-400 mb-4">
              <Clock className="w-4 h-4" />
              <span>{phase.duree}</span>
            </div>
            
            <ul className="space-y-2">
              {phase.taches.map((tache, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-platinum-300">
                  <Circle className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-500" />
                  <span>{tache}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
