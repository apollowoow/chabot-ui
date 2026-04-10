export default function TypingIndicator() {
  return (
    <div className="cb:flex cb:items-center cb:gap-1 cb:p-3 cb:bg-gray-100 cb:rounded-2xl cb:rounded-tl-none cb:w-fit cb:mb-4">
      <div className="cb:w-1.5 cb:h-1.5 cb:bg-gray-400 cb:rounded-full cb:animate-bounce" />
      <div className="cb:w-1.5 cb:h-1.5 cb:bg-gray-400 cb:rounded-full cb:animate-bounce [animation-delay:-0.3s]" />
      <div className="cb:w-1.5 cb:h-1.5 cb:bg-gray-400 cb:rounded-full cb:animate-bounce [animation-delay:-0.15s]" />
    </div>
  );
}