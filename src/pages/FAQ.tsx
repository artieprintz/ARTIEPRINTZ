import { ChevronRight } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import SEO from '../components/SEO';

export default function FAQ() {
  const faqs = [
    { q: "HOW LONG DOES PRINTING TAKE?", a: "Every order is custom printed. We usually take 24-48 hours to curate and print your items before they are shipped." },
    { q: "CAN I CANCEL MY ORDER?", a: "Once an order enters the 'Printing' stage, it cannot be cancelled as it is custom-made for you." },
    { q: "WHAT IF MY PRINT IS DAMAGED?", a: "We take extreme care in packaging, but if anything arrives damaged, contact us on WhatsApp with photos within 24 hours of delivery." },
    { q: "DO YOU DO CUSTOM BULK ORDERS?", a: "Yes, we handle bulk orders for events, brands, and shoots. Email us for curated pricing." }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen pt-40 pb-40 px-10 max-w-4xl mx-auto bg-[#080808]">
       <SEO
         title="FAQ — Printing Process & Ordering Guide | ARTiE PRINTz"
         description="Frequently asked questions about ARTiE PRINTz custom printing processes, bulk order pricing, print damage replacement policies, and dispatch times."
         keywords="printing faq, custom polaroid cancel order, bulk print solutions, order issues artie printz, whatsapp print contact"
         schema={faqSchema}
       />
       <h1 className="text-8xl md:text-9xl font-black tracking-tighter italic mb-20 uppercase text-white">THE <span className="text-brand-accent">FAQ</span></h1>
       
       <h2 className="sr-only">Frequently Asked Questions</h2>
       <div className="space-y-6">
          {faqs.map((faq, i) => (
            <details key={i} className="group cursor-pointer border border-zinc-800 bg-zinc-900/30 overflow-hidden">
               <summary className="list-none flex justify-between items-center p-10 group-hover:bg-zinc-900 transition-all">
                  <h3 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase text-white group-hover:text-brand-accent transition-colors">{faq.q}</h3>
                  <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center group-open:rotate-90 transition-transform">
                    <ChevronRight className="w-5 h-5 text-zinc-500" />
                  </div>
               </summary>
               <div className="px-12 pb-12 pt-4 text-zinc-400 text-lg font-bold italic leading-relaxed border-t border-zinc-800/50">
                  {faq.a}
               </div>
            </details>
          ))}
       </div>

       <div className="mt-40 p-16 border border-zinc-800 bg-zinc-900 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-accent/5 blur-3xl rounded-full"></div>
          <h4 className="text-[11px] uppercase tracking-[0.5em] font-black text-zinc-600 mb-8 italic">Still have questions?</h4>
          <div className="flex items-center justify-center">
            <WhatsAppButton phone="919962200444" message="Hi%20I%20have%20a%20question" />
          </div>
       </div>
    </div>
  );
}
