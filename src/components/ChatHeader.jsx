// src/components/ChatHeader.jsx
export default function ChatHeader({ role }) {
  // Logic to determine the title based on the state
  const getTitle = () => {
    if (role === 'type_consumer') return 'Consumer Complaint Assistant';
    if (role === 'type_business') return 'Business Complaint Assistant';
    return 'Complaint Assistant';
  };

  return (
    <div className="cb:p-5 cb:bg-white  cb:border-gray-100 cb:flex cb:items-center cb:justify-center ">
      <div className="cb:flex cb:items-center cb:gap-2">
        {/* Minimalist status dot */}
        <span className="cb:font-semibold cb:text-gray-600 cb:text-sm cb:tracking-tight">
          {getTitle()}
        </span>
      </div>
      
      {/* Subtle Reset instead of a big red button */}
    
    </div>
  );
}