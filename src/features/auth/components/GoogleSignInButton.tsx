import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (res: { credential: string }) => void }) => void;
          renderButton: (el: HTMLElement, options: Record<string, unknown>) => void;
        };
      };
    };
  }
}

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
let googleInitialized = false;

export function GoogleSignInButton() {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!CLIENT_ID || !containerRef.current) return;
    const tryRender = () => {
      if (!window.google || !containerRef.current) return false;
      if (!googleInitialized) {
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: async (res) => {
            await googleLogin(res.credential);
            navigate("/");
          },
        });
        googleInitialized = true;
      }
      window.google.accounts.id.renderButton(containerRef.current, {
        theme: "outline",
        size: "large",
        width: containerRef.current.offsetWidth,
        text: "continue_with",
        shape: "rectangular",
        logo_alignment: "center",
      });
      return true;
    };
    if (!tryRender()) {
      const interval = setInterval(() => tryRender() && clearInterval(interval), 200);
      return () => clearInterval(interval);
    }
  }, [googleLogin, navigate]);

  if (!CLIENT_ID) return null;
  return <div ref={containerRef} className="w-full" />;
}