export default function TypingIndicator() {
  return (
    <div className="cb:flex cb:items-start cb:gap-2 cb:mb-4">
      <div className="cb:w-7 cb:h-7 cb:rounded-full cb:bg-blue-600 cb:flex cb:items-center cb:justify-center cb:shrink-0">
        <span className="cb:text-white cb:text-[10px] cb:font-bold">AI</span>
      </div>

      <div className="cb:flex cb:items-start">
        {/* Left tail */}
        <div style={{
          width: 0,
          height: 0,
          borderTop: '8px solid transparent',
          borderRight: '8px solid #ffffff',
          borderBottom: '8px solid transparent',
          marginTop: '8px',
          flexShrink: 0,
        }} />

        <div className="cb:flex cb:items-center cb:gap-1.5 cb:px-4 cb:py-3 cb:bg-white cb:border cb:border-gray-100 cb:rounded-2xl cb:rounded-tl-none cb:shadow-sm">
          <div className="cb:w-2 cb:h-2 cb:bg-blue-400 cb:rounded-full cb:animate-bounce [animation-delay:0ms]" />
          <div className="cb:w-2 cb:h-2 cb:bg-blue-400 cb:rounded-full cb:animate-bounce [animation-delay:150ms]" />
          <div className="cb:w-2 cb:h-2 cb:bg-blue-400 cb:rounded-full cb:animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}