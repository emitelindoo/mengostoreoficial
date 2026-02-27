const WhatsAppButton = () => {
  const phoneNumber = "5511967131733";
  const message = encodeURIComponent("Olá! Gostaria de comprar pelo suporte. Pode me ajudar?");

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1ebe57] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
      aria-label="Falar no WhatsApp"
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.502 1.14 6.746 3.072 9.382L1.062 31.19l5.996-1.97A15.916 15.916 0 0016.004 32C24.826 32 32 24.824 32 16.004 32 7.176 24.826 0 16.004 0zm9.31 22.608c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.95.324-5.67-1.218-4.762-1.972-7.826-6.81-8.064-7.124-.228-.314-1.924-2.562-1.924-4.888 0-2.326 1.218-3.468 1.65-3.942.39-.428 1.026-.624 1.632-.624.198 0 .372.01.534.018.468.02.702.048 1.014.786.39.924 1.338 3.264 1.452 3.504.12.24.24.552.078.87-.15.324-.282.522-.522.804-.24.282-.498.63-.708.846-.24.246-.492.51-.21.996.282.486 1.254 2.07 2.694 3.354 1.848 1.65 3.408 2.16 3.894 2.4.486.24.768.204 1.05-.12.288-.33 1.236-1.434 1.566-1.926.324-.492.654-.408 1.098-.246.45.168 2.832 1.338 3.318 1.578.486.246.81.366.93.57.114.204.114 1.188-.276 2.286z"/>
      </svg>
    </a>
  );
};

export default WhatsAppButton;
