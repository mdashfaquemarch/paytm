import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const CtaSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="mt-32 container mx-auto px-4"
    >
      <Card className="bg-[#151516] backdrop-blur-sm border border-[#151516] rounded-xl px-5  md:p-12 shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold mb-4 text-[#FFD700]">
            Ready to Experience Seamless Payments?
          </CardTitle>
          <CardDescription className="text-gray-300 mb-6">
            Join millions of users and start your digital payment journey today.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg">
            Download Paytm App
          </Button>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default CtaSection;