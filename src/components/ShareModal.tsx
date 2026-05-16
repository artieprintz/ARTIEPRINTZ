import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Twitter, Facebook, MessageCircle, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productId: string;
}

export default function ShareModal({ isOpen, onClose, productName, productId }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/product/${productId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=Check out ${productName} on ARTiE_PRINTz&url=${shareUrl}`,
      color: 'hover:bg-[#1DA1F2]'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      color: 'hover:bg-[#4267B2]'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=Check out ${productName} on ARTiE_PRINTz: ${shareUrl}`,
      color: 'hover:bg-[#25D366]'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-zinc-950 border border-zinc-800 p-8 z-[101] shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Share <span className="text-brand-accent">Product</span></h2>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-2">{productName}</p>
              </div>
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="w-full bg-zinc-900 border border-zinc-800 px-6 py-4 text-[11px] text-zinc-400 font-mono focus:outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-black hover:bg-brand-accent hover:text-white transition-all italic text-[10px] font-black uppercase tracking-widest flex items-center space-x-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {shareLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center p-6 bg-zinc-900 border border-zinc-800 transition-all group ${link.color}`}
                  >
                    <link.icon className="w-6 h-6 text-zinc-500 group-hover:text-white mb-2" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <p className="mt-8 text-[9px] text-center text-zinc-600 uppercase tracking-[0.3em] font-medium italic">
               The future is shareable.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
