import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Smartphone, CreditCard } from 'lucide-react';

const Hero = () => {
  return (
    <main className="container mx-auto px-4 pt-20 md:pt-32 text-center relative">
      {/* Floating Icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute left-1/4 top-0"
      >
        <div className="bg-blue-600/20 backdrop-blur-sm animate-bounce-slow p-4 mt-2 rounded-xl shadow-lg border border-blue-500/20">
          <Smartphone className="w-8 h-8 text-blue-500" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute sm:right-1/4 bottom-0"
      >
        <div className="animate-bounce-slow  sm:block bg-purple-600/20 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-purple-500/20">
          <CreditCard className="w-8 h-8 text-purple-500 " />
        </div>
      </motion.div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-[#FFD700]">
          Welcome to
          <div className="mt-2">
            <span className="text-blue-400">Paytm</span>{" "}
            <span className="text-[#FFD700]">Wallet</span>
            <span className="text-blue-400">.</span>
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Your one-stop solution for all digital payments.
          Pay, invest, and manage your finances with ease.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <Button size="lg" className="bg-blue-500  hover:bg-blue-600 text-white px-8 py-6 text-lg">
            Get Started
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default Hero;