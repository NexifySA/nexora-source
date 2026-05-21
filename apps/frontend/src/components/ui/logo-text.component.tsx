import React from 'react';

// Nexpost by Nexify — wordmark.
// Reemplaza el wordmark "postiz" del upstream. Usa currentColor para respetar tema.
export const LogoTextComponent = () => {
  return (
    <svg
      width="140"
      height="33"
      viewBox="0 0 140 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Nexpost by Nexify"
    >
      <text
        x="0"
        y="20"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="22"
        fill="currentColor"
        letterSpacing="-0.5"
      >
        Nexpost
      </text>
      <text
        x="0"
        y="31"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="500"
        fontSize="9"
        fill="currentColor"
        opacity="0.55"
        letterSpacing="1.4"
      >
        BY NEXIFY
      </text>
    </svg>
  );
};
