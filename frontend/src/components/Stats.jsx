import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    { label: "Active Users", value: "350M+" },
    { label: "Daily Transactions", value: "10M+" },
    { label: "Merchant Partners", value: "21M+" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16 px-5"
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#151516] backdrop-blur-sm  border border-white/20 rounded-xl p-6 shadow-md"
        >
          <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
          <div className="text-gray-300">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
};

export default Stats;