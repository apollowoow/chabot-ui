export default function ChatBubble({ type, text, choices, onSelect, isLast }) {
  const isUser = type === 'user';
  
  return (
    <div className={`cb:flex cb:items-start cb:gap-2 ${isUser ? 'cb:justify-end' : 'cb:justify-start'} cb:mb-4`}>
      
      {/* Bot avatar */}
      {!isUser && (
        <div className="cb:w-7 cb:h-7 cb:rounded-full cb:bg-blue-600 cb:flex cb:items-center cb:justify-center cb:shrink-0 cb:mt-0">
          <span className="cb:text-white cb:text-[10px] cb:font-bold">AI</span>
        </div>
      )}

      {/* Bubble + tail wrapper */}
      <div className="cb:flex cb:flex-col cb:max-w-[85%]">
        <div className="cb:flex cb:items-start">
          
          {/* Left tail for bot */}
          {!isUser && (
            <div 
              style={{
                width: 0,
                height: 0,
                borderTop: '8px solid transparent',
                borderRight: '8px solid #ffffff',
                borderBottom: '8px solid transparent',
                marginTop: '8px',
                flexShrink: 0,
              }} 
            />
          )}

          <div className={`cb:text-sm ${
            isUser 
              ? 'cb:bg-blue-600 cb:text-white cb:rounded-2xl cb:rounded-tr-none cb:px-4 cb:py-2.5 cb:shadow-sm'
              : 'cb:bg-white cb:text-gray-800 cb:rounded-2xl cb:rounded-tl-none cb:px-4 cb:py-3 cb:shadow-sm cb:border cb:border-gray-100'
          }`}>
            <div className="cb:leading-relaxed">{text}</div>

            {!isUser && choices && choices.length > 0 && (
              <div className="cb:mt-3 cb:flex cb:flex-col cb:gap-1.5">
                {choices.map((choice) => (
                  <button
                    key={choice.id}
                    disabled={!isLast}
                    onClick={() => onSelect(choice)}
                    className={`cb:w-full cb:text-left cb:text-xs cb:px-3 cb:py-2 cb:rounded-xl cb:border cb:font-medium cb:transition-all cb:duration-150 ${
                      isLast 
                        ? 'cb:bg-blue-50 cb:border-blue-200 cb:text-blue-700 hover:cb:bg-blue-600 hover:cb:text-white hover:cb:border-blue-600 active:cb:scale-[0.98]' 
                        : 'cb:bg-gray-50 cb:border-gray-100 cb:text-gray-300 cb:cursor-not-allowed'
                    }`}
                  >
                    {choice.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right tail for user */}
          {isUser && (
            <div 
              style={{
                width: 0,
                height: 0,
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                marginTop: '8px',
                flexShrink: 0,
              }} 
            />
          )}
        </div>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="cb:w-7 cb:h-7 cb:rounded-full cb:bg-gray-300 cb:flex cb:items-center cb:justify-center cb:shrink-0 cb:mt-0">
          <span className="cb:text-gray-600 cb:text-[10px] cb:font-bold">ME</span>
        </div>
      )}
    </div>
  );
}