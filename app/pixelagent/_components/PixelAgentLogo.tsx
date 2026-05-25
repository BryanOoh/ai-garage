/** Mark geometry matches packages/demo/public/pixelagent-logo.svg in the PixelAgent repo. */
export default function PixelAgentLogo({
  size = 22,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="3" y="14" width="4" height="4" fill="currentColor" />
      <path fill="currentColor" d="M7 5h12v12L7 5z" />
    </svg>
  );
}
