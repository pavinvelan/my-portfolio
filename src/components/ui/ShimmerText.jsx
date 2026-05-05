"use client";
import React from "react";

export const ShimmerText = ({
    text = "LUMINOUS",
    shimmerColor = "#ffffff",
    className = "",
}) => {
    const id = `shimmer-${shimmerColor.replace("#", "").replace(",", "")}`;

    return (
        <span className={`${className} relative inline-block`}>
            <style>{`
                @keyframes ${id}-sweep {
                    0%   { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes ${id}-glow {
                    0%, 100% { 
                        filter: drop-shadow(0 0 4px rgba(255,255,255,0.2)) 
                                drop-shadow(0 0 8px rgba(0,240,255,0.1)); 
                    }
                    50% { 
                        filter: drop-shadow(0 0 12px rgba(255,255,255,0.5)) 
                                drop-shadow(0 0 20px rgba(0,240,255,0.3)); 
                    }
                }
                .${id} {
                    background: linear-gradient(
                        105deg,
                        rgba(255,255,255,0.1) 0%,
                        rgba(255,255,255,0.3) 30%,
                        ${shimmerColor} 48%,
                        ${shimmerColor} 52%,
                        rgba(255,255,255,0.3) 70%,
                        rgba(255,255,255,0.1) 100%
                    );
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: 
                        ${id}-sweep 3s linear infinite,
                        ${id}-glow 2s ease-in-out infinite;
                }
            `}</style>
            <span className={`${id} inline-block`}>
                {text}
            </span>
        </span>
    );
};

