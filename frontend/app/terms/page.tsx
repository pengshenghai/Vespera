import Navbar from '@/components/Navbar';
import Mainfooter from '@/components/Mainfooter';

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-brand-gradient">
        <Navbar />
        <div className="container mx-auto px-6 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
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
              Agreement to Terms
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              By accessing or using the Chioma platform, you agree to be bound
              by these Terms of Service and all applicable laws and regulations.
              If you do not agree with any of these terms, you are prohibited
              from using or accessing this platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Use of Platform
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Chioma provides a blockchain-based rental platform connecting
              landlords, tenants, and agents. You agree to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use the platform only for lawful purposes</li>
              <li>Not interfere with or disrupt the platform</li>
              <li>Comply with all applicable local, state, and federal laws</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              User Accounts
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              To access certain features of the platform, you must create an
              account. You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Maintaining the confidentiality of your account</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Blockchain Transactions
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Chioma utilizes blockchain technology for transactions. You
              acknowledge and agree that:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Blockchain transactions are irreversible</li>
              <li>You are responsible for managing your wallet and private keys</li>
              <li>Transaction fees may apply and are subject to network conditions</li>
              <li>We are not responsible for blockchain network issues or delays</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Rental Agreements
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Chioma facilitates the creation and management of rental
              agreements. All parties entering into rental agreements through
              the platform are responsible for ensuring compliance with local
              rental laws and regulations. Chioma is not a party to any rental
              agreement and does not guarantee the performance of any user.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Fees and Payments
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Certain features of the platform may require payment of fees. All
              fees are non-refundable unless otherwise stated. We reserve the
              right to modify our fees at any time with reasonable notice.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Intellectual Property
            </h2>
            <p className="text-slate-600 leading-relaxed">
              The platform and its original content, features, and functionality
              are owned by Chioma and are protected by international copyright,
              trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-slate-600 leading-relaxed">
              To the maximum extent permitted by law, Chioma shall not be liable
              for any indirect, incidental, special, consequential, or punitive
              damages resulting from your use of or inability to use the
              platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Termination
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to terminate or suspend your account and
              access to the platform at our sole discretion, without notice, for
              conduct that we believe violates these Terms of Service or is
              harmful to other users, us, or third parties, or for any other
              reason.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Changes to Terms
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to modify these terms at any time. We will
              notify users of any material changes by posting the new Terms of
              Service on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Contact Information
            </h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about these Terms of Service, please
              contact us at{' '}
              <a
                href="mailto:legal@chioma.com"
                className="text-brand-blue hover:underline"
              >
                legal@chioma.com
              </a>
              .
            </p>
          </section>

          <div className="mt-12 p-6 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-500 italic">
              This is a placeholder Terms of Service. Please consult with legal
              professionals to create comprehensive terms that comply with
              applicable laws and regulations in your jurisdiction.
            </p>
          </div>
        </div>
      </div>

      <Mainfooter />
    </main>
  );
}
