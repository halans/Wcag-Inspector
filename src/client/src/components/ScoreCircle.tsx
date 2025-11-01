interface ScoreCircleProps {
  score: number;
  label: string;
}

export default function ScoreCircle({ score, label }: ScoreCircleProps) {
  // Calculate the stroke dashoffset based on the score
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (score / 100) * circumference;
  
  // Determine score rating and colors
  const getScoreRating = () => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Great";
    if (score >= 70) return "Good";
    if (score >= 60) return "Fair";
    if (score >= 50) return "Poor";
    return "Critical";
  };

  // Get gradient IDs and colors based on score
  const getGradientInfo = () => {
    if (score >= 80) {
      return {
        id: "greenGradient",
        from: "hsl(142, 76%, 45%)",
        to: "hsl(160, 84%, 39%)",
        text: "hsl(142, 65%, 40%)",
        darkText: "hsl(142, 60%, 50%)",
        bgColor: "rgba(34, 197, 94, 0.02)", // more subtle green bg
        ring: "rgba(34, 197, 94, 0.1)"
      };
    }
    if (score >= 60) {
      return {
        id: "amberGradient",
        from: "hsl(43, 96%, 50%)",
        to: "hsl(36, 100%, 45%)",
        text: "hsl(43, 80%, 45%)",
        darkText: "hsl(43, 80%, 55%)",
        bgColor: "rgba(245, 158, 11, 0.02)", // more subtle amber bg
        ring: "rgba(245, 158, 11, 0.1)"
      };
    }
    return {
      id: "redGradient",
      from: "hsl(0, 84%, 60%)",
      to: "hsl(350, 90%, 50%)",
      text: "hsl(0, 70%, 55%)",
      darkText: "hsl(0, 70%, 60%)",
      bgColor: "rgba(239, 68, 68, 0.02)", // more subtle red bg
      ring: "rgba(239, 68, 68, 0.1)"
    };
  };
  
  const gradientInfo = getGradientInfo();
  const scoreRating = getScoreRating();
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Define gradients and filters - using more subtle effects */}
        <defs>
          <linearGradient id={gradientInfo.id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientInfo.from} />
            <stop offset="100%" stopColor={gradientInfo.to} />
          </linearGradient>
        </defs>
        
        {/* Score circle background - using thinner strokes */}
        <circle 
          cx="50" 
          cy="50" 
          r={radius} 
          fill="transparent" 
          stroke="hsl(0, 0%, 92%)" 
          strokeWidth="8"
          aria-hidden="true"
          className="dark:stroke-gray-800/80"
        />
        
        {/* Score circle track - using thinner strokes */}
        <circle 
          cx="50" 
          cy="50" 
          r={radius - 0.5} 
          fill="transparent" 
          stroke="hsl(0, 0%, 97%)" 
          strokeWidth="6"
          aria-hidden="true"
          className="dark:stroke-gray-700/50"
        />
        
        {/* Score circle foreground with gradient - removed filter for subtlety */}
        <circle 
          cx="50" 
          cy="50" 
          r={radius} 
          fill="transparent" 
          stroke={`url(#${gradientInfo.id})`}
          strokeWidth="8" 
          strokeDasharray={circumference} 
          strokeDashoffset={dashoffset} 
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          aria-hidden="true"
        />
        
        {/* Center circle with white background - removed filter for subtlety */}
        <circle
          cx="50"
          cy="50"
          r="32"
          fill="white"
          className="dark:fill-gray-900"
          aria-hidden="true"
        />
        
        {/* Score text - reduced font size */}
        <text 
          x="50" 
          y="44" 
          fontSize="20" 
          textAnchor="middle" 
          fill={gradientInfo.text}
          fontWeight="bold"
          aria-hidden="true"
          className="dark:fill-gray-200"
        >
          {score}%
        </text>
        
        {/* Rating text - reduced font weight */}
        <text 
          x="50" 
          y="58" 
          fontSize="10" 
          textAnchor="middle" 
          fill={gradientInfo.text}
          fontWeight="normal"
          aria-hidden="true"
          className="dark:fill-gray-300"
        >
          {scoreRating}
        </text>
        
        {/* Removed criteria text to avoid overlapping with screen reader text */}
      </svg>
      
      {/* Screen reader text */}
      <div className="sr-only">Overall accessibility score: {score} percent. Rating: {scoreRating}. Based on 9 key WCAG 2.2 criteria.</div>
    </div>
  );
}
