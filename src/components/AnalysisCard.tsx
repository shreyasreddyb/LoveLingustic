import React from 'react';
import { motion } from 'framer-motion';

interface AnalysisCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export function AnalysisCard({ icon, title, value }: AnalysisCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white p-4 rounded-lg shadow border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600">{value}</p>
    </motion.div>
  );
}