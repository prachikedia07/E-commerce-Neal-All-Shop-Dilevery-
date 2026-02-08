import React from 'react';

export const EmptyCartIllustration: React.FC = () => {
  return (
    <svg viewBox="0 0 300 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect x="0" y="180" width="300" height="60" fill="#8B8B8B" opacity="0.3" />
      
      {/* Road */}
      <rect x="0" y="200" width="300" height="40" fill="#5A5A5A" opacity="0.2" />
      <line x1="0" y1="220" x2="300" y2="220" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="10 10" opacity="0.3" />
      
      {/* Closed shop shutter */}
      <g>
        {/* Shop structure */}
        <rect x="100" y="100" width="100" height="100" fill="#D4A373" opacity="0.3" />
        
        {/* Shutter */}
        <rect x="110" y="130" width="80" height="70" fill="#FF9933" opacity="0.8" rx="2" />
        
        {/* Shutter lines */}
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="110"
            y1={135 + i * 8}
            x2="190"
            y2={135 + i * 8}
            stroke="#D17A42"
            strokeWidth="1.5"
          />
        ))}
        
        {/* Lock */}
        <rect x="145" y="180" width="10" height="12" fill="#8B4513" rx="1" />
        <circle cx="150" cy="177" r="4" fill="#8B4513" />
      </g>
      
      {/* Small street lamp */}
      <g opacity="0.4">
        <line x1="240" y1="200" x2="240" y2="150" stroke="#8B8B8B" strokeWidth="2" />
        <circle cx="240" cy="145" r="6" fill="#FFD700" opacity="0.5" />
      </g>
      
      {/* Small plant/bush */}
      <g opacity="0.3">
        <circle cx="60" cy="195" r="8" fill="#138808" />
        <circle cx="55" cy="190" r="6" fill="#138808" />
        <circle cx="65" cy="190" r="6" fill="#138808" />
      </g>
    </svg>
  );
};

export const NoOrdersIllustration: React.FC = () => {
  return (
    <svg viewBox="0 0 300 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Sky elements */}
      <circle cx="250" cy="40" r="20" fill="#FFD700" opacity="0.3" />
      
      {/* Road curve */}
      <path
        d="M 0 200 Q 150 180 300 200"
        fill="#5A5A5A"
        opacity="0.2"
      />
      
      {/* Center line */}
      <path
        d="M 20 200 Q 150 185 280 200"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeDasharray="10 10"
        fill="none"
        opacity="0.3"
      />
      
      {/* Street sign */}
      <g opacity="0.4">
        <line x1="220" y1="200" x2="220" y2="140" stroke="#8B8B8B" strokeWidth="2.5" />
        <circle cx="220" cy="130" r="15" fill="none" stroke="#FF9933" strokeWidth="2" />
        <circle cx="220" cy="130" r="8" fill="#FF9933" opacity="0.5" />
      </g>
      
      {/* Small delivery box on road */}
      <g opacity="0.3">
        <rect x="130" y="185" width="25" height="20" fill="#FF9933" rx="2" />
        <line x1="130" y1="195" x2="155" y2="195" stroke="#D17A42" strokeWidth="1.5" />
        <line x1="142.5" y1="185" x2="142.5" y2="205" stroke="#D17A42" strokeWidth="1.5" />
      </g>
      
      {/* Small trees/bushes on sides */}
      <g opacity="0.3">
        <circle cx="40" cy="190" r="12" fill="#138808" />
        <circle cx="35" cy="185" r="8" fill="#138808" />
        <circle cx="45" cy="185" r="8" fill="#138808" />
      </g>
      
      <g opacity="0.3">
        <circle cx="260" cy="195" r="10" fill="#138808" />
        <circle cx="255" cy="190" r="7" fill="#138808" />
        <circle cx="265" cy="190" r="7" fill="#138808" />
      </g>
    </svg>
  );
};

export const NoVendorsIllustration: React.FC = () => {
  return (
    <svg viewBox="0 0 300 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Ground */}
      <rect x="0" y="200" width="300" height="40" fill="#8B8B8B" opacity="0.2" />
      
      {/* Market lane structure */}
      <line x1="70" y1="80" x2="70" y2="200" stroke="#8B8B8B" strokeWidth="2" opacity="0.3" />
      <line x1="230" y1="80" x2="230" y2="200" stroke="#8B8B8B" strokeWidth="2" opacity="0.3" />
      <line x1="70" y1="80" x2="230" y2="80" stroke="#8B8B8B" strokeWidth="2" opacity="0.3" />
      
      {/* Empty stalls/shops */}
      <g opacity="0.4">
        {/* Stall 1 */}
        <rect x="80" y="120" width="50" height="60" fill="#FF9933" opacity="0.3" rx="2" />
        <rect x="85" y="130" width="18" height="18" fill="none" stroke="#FF9933" strokeWidth="1.5" />
        <rect x="107" y="130" width="18" height="18" fill="none" stroke="#FF9933" strokeWidth="1.5" />
        <line x1="80" y1="160" x2="130" y2="160" stroke="#D17A42" strokeWidth="1" />
        
        {/* Stall 2 */}
        <rect x="170" y="120" width="50" height="60" fill="#FF9933" opacity="0.3" rx="2" />
        <rect x="175" y="130" width="18" height="18" fill="none" stroke="#FF9933" strokeWidth="1.5" />
        <rect x="197" y="130" width="18" height="18" fill="none" stroke="#FF9933" strokeWidth="1.5" />
        <line x1="170" y1="160" x2="220" y2="160" stroke="#D17A42" strokeWidth="1" />
      </g>
      
      {/* Empty hanging signs */}
      <g opacity="0.3">
        <line x1="105" y1="80" x2="105" y2="95" stroke="#8B8B8B" strokeWidth="1" />
        <rect x="95" y="95" width="20" height="15" fill="#FF9933" rx="1" />
        
        <line x1="195" y1="80" x2="195" y2="95" stroke="#8B8B8B" strokeWidth="1" />
        <rect x="185" y="95" width="20" height="15" fill="#FF9933" rx="1" />
      </g>
      
      {/* Small crates on ground */}
      <g opacity="0.25">
        <rect x="140" y="185" width="15" height="15" fill="#D4A373" />
        <line x1="140" y1="192.5" x2="155" y2="192.5" stroke="#8B4513" strokeWidth="0.5" />
        <line x1="147.5" y1="185" x2="147.5" y2="200" stroke="#8B4513" strokeWidth="0.5" />
      </g>
    </svg>
  );
};
