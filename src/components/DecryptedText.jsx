export default function DecryptedText({
  text,
  className = '',
  parentClassName = '',
  speed,
  maxIterations,
  sequential,
  revealDirection,
  useOriginalCharsOnly,
  characters,
  encryptedClassName,
  animateOn,
  ...props
}) {
  return (
    <span 
      className={parentClassName} 
      style={{ display: 'inline-block', whiteSpace: 'pre-wrap' }} 
      {...props}
    >
      <span className={className}>
        {text}
      </span>
    </span>
  );
}
