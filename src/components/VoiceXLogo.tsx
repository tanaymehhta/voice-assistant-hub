interface VoiceXLogoProps {
  height?: number;
  className?: string;
}

const VoiceXLogo = ({ height = 28, className = "" }: VoiceXLogoProps) => {
  const aspectRatio = 180 / 40;
  const width = height * aspectRatio;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 180 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* V */}
      <path
        d="M2 8L13.5 32H15.5L27 8H23L14.5 27.5L6 8H2Z"
        fill="currentColor"
      />
      {/* O */}
      <path
        d="M38.5 7C31.5 7 26.5 12.5 26.5 20C26.5 27.5 31.5 33 38.5 33C45.5 33 50.5 27.5 50.5 20C50.5 12.5 45.5 7 38.5 7ZM38.5 29.5C33.8 29.5 30.5 25.8 30.5 20C30.5 14.2 33.8 10.5 38.5 10.5C43.2 10.5 46.5 14.2 46.5 20C46.5 25.8 43.2 29.5 38.5 29.5Z"
        fill="currentColor"
      />
      {/* I */}
      <path
        d="M55 8H59V32H55V8Z"
        fill="currentColor"
      />
      {/* C */}
      <path
        d="M76.5 7C69.5 7 64.5 12.5 64.5 20C64.5 27.5 69.5 33 76.5 33C81 33 84.5 31 86.5 27.5L83.2 25.8C81.8 28.2 79.5 29.5 76.5 29.5C71.8 29.5 68.5 25.8 68.5 20C68.5 14.2 71.8 10.5 76.5 10.5C79.5 10.5 81.8 11.8 83.2 14.2L86.5 12.5C84.5 9 81 7 76.5 7Z"
        fill="currentColor"
      />
      {/* E */}
      <path
        d="M91 8H109V11.5H95V18H107V21.5H95V28.5H109V32H91V8Z"
        fill="currentColor"
      />
      {/* Stylized X — angular, SpaceX-inspired */}
      <path
        d="M118 8L130.5 22L118 32H123.5L133 24.5L142.5 32H148L135.5 22L148 8H142.5L133 18.5L123.5 8H118Z"
        fill="url(#voicex-x-gradient)"
      />
      {/* Accent arc — subtle voice/signal wave */}
      <path
        d="M152 14C155 10 160 8 165 8"
        stroke="url(#voicex-arc-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M155 18C157 15.5 160.5 14 164 14"
        stroke="url(#voicex-arc-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M158 22C159.5 20.5 161.5 19.5 163.5 19.5"
        stroke="url(#voicex-arc-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <defs>
        <linearGradient id="voicex-x-gradient" x1="118" y1="8" x2="148" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(215, 85%, 55%)" />
          <stop offset="1" stopColor="hsl(250, 55%, 62%)" />
        </linearGradient>
        <linearGradient id="voicex-arc-gradient" x1="152" y1="8" x2="165" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(215, 85%, 55%)" />
          <stop offset="1" stopColor="hsl(250, 55%, 62%)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default VoiceXLogo;
