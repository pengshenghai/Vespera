import Navbar from '@/components/Navbar';
import Mainfooter from '@/components/Mainfooter';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-brand-gradient">
        <Navbar />
        <div className="container mx-auto px-6 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/80 text-lg">
            Last updated: February 20, 2026
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 md:py-16 max-w-4xl">
        <div className="prose prose-slate max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Introduction
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Welcome to Chioma. We are committed to protecting your personal
              information and your right to privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our platform.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Please read this privacy policy carefully. If you do not agree
              with the terms of this privacy policy, please do not access the
              platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Information We Collect
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Account information (name, email address, phone number)</li>
              <li>Profile information and preferences</li>
              <li>Payment and transaction information</li>
              <li>Communications with us</li>
              <li>Blockchain wallet addresses and transaction data</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Protect against fraudulent or illegal activity</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Blockchain Technology
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Chioma utilizes blockchain technology for secure and transparent
              transactions. Please note that blockchain transactions are public
              and permanent. While we implement measures to protect your
              privacy, certain transaction data may be visible on the public
              blockchain.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Data Security
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We implement appropriate technical and organizational security
              measures to protect your personal information. However, no method
              of transmission over the internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Your Rights
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding
              your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your personal information</li>
              <li>Objection to processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Contact Us
            </h2>
            <p className="text-slate-600 leading-relaxed">
              If you have questions or concerns about this Privacy Policy,
              please contact us at{' '}
              <a
                href="mailto:privacy@chioma.com"
                className="text-brand-blue hover:underline"
              >
                privacy@chioma.com
              </a>
              .
            </p>
          </section>

          <div className="mt-12 p-6 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-500 italic">
              This is a placeholder Privacy Policy. Please consult with legal
              professionals to create a comprehensive privacy policy that
              complies with applicable laws and regulations in your
              jurisdiction.
            </p>
          </div>
        </div>
      </div>

      <Mainfooter />
    </main>
  );
}
