export default function ChatBubble({ type, text, choices, onSelect, isLast }) {
  const isUser = type === 'user';
  
  return (
    <div className={`cb:flex ${isUser ? 'cb:justify-end' : 'cb:justify-start'} cb:mb-6`}>
      <div className={`cb:max-w-[90%] cb:p-4 cb:rounded-2xl cb:text-sm cb:shadow-sm ${
        isUser 
          ? 'cb:bg-blue-600 cb:text-white cb:rounded-tr-none' 
          : 'cb:bg-gray-100 cb:text-gray-800 cb:rounded-tl-none cb:border cb:border-gray-200'
      }`}>
        <div className="cb:leading-relaxed">{text}</div>

        {!isUser && choices && choices.length > 0 && (
          <div className="cb:mt-4 cb:flex cb:flex-col cb:gap-2">
            {choices.map((choice) => (
              <button
                key={choice.id}
                disabled={!isLast}
                onClick={() => onSelect(choice)}
                className={`cb:w-full cb:text-left cb:px-3 cb:py-2 cb:rounded-lg cb:border cb:transition-all ${
                  isLast 
                  ? 'cb:bg-white cb:border-blue-200 cb:text-black-700 hover:cb:bg-blue-50 active:cb:scale-[0.98]' 
                  : 'cb:bg-gray-50 cb:border-gray-200 cb:text-gray-400 cb:cursor-not-allowed'
                }`}
              >
                {choice.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}