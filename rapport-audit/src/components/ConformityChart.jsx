import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Lightbulb, Key, Link2, History, Database } from 'lucide-react';

export default function ConformityChart({ data }) {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "Le modèle client présente des lacunes critiques avec seulement 42% de conformité. Les identifiants instables et les cardinalités incorrectes compromettent l'intégrité des données. Le modèle corrigé atteint 100% de conformité avec des clés primaires stables et une traçabilité complète.";
  const typingSpeed = 30; // ms par caractère

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-effect rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">Analyse Comparative de Conformité</h3>
      
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis 
            dataKey="critere" 
            stroke="#e5e7eb"
            tick={{ fill: '#e5e7eb' }}
            angle={-15}
            textAnchor="end"
            height={80}
          />
          <YAxis stroke="#e5e7eb" tick={{ fill: '#e5e7eb' }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1a1a1a', 
              border: '1px solid #333',
              borderRadius: '8px'
            }}
            labelStyle={{ color: '#e5e7eb' }}
          />
          <Legend wrapperStyle={{ color: '#e5e7eb' }} />
          <Bar dataKey="client" fill="#e11d48" name="MCD Client" radius={[8, 8, 0, 0]} />
          <Bar dataKey="corrige" fill="#10b981" name="MCD Corrigé" radius={[8, 8, 0, 0]} />
          <Bar dataKey="max" fill="#64748b" name="Maximum" radius={[8, 8, 0, 0]} opacity={0.3} />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-ruby-500/10 rounded-lg border border-ruby-500/20 h-24 flex flex-col justify-center">
          <p className="text-sm text-platinum-400 mb-1">MCD Client</p>
          <p className="text-2xl font-bold text-ruby-500">42%</p>
        </div>
        <div className="text-center p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20 h-24 flex flex-col justify-center">
          <p className="text-sm text-platinum-400 mb-1">MCD Corrigé</p>
          <p className="text-2xl font-bold text-emerald-500">100%</p>
        </div>
        <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20 h-24 flex flex-col justify-center">
          <p className="text-sm text-platinum-400 mb-1">Amélioration</p>
          <p className="text-2xl font-bold text-yellow-500">+58%</p>
        </div>
      </div>

      {/* Typing Insight */}
      <div 
        className="mt-6 p-5 rounded-xl flex items-start gap-4"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.01)'
        }}
      >
        <div className="flex-shrink-0 mt-1">
          <Lightbulb className="w-6 h-6 text-emerald-400" />
        </div>
        <div className="flex-1">
          <p className="text-base text-platinum-300" style={{ lineHeight: '1.8' }}>
            {displayedText}
            <span className="inline-block w-0.5 h-5 bg-emerald-400 ml-1 animate-pulse"></span>
          </p>
        </div>
      </div>

      {/* Points Clés d'Amélioration */}
      <div className="mt-6 space-y-3">
        <div className="flex items-start gap-4 p-5 rounded-xl" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}>
          <div className="flex-shrink-0 p-3 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
            <Key className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-semibold text-white mb-2">Identifiants Stables</h4>
            <p className="text-sm text-platinum-400" style={{ lineHeight: '1.8' }}>
              Remplacement de 5 clés primaires instables (nom, titre) par des identifiants techniques pérennes (ISBN, codeEditeur, codeAuteur, codeBarres, matricule). Cette modification garantit l'unicité et la stabilité des références dans le temps.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-5 rounded-xl" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}>
          <div className="flex-shrink-0 p-3 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
            <Link2 className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-semibold text-white mb-2">Cardinalités Réalistes</h4>
            <p className="text-sm text-platinum-400" style={{ lineHeight: '1.8' }}>
              Correction de 8 relations avec cardinalités erronées. Passage de relations n:n incorrectes vers des relations 1:n conformes au monde physique (un livre a un seul éditeur, un exemplaire appartient à une seule édition, etc.).
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-5 rounded-xl" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}>
          <div className="flex-shrink-0 p-3 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
            <History className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-semibold text-white mb-2">Traçabilité Complète</h4>
            <p className="text-sm text-platinum-400" style={{ lineHeight: '1.8' }}>
              Ajout d'attributs temporels essentiels (dateEmprunt, dateRetourPrevu, dateRetourEffectif) permettant l'historisation des emprunts et la gestion des retards. Ces données sont indispensables pour le suivi opérationnel.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-5 rounded-xl" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}>
          <div className="flex-shrink-0 p-3 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
            <Database className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-semibold text-white mb-2">Normalisation Avancée</h4>
            <p className="text-sm text-platinum-400" style={{ lineHeight: '1.8' }}>
              Respect strict de la 3ème forme normale avec élimination des dépendances transitives. Création d'entités distinctes pour Editeur et Auteur, évitant ainsi la redondance et facilitant la maintenance des données de référence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
