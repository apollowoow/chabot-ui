// src/components/ChatHeader.jsx
export default function ChatHeader({ role }) {
  // Logic to determine the title based on the state
  const getTitle = () => {
    if (role === 'type_consumer') return 'Consumer Assistant';
    if (role === 'type_business') return 'Business Assistant';
    return 'ODRS Assistant';
  };

  return (
    <div className="cb:p-3 cb:bg-white cb:flex cb:items-center cb:justify-center">
      <div className="cb:flex cb:items-center cb:gap-2">
        {/* You can put your logo small here too */}
        <div className="cb:w-8 cb:h-8 cb:rounded-full cb:overflow-hidden  cb:flex cb:items-center cb:justify-center">
  <img 
    src="/odrs-logo.png" 
    alt="ODRS" 
    className="cb:w-full cb:h-full cb:object-cover" 
  />
</div>
        <span className="cb:font-bold cb:text-gray-700 cb:text-xl cb:tracking-tight cb:uppercase">
          {getTitle()}
        </span>
      </div>
    </div>
  );
}