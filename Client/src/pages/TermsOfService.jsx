import React from 'react';
import { Helmet } from 'react-helmet';
 
const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-200">
      <Helmet>
        <title>Terms of Service - Apna Poster</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">
        Welcome to Apna Poster! By using our platform, you agree to the following
        terms and conditions. Please read them carefully.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Use of Service</h2>
      <p className="mb-4">
        You may use our services only in compliance with these terms and all
        applicable laws. Misuse of the platform is strictly prohibited.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Account Responsibilities</h2>
      <p className="mb-4">
        You are responsible for maintaining the confidentiality of your account
        and any activity under it. Notify us immediately if you suspect
        unauthorized access.
      </p>
      <p className="mt-6">Last Updated: September 2025</p>
    </div>
  );
};
 
export default TermsOfService;