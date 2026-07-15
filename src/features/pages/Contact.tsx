import { useState, type FormEvent } from "react";
import { Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/Button";

const inputClass = "rounded-xl border border-outline-variant px-md py-sm font-body-md w-full";
const CONTACT_EMAIL = "chhoa.anika07@gmail.com";
const CONTACT_PHONE = "+8801761651313";
const CONTACT_NAME = "Anika";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Message from " + name + " - OpenShelf");
    const body = encodeURIComponent(message + "\n\n- " + name + " (" + email + ")");
    window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;
  };

  return (
    <div className="min-h-screen bg-surface pt-32 pb-xxl max-w-4xl mx-auto px-lg">
      <h1 className="font-headline-lg text-headline-lg text-primary text-center mb-sm">Get in Touch</h1>
      <p className="font-body-md text-body-md text-on-surface-variant text-center mb-xl max-w-xl mx-auto">
        Questions, feedback, or partnership ideas - we'd love to hear from you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
        <div className="flex flex-col gap-lg">

          <div className="flex items-start gap-md">
            <User className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="font-label-md text-label-md text-on-surface">OpenShelf Team</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">{CONTACT_NAME}</p>
            </div>
          </div>

          <div className="flex items-start gap-md">
            <Mail className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="font-label-md text-label-md text-on-surface">Email</p>
              <a href={"mailto:" + CONTACT_EMAIL} className="font-label-sm text-label-sm text-primary hover:underline">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-md">
            <Phone className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="font-label-md text-label-md text-on-surface">Phone</p>
              <a href={"tel:" + CONTACT_PHONE} className="font-label-sm text-label-sm text-primary hover:underline">
                {CONTACT_PHONE}
              </a>
            </div>
          </div>

        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" className={inputClass} />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Your email" className={inputClass} />
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Your message" rows={5} className={inputClass} />
          <Button type="submit">Send Message</Button>
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            This opens your email app with your message pre-filled, addressed to {CONTACT_NAME}.
          </p>
        </form>
      </div>
    </div>
  );
}