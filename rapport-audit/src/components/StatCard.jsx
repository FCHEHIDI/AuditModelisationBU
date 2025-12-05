import React from 'react';
import { AlertCircle, AlertTriangle, Target, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';

const iconMap = {
  AlertCircle,
  AlertTriangle,
  Target,
  CheckCircle,
  TrendingUp,
  TrendingDown
};

const colorMap = {
  ruby: 'from-ruby-500 to-ruby-700',
  emerald: 'from-emerald-500 to-emerald-700',
  orange: 'from-orange-500 to-orange-700',
  yellow: 'from-yellow-500 to-yellow-700'
};

export default function StatCard({ label, value, icon, color, trend, target }) {
  const Icon = iconMap[icon] || AlertCircle;
  const gradientColor = colorMap[color] || colorMap.ruby;

  return (
    <div className="glass-effect rounded-2xl p-6 card-hover relative overflow-hidden group h-full flex flex-col">
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradientColor}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && (
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
              trend.includes('-') ? 'bg-ruby-500/20 text-ruby-500' : 'bg-emerald-500/20 text-emerald-500'
            }`}>
              {trend}
            </span>
          )}
        </div>
        
        <div className="mt-auto">
          <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
          <p className="text-platinum-300 text-sm font-medium">{label}</p>
          {target && (
            <p className="text-platinum-400 text-xs mt-2">
              Objectif: <span className="text-emerald-500 font-semibold">{target}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
