# 03 — Visual design, UX and public copy contract

## Visual direction

Trustworthy, modern, uncluttered and unmistakably FairSwap. Inspiration from DBA is the searchable support-category layout and grouped corporate/footer links, NOT its brand, illustration style or copy. Audit FairSwap-Web's actual design tokens/logo before implementing. Use a small documented local token map so the Help Centre can deploy independently and stay visually compatible with web and mobile.

Mobile-first; usable on 320px minimum, tested at 360px and 390px. Clear 44px minimum touch targets, focus-visible styles, accessible color contrast, reduced motion, no heavy carousels/hero video. Use system fonts or a budgeted local font subset that correctly renders Hindi. Prefer semantic cards and compact, fast icons.

## Page anatomy

- Header: FairSwap logo, 'Help Centre' label, link back to marketplace, explicit English/हिन्दी toggle. Avoid signing users into a separate portal.
- Home hero: plain 'How can we help you?' and fast search, no marketing claims.
- Safety shortcut: high-visibility 'Avoid UPI and advance-payment scams' leading to reviewed safety guidance, not a panic-red banner on all pages.
- Topic cards: icon, short topic title, one-sentence description and sensible tap target.
- Article: breadcrumbs -> title -> 'Last reviewed' -> body -> related articles -> 'Need more help?' links. Clear numbered steps, screenshots only if current and internally approved. Mobile callout for fraud.
- Search: keyboard-focusable input, matching title/snippet, empty-state suggestions, no persistent personal query history.
- Contact: distinguish ordinary support ticket, report listing/user/message and statutory grievance. Do not hide grievance path behind chat.
- Footer grouped: **For Businesses** (FairSwap Boost; Banner Advertising); **FairSwap** (Marketplace; Careers); **Support** (Help; Safety; Contact; Grievance); **Legal** (Terms; Privacy; Acceptable Use).

## Coming soon wording — English

Page badge: 'Under development'
Heading: 'FairSwap Boost' / 'Banner Advertising' / 'Careers'
Subheading: 'Coming soon'
Description Boost: 'We are exploring tools for professional sellers to manage and improve the visibility of listings. FairSwap Boost is not available yet.'
Description Banners: 'We are planning advertising options for businesses on FairSwap. Banner advertising is not available yet.'
Description Careers: 'We are building our careers page. We are not accepting job applications through this website.'
Common note: 'No orders, payments, bookings or applications are being accepted here at present.'
CTA: 'Return to Help Centre' / 'Visit FairSwap' only; no action promising signup or sale.

## Coming soon wording — Hindi (editorial review required)

Badge: 'निर्माणाधीन'
Subheading: 'जल्द आ रहा है'
Boost: 'हम व्यावसायिक विक्रेताओं के लिए लिस्टिंग प्रबंधन और दृश्यता बढ़ाने वाले टूल पर काम करने की योजना बना रहे हैं। FairSwap Boost अभी उपलब्ध नहीं है।'
Banners: 'हम FairSwap पर व्यवसायों के लिए विज्ञापन विकल्पों की योजना बना रहे हैं। बैनर विज्ञापन अभी उपलब्ध नहीं हैं।'
Careers: 'हम अपना करियर पेज तैयार कर रहे हैं। इस वेबसाइट के माध्यम से अभी नौकरी के आवेदन स्वीकार नहीं किए जा रहे हैं।'
Common: 'फिलहाल यहां ऑर्डर, भुगतान, बुकिंग या नौकरी के आवेदन स्वीकार नहीं किए जा रहे हैं।'
CTA: 'सहायता केंद्र पर वापस जाएं' / 'FairSwap पर जाएं'.

These translations are draft copy for language review, not legally approved statements.

## Tone

- Short, calm instructions, Indian English vocabulary, plain Hindi.
- Never suggest paying to receive UPI money, disclosing an OTP, scanning someone else's payment QR to receive funds, sending advance courier fees or trusting a claim of being an army officer as proof of identity.
- In safety incidents, offer concrete action and the official cybercrime reporting channel if relevant. Do not promise recovery, guarantees, police action or guaranteed customer response times.
- No public publication of personal contact details except those already approved on FairSwap's official contact/grievance pages.

## Accessibility checklist

Keyboard-operated locale switch/search/menu, labeled form controls, correct lang attribute (hi for Hindi), visible focus ring, headings in order, skip navigation, aria-current for nav, screen-reader-friendly breadcrumb, touch targets, screen-reader tested with NVDA/VoiceOver/TalkBack when available. All graphics with informative alt or decoration hidden.
