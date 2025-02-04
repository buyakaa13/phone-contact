import "./style.css";

export function ScrollComponent() {
  return (
        <div className="h-full w-10 overflow-y-scroll scroll-smooth absolute right-0 top-0 text-gray-600 ">
            {Array.from({ length: 26 }, (_, i) => (
        <p key={i} className="py-2 hover-text">{String.fromCharCode(65 + i)}</p>
        ))}
        </div>
  );
}
