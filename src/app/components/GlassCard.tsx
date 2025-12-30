import React from 'react';
import { CardProps } from '@/types';

const GlassCard: React.FC<CardProps> = ({
  title,
  description,
  icon,
  metrics,
  onClick,
  type,
}) => {
  const gradientClass = type === 'e2e' 
    ? 'from-blue-500/20 to-cyan-500/10'
    : 'from-purple-500/20 to-pink-500/10';

  return (
    <div
      onClick={onClick}
      className={`relative glassmorphism rounded-2xl p-6 cursor-pointer hover-glow transition-all duration-300 border border-white/20 hover:border-white/40 group ${gradientClass} bg-gradient-to-br`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {description}
            </p>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold text-gray-700 dark:text-gray-200">
          {type === 'e2e' ? 'End-to-End' : 'RTB'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {metric.label}
            </div>
            <div className="flex items-baseline space-x-2">
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {metric.value}
              </div>
              {metric.change && (
                <div className={`text-sm ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change >= 0 ? '↑' : '↓'} {Math.abs(metric.change)}%
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default GlassCard;