'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface DataParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: 'up' | 'down';
  type: 'circle' | 'square' | 'triangle';
}

export function BackgroundAnimation() {
  const [particles, setParticles] = useState<DataParticle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: DataParticle[] = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          speed: Math.random() * 2 + 1,
          direction: Math.random() > 0.5 ? 'up' : 'down',
          type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle'
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const renderParticle = (particle: DataParticle) => {
    const baseClasses = "absolute opacity-30";
    const colors = [
      'bg-blue-400/30',
      'bg-purple-400/30',
      'bg-green-400/30',
      'bg-orange-400/30',
      'bg-pink-400/30'
    ];
    const color = colors[particle.id % colors.length];

    switch (particle.type) {
      case 'circle':
        return (
          <div
            className={`${baseClasses} ${color} rounded-full`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        );
      case 'square':
        return (
          <div
            className={`${baseClasses} ${color}`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        );
      case 'triangle':
        return (
          <div
            className={`${baseClasses} ${color}`}
            style={{
              width: 0,
              height: 0,
              borderLeft: `${particle.size / 2}px solid transparent`,
              borderRight: `${particle.size / 2}px solid transparent`,
              borderBottom: `${particle.size}px solid currentColor`,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          initial={{
            x: `${particle.x}vw`,
            y: particle.direction === 'up' ? '100vh' : '-10vh',
          }}
          animate={{
            x: `${particle.x}vw`,
            y: particle.direction === 'up' ? '-10vh' : '100vh',
          }}
          transition={{
            duration: 20 / particle.speed,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {renderParticle(particle)}
        </motion.div>
      ))}
      
      {/* Data flow lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="dataFlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${20 + i * 20}%`}
            y1="0%"
            x2={`${20 + i * 20}%`}
            y2="100%"
            stroke="url(#dataFlow)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </div>
  );
}