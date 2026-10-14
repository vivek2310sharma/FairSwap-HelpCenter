const paths = [
  "M20 21v-2a7 7 0 0 0-14 0v2 M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  "M5 4h14v16H5z M8 8h8 M8 12h8 M8 16h4",
  "M3 8h18 M17 4l4 4-4 4 M21 16H3 M7 12l-4 4 4 4",
  "M4 4h16v12H9l-5 4z M8 8h8 M8 12h5",
  "M12 3l8 4v6c0 5-8 8-8 8s-8-3-8-8V7z M12 8v5 M12 16h.01",
  "M8 4h8v4H8z M8 6H5v15h14V6h-3 M8 12h8 M8 16h5",
  "M4 4h7c1 0 1 2 1 2s0-2 1-2h7v16h-7c-1 0-1 1-1 1s0-1-1-1H4z M12 6v15",
];
export function Icon({ index = 4 }: { index?: number }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[index] ?? paths[4]} />
    </svg>
  );
}
