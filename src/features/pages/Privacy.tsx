import { useState } from "react";
import { Shield, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "privacy", label: "Privacy Policy", icon: Shield },
  { id: "terms", label: "Terms of Service", icon: FileText },
] as const;

export default function Privacy() {
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">("privacy");

  return (
    <div className="min-h-screen bg-surface pt-32 pb-xxl max-w-3xl mx-auto px-lg">
      <h1 className="font-headline-lg text-headline-lg text-primary mb-sm text-center">
        Privacy &amp; Terms
      </h1>
      <p className="font-body-md text-body-md text-on-surface-variant text-center mb-xl">
        How OpenShelf handles your data, and the terms that govern your membership.
      </p>

      <div className="flex gap-sm mb-xl border-b border-outline-variant">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-xs px-md py-sm font-label-md text-label-md border-b-2 -mb-px transition-colors",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "privacy" ? (
        <div className="flex flex-col gap-lg font-body-md text-body-md text-on-surface-variant">
          <section>
            <h2 className="font-headline-md text-body-lg text-on-surface mb-sm">Information We Collect</h2>
            <p>We collect the information you provide when you register — your name, email, and optionally a profile photo — along with your borrowing and favoriting activity to power your dashboard.</p>
          </section>
          <section>
            <h2 className="font-headline-md text-body-lg text-on-surface mb-sm">How We Use Your Data</h2>
            <p>Your data is used solely to operate your account: tracking loans, enforcing plan limits, and processing subscription payments through Stripe. We do not sell your data to third parties.</p>
          </section>
          <section>
            <h2 className="font-headline-md text-body-lg text-on-surface mb-sm">Payments</h2>
            <p>Subscription payments are processed by Stripe. OpenShelf does not store your card details directly.</p>
          </section>
          <section>
            <h2 className="font-headline-md text-body-lg text-on-surface mb-sm">Your Rights</h2>
            <p>You may edit your profile information at any time from your dashboard. Contact us if you'd like your account data removed.</p>
          </section>
        </div>
      ) : (
        <div className="flex flex-col gap-lg font-body-md text-body-md text-on-surface-variant">
          <section>
            <h2 className="font-headline-md text-body-lg text-on-surface mb-sm">Membership Plans</h2>
            <p>OpenShelf offers Free, Pro, and Premium plans, each with a monthly or annual borrowing limit and loan duration as described on our Pricing page. Plans renew automatically until cancelled.</p>
          </section>
          <section>
            <h2 className="font-headline-md text-body-lg text-on-surface mb-sm">Borrowing</h2>
            <p>Each borrowed title must be returned through your dashboard by its due date. Continued failure to return titles on time may affect your ability to borrow further copies.</p>
          </section>
          <section>
            <h2 className="font-headline-md text-body-lg text-on-surface mb-sm">Cancellation</h2>
            <p>You may cancel your subscription at any time. Your plan remains active until the end of the current billing period.</p>
          </section>
          <section>
            <h2 className="font-headline-md text-body-lg text-on-surface mb-sm">Account Conduct</h2>
            <p>Accounts are for individual use. OpenShelf reserves the right to suspend accounts found to be in violation of these terms.</p>
          </section>
        </div>
      )}
    </div>
  );
}