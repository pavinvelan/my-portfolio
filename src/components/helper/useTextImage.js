import { useMemo } from 'react';

/**
 * Renders text onto an offscreen canvas and returns a data URL.
 * Used to feed text as an image source into WebGL shader components like MetallicPaint.
 */
export default function useTextImage(text, {
  fontSize = 120,
  fontFamily = 'Inter, system-ui, sans-serif',
  fontWeight = '900',
  color = '#000000',
  padding = 10,
  maxWidth = 1200,
} = {}) {
  return useMemo(() => {
    if (!text) return null;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    const metrics = ctx.measureText(text);
    const textWidth = Math.min(metrics.width, maxWidth);

    canvas.width = textWidth + padding * 2;
    canvas.height = fontSize * 1.25 + padding * 2;

    // Re-set font after canvas resize (resets context)
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL('image/png');
  }, [text, fontSize, fontFamily, fontWeight, color, padding, maxWidth]);
}
