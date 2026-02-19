declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

// Hash a string using SHA-256 for advanced matching
const hashValue = async (value: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(value.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

// Generate unique event ID for deduplication
const generateEventId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

// Update advanced matching data on the pixel
export const updatePixelUserData = async (userData: {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}) => {
  if (typeof window === "undefined" || !window.fbq) return;

  const advancedMatchingData: Record<string, string> = {};

  if (userData.email) {
    advancedMatchingData.em = await hashValue(userData.email);
  }
  if (userData.phone) {
    // Remove non-digits and add country code
    const cleanPhone = userData.phone.replace(/\D/g, "");
    const fullPhone = cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`;
    advancedMatchingData.ph = await hashValue(fullPhone);
  }
  if (userData.firstName) {
    advancedMatchingData.fn = await hashValue(userData.firstName);
  }
  if (userData.lastName) {
    advancedMatchingData.ln = await hashValue(userData.lastName);
  }
  if (userData.city) {
    advancedMatchingData.ct = await hashValue(userData.city);
  }
  if (userData.state) {
    advancedMatchingData.st = await hashValue(userData.state);
  }
  if (userData.zipCode) {
    advancedMatchingData.zp = await hashValue(userData.zipCode.replace(/\D/g, ""));
  }

  advancedMatchingData.country = await hashValue("br");

  window.fbq("init", "1019093040794139", advancedMatchingData);
};

export const fbEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.fbq) {
    const eventId = generateEventId();
    window.fbq("track", eventName, {
      ...params,
      event_id: eventId,
    });
  }
};
