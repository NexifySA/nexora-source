'use client';

// Nexpost by Nexify — logomark
// Reemplaza el SVG inline de Postiz upstream. Mismo viewBox/tamaño para no romper layouts.
export const Logo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      className="mt-[8px] min-w-[60px] min-h-[60px]"
      aria-label="Nexpost"
    >
      <defs>
        <linearGradient
          id="nexpost-logo-grad"
          x1="0"
          y1="0"
          x2="60"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#2563EB" />
          <stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="52" height="52" rx="13" fill="#0F172A" />
      <path
        d="M17 44 V18 L34 39 V18 H44 V44 H34 L17 23 V44 Z"
        fill="url(#nexpost-logo-grad)"
      />
    </svg>
  );
};
