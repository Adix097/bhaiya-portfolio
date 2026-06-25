export default function ArrowRight({ size = 14, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      className={className}
      fill="none"
    >
      <path
        d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
