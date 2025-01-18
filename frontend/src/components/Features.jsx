import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const Features = () => {
  const features = [
    { 
      icon: <Shield className="w-12 h-12 text-blue-400" />, 
      title: "Secure Payments", 
      description: "Your transactions are protected by industry-leading security measures." 
    },
    { 
      icon: <Zap className="w-12 h-12 text-purple-400" />, 
      title: "Instant Transfers", 
      description: "Send money instantly to anyone, anywhere in India." 
    },
    { 
      icon: <TrendingUp className="w-12 h-12 text-green-400" />, 
      title: "Grow Your Money", 
      description: "Invest in stocks, mutual funds, and digital gold right from your wallet." 
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="mt-32 container mx-auto px-5 "
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#FFD700]">Why Choose Paytm Wallet?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
          >
            <Card className="bg-[#151516] backdrop-blur-sm  border border-white/20 rounded-xl">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl font-semibold mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-gray-300">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Features;