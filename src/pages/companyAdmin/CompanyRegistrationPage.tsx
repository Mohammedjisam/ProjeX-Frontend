// src/pages/company/CompanyRegistrationPage.tsx
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CompanyRegistrationForm from '../../components/companyAdmin/CompanyRegistrationForm';

const CompanyRegistrationPage = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <CompanyRegistrationForm />
      </motion.div>
    </AnimatePresence>
  );
};

export default CompanyRegistrationPage;