import React from 'react';
import { Helmet } from 'react-helmet';
 
const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-200">
      <Helmet>
        <title>Privacy Policy - Apna Poster</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        At Apna Poster, we respect your privacy and are committed to protecting your
        personal information. This Privacy Policy explains how we collect, use,
        and safeguard your data when you use our platform.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <p className="mb-4">
        We may collect your name, email, and activity details when you use our
        services. This data helps us improve our platform and personalize your
        experience.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Data</h2>
      <p className="mb-4">
        Your information is used for authentication, account management, service
        improvements, and communication purposes. We never sell your data.
      </p>
      <p className="mt-6">Last Updated: September 2025</p>
    </div>
  );
};
 
export default PrivacyPolicy;