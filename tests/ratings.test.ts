import { describe, expect, it } from "vitest";
import { readdirSync } from "node:fs";
import { loadAll, validateCollection, isPublished } from "../src/lib/content";
import { locales } from "../src/lib/locales";

const all = loadAll();
const ids = ["how-ratings-work", "report-a-review"];
const contract =
  "https://github.com/vivek2310sharma/FairSwap-Backend/blob/feat/ratings-v1-backend/docs/contracts/ratings-v1.md";
// Regression anchors for material facts, not a substitute for human semantic review.
const anchors = {
  en: [
    "three counted reviews",
    "cannot be edited",
    "no phone OTP requirement or 90-day cooldown",
    "no escrow",
    "Never scan a QR code or enter a UPI PIN",
    "Never share OTPs",
    "Do not send advance fees",
    "army-officer impersonation",
    "courier scams",
    "one permanent reply",
    "does not automatically remove",
  ],
  hi: [
    "तीन गिनी गई",
    "संपादित नहीं",
    "90-दिन का विराम नहीं",
    "एस्क्रो",
    "कभी QR कोड स्कैन न करें और UPI PIN न डालें",
    "OTP कभी साझा न करें",
    "अग्रिम शुल्क न दें",
    "सेना अधिकारी",
    "कूरियर घोटालों",
    "एक स्थायी जवाब",
    "अपने आप नहीं हटता",
  ],
  bn: [
    "তিনটি গণনাযোগ্য",
    "সম্পাদনা করা যায় না",
    "90 দিনের বিরতি নেই",
    "এসক্রো",
    "QR কোড স্ক্যান করবেন না বা UPI PIN দেবেন না",
    "OTP কখনও ভাগ করবেন না",
    "অগ্রিম ফি দেবেন না",
    "সেনা কর্মকর্তা",
    "কুরিয়ার",
    "একটি স্থায়ী উত্তর",
    "নিজে থেকে সরবে না",
  ],
  mr: [
    "तीन मोजल्या गेलेल्या",
    "बदलता येत नाही",
    "90 दिवसांचा विराम नाही",
    "एस्क्रो",
    "QR कोड स्कॅन करू नका किंवा UPI PIN टाकू नका",
    "OTP कधीही सांगू नका",
    "आगाऊ शुल्क देऊ नका",
    "लष्करी अधिकारी",
    "कुरिअर",
    "एक कायमचे उत्तर",
    "आपोआप हटत नाही",
  ],
  te: [
    "లెక్కించిన మూడు",
    "మార్చలేరు",
    "90 రోజుల విరామాన్ని జోడించదు",
    "ఎస్క్రో",
    "QR కోడ్ స్కాన్ చేయవద్దు, UPI PIN నమోదు చేయవద్దు",
    "OTP ఎప్పుడూ పంచుకోవద్దు",
    "ముందస్తు రుసుము పంపవద్దు",
    "సైనిక అధికారినని",
    "కొరియర్",
    "ఒక్క శాశ్వత జవాబు",
    "స్వయంగా తొలగదు",
  ],
  ta: [
    "கணக்கில் எடுத்த மூன்று",
    "திருத்த முடியாது",
    "90 நாள் இடைவெளியையோ சேர்க்காது",
    "எஸ்க்ரோ",
    "QR குறியீட்டை ஸ்கேன் செய்யாதீர்கள்; UPI PIN உள்ளிடாதீர்கள்",
    "OTP-ஐப் பகிராதீர்கள்",
    "முன்கட்டணம் அனுப்பாதீர்கள்",
    "ராணுவ அதிகாரி",
    "கூரியர்",
    "ஒரே நிரந்தர பதில்",
    "தானாக விமர்சனத்தையோ கணக்கையோ நீக்காது",
  ],
  gu: [
    "ત્રણ ગણાયેલી",
    "સુધારી શકાતી નથી",
    "90 દિવસનો વિરામ નથી",
    "એસ્ક્રો",
    "QR કોડ સ્કૅન ન કરો કે UPI PIN ન નાખો",
    "OTP ક્યારેય ન આપો",
    "આગોતરી ફી ન મોકલો",
    "લશ્કરી અધિકારી",
    "કુરિયર",
    "એક કાયમી જવાબ",
    "આપમેળે દૂર નહીં થાય",
  ],
  kn: [
    "ಎಣಿಸಿದ ಮೂರು",
    "ತಿದ್ದಲು ಸಾಧ್ಯವಿಲ್ಲ",
    "90 ದಿನಗಳ ವಿರಾಮ ಸೇರಿಸುವುದಿಲ್ಲ",
    "ಎಸ್ಕ್ರೋ",
    "QR ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಬೇಡಿ ಅಥವಾ UPI PIN ನಮೂದಿಸಬೇಡಿ",
    "OTP ಎಂದಿಗೂ ಹಂಚಬೇಡಿ",
    "ಮುಂಗಡ ಶುಲ್ಕ ಕಳುಹಿಸಬೇಡಿ",
    "ಸೇನಾ ಅಧಿಕಾರಿ",
    "ಕೊರಿಯರ್",
    "ಒಂದೇ ಶಾಶ್ವತ ಉತ್ತರ",
    "ಖಾತೆ ತೆಗೆದುಹಾಕುವುದಿಲ್ಲ",
  ],
  or: [
    "ଗଣାଯାଇଥିବା ତିନୋଟି",
    "ସମ୍ପାଦନ ହୁଏ ନାହିଁ",
    "90 ଦିନ ବିରତି ଯୋଡ଼େ ନାହିଁ",
    "ଏସ୍କ୍ରୋ",
    "QR କୋଡ୍ ସ୍କାନ୍ କରନ୍ତୁ ନାହିଁ କିମ୍ବା UPI PIN ଦିଅନ୍ତୁ ନାହିଁ",
    "OTP କେବେ ସେୟାର୍ କରନ୍ତୁ ନାହିଁ",
    "ଆଗୁଆ ଶୁଳ୍କ ପଠାନ୍ତୁ ନାହିଁ",
    "ସେନା ଅଧିକାରୀ",
    "କୁରିଅର୍",
    "ଗୋଟିଏ ସ୍ଥାୟୀ ଉତ୍ତର",
    "ଖାତା ଆପେ ହଟେ ନାହିଁ",
  ],
  ml: [
    "എണ്ണിയ മൂന്ന്",
    "തിരുത്താനാവില്ല",
    "90 ദിവസത്തെ ഇടവേളയോ ചേർക്കുന്നില്ല",
    "എസ്ക്രോ",
    "QR കോഡ് സ്കാൻ ചെയ്യരുത്, UPI PIN നൽകരുത്",
    "OTP ഒരിക്കലും പങ്കിടരുത്",
    "മുൻകൂർ ഫീസ് അയയ്ക്കരുത്",
    "സൈനിക ഉദ്യോഗസ്ഥൻ",
    "കൊറിയർ",
    "ഒരു സ്ഥിരം മറുപടി",
    "അക്കൗണ്ടോ നീക്കില്ല",
  ],
};
const scripts = {
  hi: /\p{Script=Devanagari}/gu,
  bn: /\p{Script=Bengali}/gu,
  mr: /\p{Script=Devanagari}/gu,
  te: /\p{Script=Telugu}/gu,
  ta: /\p{Script=Tamil}/gu,
  gu: /\p{Script=Gujarati}/gu,
  kn: /\p{Script=Kannada}/gu,
  or: /\p{Script=Oriya}/gu,
  ml: /\p{Script=Malayalam}/gu,
};
const guaranteeDenials = {
  en: "FairSwap provides no escrow, guaranteed delivery, payment protection or transaction insurance.",
  hi: "FairSwap एस्क्रो, निश्चित डिलीवरी, भुगतान सुरक्षा या लेन-देन बीमा नहीं देता।",
  bn: "FairSwap এসক্রো, নিশ্চিত ডেলিভারি, পেমেন্ট সুরক্ষা বা লেনদেন বিমা দেয় না।",
  mr: "FairSwap एस्क्रो, हमीची डिलिव्हरी, पेमेंट संरक्षण किंवा व्यवहार विमा देत नाही.",
  te: "FairSwap ఎస్క్రో, హామీ డెలివరీ, చెల్లింపు రక్షణ లేదా లావాదేవీ బీమా ఇవ్వదు.",
  ta: "FairSwap எஸ்க்ரோ, உறுதியான விநியோகம், பணப் பாதுகாப்பு அல்லது பரிவர்த்தனைக் காப்பீடு வழங்காது.",
  gu: "FairSwap એસ્ક્રો, ખાતરીની ડિલિવરી, ચુકવણી સુરક્ષા કે સોદાનો વીમો આપતું નથી.",
  kn: "FairSwap ಎಸ್ಕ್ರೋ, ಖಾತರಿ ವಿತರಣೆ, ಪಾವತಿ ರಕ್ಷಣೆ ಅಥವಾ ವ್ಯವಹಾರ ವಿಮೆ ನೀಡುವುದಿಲ್ಲ.",
  or: "FairSwap ଏସ୍କ୍ରୋ, ନିଶ୍ଚିତ ଡେଲିଭରି, ଦେୟ ସୁରକ୍ଷା କିମ୍ବା କାରବାର ବୀମା ଦିଏ ନାହିଁ।",
  ml: "FairSwap എസ്ക്രോ, ഉറപ്പുള്ള ഡെലിവറി, പണമടവ് സംരക്ഷണം അല്ലെങ്കിൽ ഇടപാട് ഇൻഷുറൻസ് നൽകുന്നില്ല.",
};

describe("Ratings V1 editorial candidate", () => {
  it("has exactly the ten supported locale directories", () => {
    expect(
      readdirSync("content", { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .sort(),
    ).toEqual([...locales].sort());
  });
  for (const locale of locales) {
    it(`${locale}: has complete original-language drafts, facts, sources and safety warnings`, () => {
      const set = all.filter((a) => a.locale === locale && ids.includes(a.id));
      expect(set.map((a) => a.id).sort()).toEqual(ids);
      for (const a of set) {
        expect(a.editorialStatus).toBe("draft");
        expect(a.reviewedAt).toBeNull();
        expect(isPublished(a, all)).toBe(false);
        expect(a.sourceRefs).toContain(contract);
        expect(a.sourceRefs).toContain(
          "https://www.npci.org.in/fraud-awareness",
        );
        expect(a.body).toContain("https://cybercrime.gov.in/");
        expect(a.body).toContain("**1930**");
        expect(a.body).not.toMatch(
          /TODO|TBD|lorem ipsum|translation pending|placeholder/iu,
        );
        expect(a.body.match(/^\d+\. /gm)?.length).toBeGreaterThanOrEqual(6);
        if (locale !== "en") {
          // Every substantial paragraph must contain native script, not English filler.
          for (const paragraph of a.body
            .split(/\n\n/)
            .filter((p) => p.length > 100 && !p.startsWith("- ["))) {
            const native = paragraph.match(scripts[locale])?.length ?? 0;
            expect(native / paragraph.length, paragraph).toBeGreaterThan(0.35);
          }
          expect(a.title).not.toBe(
            all.find((e) => e.locale === "en" && e.id === a.id)?.title,
          );
        }
      }
      const how = set.find((a) => a.id === "how-ratings-work")!.body;
      const report = set.find((a) => a.id === "report-a-review")!.body;
      expect(how).toContain("14");
      expect(how).toContain("500");
      expect(how).toContain(guaranteeDenials[locale]);
      expect(report).toContain("3–500");
      for (const phrase of anchors[locale])
        expect(how + report).toContain(phrase);
      for (const url of [
        "https://fairswap.in/account/support",
        "mailto:support@fairswap.in",
        "https://fairswap.in/grievance",
      ])
        expect(report).toContain(url);
    });
  }
  it("keeps the English reference aligned to material contract distinctions", () => {
    const how = all.find(
      (a) => a.locale === "en" && a.id === "how-ratings-work",
    )!.body;
    for (const phrase of [
      "seller selects the buyer from an existing conversation",
      "buyer must explicitly confirm",
      "seller can submit while confirmation is pending",
      "three categories: Communication; Payment when reviewing a buyer or Item as described when reviewing a seller; and Meeting/pickup or Meeting/handover",
      "four faces: Poor, Fair, Good, Excellent",
      "Tags and written text are optional",
      "until both have submitted or the 14-day window ends",
      "Publication may take longer than the deadline",
      "Not rated",
      "No ratings yet",
      "do not verify payment, item authenticity or a participant’s identity",
    ])
      expect(how).toContain(phrase);
  });
  it("rejects broken internal links and published links to unapproved drafts", () => {
    expect(() =>
      validateCollection(
        all.map((a, i) =>
          i === 0
            ? { ...a, body: a.body + "\n[bad](/en/articles/missing)" }
            : a,
        ),
      ),
    ).toThrow(/Broken article link/);
    expect(() =>
      validateCollection(
        all.map((a) =>
          a.locale === "en" && a.id === "safe-meetup"
            ? { ...a, body: a.body + "\n[new](/en/articles/how-ratings-work)" }
            : a,
        ),
      ),
    ).toThrow(/links to draft/);
  });
  it("withholds the whole article until its last locale is reviewed", () => {
    const partial = all.map((a) =>
      a.id === "how-ratings-work" && a.locale !== "ml"
        ? {
            ...a,
            editorialStatus: "reviewed" as const,
            reviewedAt: "2026-10-26",
          }
        : a,
    );
    expect(
      partial
        .filter((a) => a.id === "how-ratings-work")
        .every((a) => !isPublished(a, partial)),
    ).toBe(true);
    expect(
      partial
        .filter((a) => !ids.includes(a.id))
        .every((a) => isPublished(a, partial)),
    ).toBe(true);
  });
});
