export default function Button({
  children,
  size = "md",
  onClick,
  className = "",
}) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    none: "",
  };

  return (
    <button
      onClick={onClick}
      className={`
        bg-[var(--p3)] 
        text-black 
        rounded-full 
        font-medium 
        hover:bg-[var(--p1)]
        transition-colors
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
