const LAST_UPDATED = 'March 5, 2026';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: `When you use SmartBuyAI, we may collect the following types of information:

• Search queries you enter on our platform
• Device and browser information (e.g. browser type, operating system)
• Usage data such as pages visited and time spent on the site
• Cookies and similar tracking technologies for analytics and functionality

We do not collect personally identifiable information unless you voluntarily provide it (e.g. through our contact form).`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:

• Provide and improve our product search and comparison services
• Analyze usage trends to enhance user experience
• Display relevant product recommendations
• Maintain the security and integrity of our platform`,
  },
  {
    title: '3. Affiliate Disclosure',
    content: `SmartBuyAI participates in affiliate marketing programs. When you click on a product link and make a purchase, we may earn a commission from the retailer at no additional cost to you.

These affiliate relationships do not influence our search results or product rankings.`,
  },
  {
    title: '4. Third-Party Services',
    content: `We may use third-party services for analytics (e.g. Google Analytics), hosting (e.g. Firebase), and affiliate tracking. These services may collect data according to their own privacy policies. We encourage you to review the privacy practices of any third-party services you interact with through our platform.`,
  },
  {
    title: '5. Cookies',
    content: `SmartBuyAI uses cookies to improve functionality and analyze site traffic. You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of the site.`,
  },
  {
    title: '6. Data Security',
    content: `We take reasonable measures to protect the information collected through our platform. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "7. Children's Privacy",
    content: `SmartBuyAI is not intended for use by children under the age of 13. We do not knowingly collect personal information from children.`,
  },
  {
    title: '8. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date.`,
  },
  {
    title: '9. Contact Us',
    content: `If you have any questions about this Privacy Policy, please reach out via our Contact page or email us at susarlamallikarjun@gmail.com.`,
  },
] as const;

export function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: {LAST_UPDATED}</p>

      <p className="text-gray-600 mb-8">
        Your privacy is important to us. This Privacy Policy explains how
        SmartBuyAI collects, uses, and protects your information when you use
        our website.
      </p>

      <div className="space-y-8">
        {SECTIONS.map(({ title, content }) => (
          <section key={title}>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{title}</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {content}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
