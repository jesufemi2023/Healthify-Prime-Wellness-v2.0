/**
 * Utility functions for robust navigation and opening external links,
 * specifically tailored to bypass aggressive pop-up blockers in iOS Safari,
 * and handle iframe-related security constraints.
 */

export function openWhatsApp(phone: string, text: string) {
  // Format the phone number to strip any non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Construct the official WhatsApp URL
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  
  // Detect iOS and Android devices
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent) || 
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPad OS 13+
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isMobile = isIOS || isAndroid;

  if (isMobile) {
    // On mobile devices, WhatsApp links (wa.me) will automatically trigger
    // the native WhatsApp application. Assigning window.location.href is 
    // 100% immune to Safari's pop-up blocker because it counts as page navigation,
    // and since it is a deep-link, it doesn't actually unload the current page.
    window.location.href = url;
  } else {
    // On desktop, we want to open in a new tab so they don't lose their place.
    // Creating a dynamic anchor tag and clicking it is the most reliable way 
    // to bypass desktop pop-up blockers inside button click event handlers.
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}
