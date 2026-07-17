import React, { useState } from 'react';
import { 
  ArrowLeft, Star, ShieldCheck, CheckCircle2, ShoppingBag, Phone, Share2, 
  Truck, Award, Leaf, Activity, Info, ChevronRight, HelpCircle, Flame, Clock
} from 'lucide-react';
import { PackageData, Product } from '../types';
import { CONFIG } from '../config';
import { getOptimizedImageUrl } from '../utils/cloudinary';
import { openWhatsApp } from '../utils/navigation';

interface PackageLandingPageProps {
  pkg: PackageData;
  onBack: () => void;
  onOrder: (item: PackageData, type: 'package', qty: number) => void;
  onProductClick: (product: Product) => void;
}

export const PackageLandingPage: React.FC<PackageLandingPageProps> = ({
  pkg,
  onBack,
  onOrder,
  onProductClick
}) => {
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const unitPrice = pkg.price * (1 - (pkg.discount / 100));
  const totalPrice = unitPrice * quantity;
  const originalTotalPrice = pkg.price * quantity;

  const faqs = [
    {
      question: "Are there any side effects?",
      answer: "No. This package is 100% formulated from pure, organic herbal extracts with zero synthetic chemicals or harmful additives. It is certified safe by NAFDAC and manufactured under strict international quality standards."
    },
    {
      question: "How long before I start seeing results?",
      answer: "Most users begin to feel noticeable improvements in energy, relief, and overall vitality within 5 to 7 days of consistent use. For deep cellular healing and permanent restoration, we recommend completing the full course."
    },
    {
      question: "How is delivery handled?",
      answer: "We offer fast, discreet nationwide delivery right to your doorstep (2-3 business days). You can also choose Pay on Delivery in selected locations or order securely online."
    },
    {
      question: "How do I take this supplement package?",
      answer: "Detailed dosage instructions and timing guidelines are included in your package leaflet. Our certified health consultants are also available via WhatsApp 24/7 to guide you through your dosage."
    }
  ];

  const testimonials = [
    {
      name: "Chief Mrs. Adebayo",
      location: "Lagos, Nigeria",
      rating: 5,
      date: "2 days ago",
      comment: `I ordered the ${pkg.name} after suffering for months. Within one week of taking it, my symptoms drastically reduced. My energy is back and I feel 10 years younger! Highly recommended.`
    },
    {
      name: "Dr. Emeka Okafor",
      location: "Abuja, Nigeria",
      rating: 5,
      date: "1 week ago",
      comment: `As a medical professional, I always scrutinize herbal supplements. The synergy of the products in this package is truly exceptional. Pure quality and remarkable clinical results.`
    },
    {
      name: "Grace Nwachukwu",
      location: "Port Harcourt",
      rating: 5,
      date: "2 weeks ago",
      comment: `Fast delivery and excellent customer support on WhatsApp. This package changed my health for the better. Thank you SD GHT Health Care!`
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-32">
      {/* Top Banner / Advertorial Header */}
      <div className="bg-emerald-950 text-white py-3 px-4 text-center text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-inner">
        <Flame size={14} className="text-amber-400 animate-pulse" />
        <span>Official Verified Health Advertorial &bull; 100% Organic Herbal Solution &bull; Free Nationwide Delivery</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-8">
        {/* Navigation & Back Bar */}
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-bold transition-colors group bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Health Catalog</span>
          </button>
          
          <button 
            onClick={async () => {
              const shareUrl = window.location.href;
              try {
                await navigator.clipboard.writeText(shareUrl);
                alert("Advertorial link copied to clipboard!");
              } catch (err) {
                console.error("Error copying:", err);
              }
            }}
            className="flex items-center gap-2 bg-white hover:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider shadow-sm transition-colors"
          >
            <Share2 size={16} className="text-emerald-600" />
            <span>Share Advert Page</span>
          </button>
        </div>

        {/* Main Hero Advert Grid */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
          
          {/* Left Column: Visuals & Included Products */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-50/80 to-slate-100/50 p-6 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md animate-pulse">
                  Limited Offer
                </span>
                <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-slate-200 shadow-sm">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs font-black text-slate-900">4.9 / 5.0</span>
                </div>
              </div>

              {/* Main Package Image */}
              <div className="relative aspect-[4/3] flex items-center justify-center p-4 bg-white rounded-2xl border border-slate-200/80 shadow-inner group">
                <img 
                  src={getOptimizedImageUrl(pkg.package_image_url || pkg.products?.[0]?.image_url, 800)} 
                  alt={pkg.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 right-2 bg-emerald-700 text-white text-[9px] font-black uppercase px-2 py-1 rounded-md tracking-wider">
                  NAFDAC Verified
                </div>
              </div>
            </div>

            {/* Included Products Mini List */}
            <div className="mt-8 space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-200/60 pb-2">
                Products Included in this Kit ({pkg.products?.length || 0})
              </h4>
              <div className="space-y-2">
                {(pkg.products || []).map((product) => (
                  <div 
                    key={product.id}
                    onClick={() => onProductClick(product)}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 bg-slate-50 rounded-lg p-1 shrink-0 flex items-center justify-center border border-slate-100">
                      <img 
                        src={getOptimizedImageUrl(product.image_url, 200)} 
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h5 className="text-xs font-black text-slate-900 truncate group-hover:text-emerald-600 transition-colors">{product.name}</h5>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{product.product_code || 'GHT Certified'}</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 group-hover:text-emerald-600 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Persuasive Copy & Conversion */}
          <div className="lg:col-span-7 p-6 md:p-12 flex flex-col justify-between space-y-8 bg-white">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                  {pkg.is_combo ? 'Exclusive Combo Treatment' : 'Doctor Recommended Package'}
                </span>
                <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100 flex items-center gap-1">
                  <ShieldCheck size={12} /> 100% Organic & Safe
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {pkg.name}
              </h1>

              <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed">
                {pkg.description}
              </p>

              {/* Health Benefits Bullet Points */}
              <div className="space-y-3 pt-2">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Key Therapeutic Benefits:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(pkg.health_benefits || []).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-emerald-50/40 p-3 rounded-xl border border-emerald-100/60">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs font-bold text-slate-800 leading-tight">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Symptoms */}
              <div className="space-y-2 pt-2">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Effectively Targets:</h4>
                <div className="flex flex-wrap gap-2">
                  {(pkg.symptoms || []).map((symptom, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200/80">
                      &bull; {symptom}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing & Order Section */}
            <div className="pt-8 border-t border-slate-100 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Package Special Price</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl md:text-5xl font-black text-slate-900">₦{totalPrice.toLocaleString()}</span>
                    {pkg.discount > 0 && (
                      <>
                        <span className="text-base text-slate-400 line-through font-bold">₦{originalTotalPrice.toLocaleString()}</span>
                        <span className="bg-red-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">
                          Save {pkg.discount}%
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-bold text-slate-500 pl-2">Quantity:</span>
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-black text-slate-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => {
                    const message = `Hello SD GHT Health Care, I am interested in ordering the ${pkg.name} (${quantity} unit(s)). Please guide me on delivery and payment.`;
                    openWhatsApp(CONFIG.whatsapp.number, message);
                  }}
                  className="h-16 bg-white hover:bg-slate-50 border-2 border-emerald-600 text-emerald-700 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-md"
                >
                  <Phone size={20} className="text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </button>

                <button 
                  onClick={() => onOrder(pkg, 'package', quantity)}
                  className="h-16 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-base uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-200 active:scale-[0.98]"
                >
                  <ShoppingBag size={22} />
                  <span>Order Now (Pay on Delivery)</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 text-xs font-bold text-slate-500 pt-2">
                <span className="flex items-center gap-1.5"><Truck size={16} className="text-emerald-600" /> Free Nationwide Delivery</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-blue-600" /> 100% Satisfaction Guarantee</span>
              </div>
            </div>

          </div>
        </div>

        {/* Persuasive Advertorial Content & Trust Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 font-black">
              <Leaf size={24} />
            </div>
            <h3 className="text-lg font-black text-slate-900">100% Pure Herbal Extracts</h3>
            <p className="text-slate-600 text-xs font-medium leading-relaxed">
              Harvested from pristine botanical gardens and processed under advanced international clinical standards to ensure maximum potency.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-black text-slate-900">NAFDAC Certified Safe</h3>
            <p className="text-slate-600 text-xs font-medium leading-relaxed">
              Fully approved and certified by regulatory health authorities with rigorous quality testing and zero synthetic chemical side effects.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-4">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 font-black">
              <Award size={24} />
            </div>
            <h3 className="text-lg font-black text-slate-900">Clinically Proven Synergy</h3>
            <p className="text-slate-600 text-xs font-medium leading-relaxed">
              Combined by leading herbal doctors to work harmoniously inside your body, tackling root causes rather than just masking symptoms.
            </p>
          </div>
        </div>

        {/* Customer Success Stories & Reviews Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-amber-200">
              <Star size={14} className="fill-amber-400 text-amber-400" /> Verified Buyer Reviews
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900">Real Stories from Restored Lives</h2>
            <p className="text-slate-600 text-sm font-medium">See how thousands of satisfied customers across Nigeria overcame their health challenges with {pkg.name}.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test, index) => (
              <div key={index} className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-4 shadow-sm">
                <div className="space-y-3">
                  <div className="flex items-center gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-xs md:text-sm font-medium italic leading-relaxed">"{test.comment}"</p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200/60 pt-3">
                  <div>
                    <h5 className="text-xs font-black text-slate-900">{test.name}</h5>
                    <span className="text-[10px] text-slate-400 font-bold">{test.location}</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">Verified Buyer</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-emerald-200">
              <HelpCircle size={14} /> Got Questions?
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-600 text-sm font-medium">Everything you need to know about ordering and using {pkg.name}.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50 transition-all">
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-black text-sm md:text-base text-slate-900 hover:bg-slate-100/60 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm shrink-0">
                      {isOpen ? '-' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-slate-600 text-xs md:text-sm font-medium leading-relaxed border-t border-slate-200/50 pt-3 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] py-4 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{pkg.name}</span>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-slate-900">₦{totalPrice.toLocaleString()}</span>
              {pkg.discount > 0 && (
                <span className="text-xs text-slate-400 line-through font-bold">₦{originalTotalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={() => {
                const message = `Hello SD GHT Health Care, I am interested in ordering the ${pkg.name}. Please guide me.`;
                openWhatsApp(CONFIG.whatsapp.number, message);
              }}
              className="flex-1 sm:flex-none px-6 h-14 bg-white border-2 border-emerald-600 text-emerald-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Phone size={18} className="text-emerald-600" />
              <span>Chat with us</span>
            </button>

            <button 
              onClick={() => onOrder(pkg, 'package', quantity)}
              className="flex-1 sm:flex-none px-8 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-emerald-200 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} />
              <span>Order Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
