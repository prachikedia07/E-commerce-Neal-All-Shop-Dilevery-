import React from 'react';

export const AnimatedIndianNeighborhood: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-15">
      <svg
        className="w-full h-full"
        viewBox="0 0 1400 450"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>
            {`
              .street-line {
                stroke: #8B7355;
                stroke-width: 3;
                fill: none;
              }
              
              .building {
                fill: none;
                stroke: #FF9933;
                stroke-width: 2.5;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-dasharray: 1500;
                stroke-dashoffset: 1500;
                animation: draw 5s ease-out forwards;
              }
              
              .building-alt {
                fill: none;
                stroke: #D17A42;
                stroke-width: 2.5;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-dasharray: 1500;
                stroke-dashoffset: 1500;
                animation: draw 5s ease-out 0.3s forwards;
              }
              
              .tree {
                fill: none;
                stroke: #138808;
                stroke-width: 2;
                stroke-dasharray: 300;
                stroke-dashoffset: 300;
                animation: draw 3s ease-out 1.5s forwards;
              }
              
              .detail {
                fill: none;
                stroke: #FF9933;
                stroke-width: 1.5;
                stroke-dasharray: 500;
                stroke-dashoffset: 500;
                animation: draw 3s ease-out 2s forwards;
              }
              
              @keyframes draw {
                to {
                  stroke-dashoffset: 0;
                }
              }
            `}
          </style>
        </defs>

        {/* Ground/Street */}
        <line className="street-line" x1="0" y1="400" x2="1400" y2="400" />

        {/* Building 1 - Shop with dome */}
        <g className="building">
          <rect x="50" y="280" width="120" height="120" rx="4" />
          <path d="M 50 280 Q 110 240 170 280" />
          <circle cx="110" cy="260" r="25" />
          <rect x="70" y="320" width="30" height="40" />
          <rect x="120" y="320" width="30" height="40" />
          <path d="M 70 365 L 70 400" />
          <path d="M 150 365 L 150 400" />
        </g>

        {/* Tree 1 */}
        <g className="tree">
          <circle cx="200" cy="360" r="25" />
          <circle cx="210" cy="350" r="20" />
          <circle cx="190" cy="350" r="20" />
          <line x1="200" y1="385" x2="200" y2="400" stroke-width="3" />
        </g>

        {/* Building 2 - Traditional arch shop */}
        <g className="building-alt">
          <rect x="250" y="260" width="140" height="140" rx="4" />
          <path d="M 270 300 Q 320 260 370 300" />
          <rect x="300" y="310" width="40" height="90" rx="20" />
          <circle cx="320" cy="280" r="8" />
        </g>

        {/* Building 3 - Balcony house */}
        <g className="building">
          <rect x="420" y="240" width="130" height="160" rx="4" />
          <path d="M 420 240 L 485 200 L 550 240" />
          <rect x="440" y="260" width="35" height="30" />
          <rect x="495" y="260" width="35" height="30" />
          <line x1="440" y1="310" x2="530" y2="310" />
          <line x1="440" y1="310" x2="440" y2="330" />
          <line x1="530" y1="310" x2="530" y2="330" />
          <rect x="460" y="350" width="50" height="50" rx="25" />
        </g>

        {/* Tree 2 */}
        <g className="tree">
          <circle cx="580" cy="360" r="28" />
          <circle cx="595" cy="350" r="22" />
          <circle cx="565" cy="350" r="22" />
          <line x1="580" y1="388" x2="580" y2="400" stroke-width="3" />
        </g>

        {/* Building 4 - Shop with awning */}
        <g className="building-alt">
          <rect x="620" y="270" width="110" height="130" rx="4" />
          <path d="M 610 270 L 740 270 L 730 285 L 620 285" />
          <rect x="640" y="300" width="30" height="35" />
          <rect x="680" y="300" width="30" height="35" />
          <rect x="650" y="350" width="40" height="50" />
        </g>

        {/* Building 5 - Tall with arched windows */}
        <g className="building">
          <rect x="760" y="220" width="100" height="180" rx="4" />
          <rect x="780" y="245" width="25" height="30" rx="12" />
          <rect x="815" y="245" width="25" height="30" rx="12" />
          <rect x="780" y="290" width="25" height="30" rx="12" />
          <rect x="815" y="290" width="25" height="30" rx="12" />
          <rect x="780" y="335" width="25" height="30" rx="12" />
          <rect x="815" y="335" width="25" height="30" rx="12" />
          <path d="M 785 380 L 785 400" />
          <path d="M 835 380 L 835 400" />
        </g>

        {/* Building 6 - Shop with dome and pillars */}
        <g className="building-alt">
          <rect x="890" y="250" width="130" height="150" rx="4" />
          <path d="M 890 250 Q 955 210 1020 250" />
          <circle cx="955" cy="235" r="20" />
          <line x1="910" y1="280" x2="910" y2="400" stroke-width="2.5" />
          <line x1="1000" y1="280" x2="1000" y2="400" stroke-width="2.5" />
          <rect x="935" y="320" width="40" height="80" rx="20" />
        </g>

        {/* Tree 3 */}
        <g className="tree">
          <circle cx="1050" cy="355" r="30" />
          <circle cx="1068" cy="345" r="24" />
          <circle cx="1032" cy="345" r="24" />
          <line x1="1050" y1="385" x2="1050" y2="400" stroke-width="3" />
        </g>

        {/* Building 7 - Modern shop */}
        <g className="building">
          <rect x="1100" y="260" width="110" height="140" rx="4" />
          <rect x="1120" y="285" width="30" height="35" />
          <rect x="1160" y="285" width="30" height="35" />
          <rect x="1120" y="335" width="30" height="35" />
          <rect x="1160" y="335" width="30" height="35" />
          <rect x="1135" y="380" width="40" height="20" />
        </g>

        {/* Building 8 - End building with balcony */}
        <g className="building-alt">
          <rect x="1240" y="240" width="120" height="160" rx="4" />
          <path d="M 1240 240 L 1300 205 L 1360 240" />
          <rect x="1260" y="265" width="35" height="30" />
          <rect x="1305" y="265" width="35" height="30" />
          <line x1="1260" y1="315" x2="1340" y2="315" />
          <path d="M 1260 315 L 1260 335 M 1280 315 L 1280 335 M 1300 315 L 1300 335 M 1320 315 L 1320 335 M 1340 315 L 1340 335" />
          <rect x="1280" y="355" width="40" height="45" />
        </g>

        {/* Decorative details - shop signs */}
        <g className="detail">
          <rect x="80" y="300" width="60" height="8" rx="2" />
          <rect x="270" y="280" width="80" height="8" rx="2" />
          <rect x="640" y="290" width="70" height="8" rx="2" />
          <rect x="910" y="270" width="90" height="8" rx="2" />
          <rect x="1120" y="275" width="70" height="8" rx="2" />
        </g>

        {/* Street elements - small bushes/plants */}
        <g className="tree">
          <circle cx="390" cy="390" r="8" />
          <circle cx="730" cy="390" r="8" />
          <circle cx="1070" cy="390" r="8" />
        </g>
      </svg>
    </div>
  );
};
