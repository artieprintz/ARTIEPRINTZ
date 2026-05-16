import React from 'react';

interface Props {
  phone?: string; // in international format without +, e.g. '919900000000'
  message?: string;
}

export default function WhatsAppButton({ phone = '919900000000', message = 'Hi%20I%20want%20to%20order' }: Props) {
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title="Chat on WhatsApp"
      className="fixed bottom-8 left-8 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#24b85b] text-white px-4 py-3 rounded-full shadow-2xl transition-colors font-black uppercase tracking-[0.15em]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M20.52 3.48A11.91 11.91 0 0012.01.01C6.25.01 1.38 4.88 1.38 10.64c0 1.87.49 3.68 1.42 5.29L.24 23.22l7.55-2.02c1.53.42 3.12.64 4.77.64 5.76 0 10.64-4.87 10.64-10.64 0-2.85-1.11-5.53-3.68-7.36zM12.01 20.02c-1.44 0-2.86-.38-4.1-1.09l-.29-.17-4.48 1.2 1.2-4.37-.19-.3A8.9 8.9 0 013.1 10.64c0-4.93 4.02-8.95 8.91-8.95 2.38 0 4.61.93 6.29 2.62a8.9 8.9 0 012.6 6.33c-.01 4.9-4.03 8.92-8.9 8.92z" />
        <path d="M17.27 14.23c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15s-.78.97-.96 1.17c-.18.2-.36.22-.66.07-.3-.15-1.27-.46-2.42-1.49-.9-.8-1.51-1.79-1.69-2.09-.18-.3-.02-.46.14-.6.14-.12.3-.33.45-.5.15-.18.2-.3.3-.5.1-.2 0-.37-.01-.52-.01-.15-.68-1.65-.94-2.28-.25-.59-.51-.51-.68-.52l-.58-.01c-.2 0-.52.07-.8.37-.28.3-1.08 1.05-1.08 2.56s1.11 2.97 1.26 3.18c.15.2 2.18 3.35 5.29 4.69 3.11 1.34 3.11.89 3.66.83.56-.07 1.77-.72 2.02-1.42.26-.71.26-1.32.18-1.45-.08-.13-.28-.2-.58-.36z" />
      </svg>
      <span className="text-sm">Chat</span>
    </a>
  );
}
