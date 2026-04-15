import { useState } from 'react';
import { User } from 'lucide-react';

export default function ChatBubble({ type, text, actions, onSelect, isLast }) {
  const isUser = type === 'user';
  const [formData, setFormData] = useState({});
  const [activeFormId, setActiveFormId] = useState(null);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const Avatar = () => (
  <div className={`cb:w-8 cb:h-8 cb:rounded-full cb:flex cb:items-center cb:justify-center cb:shrink-0 cb:overflow-hidden cb:shadow-sm ${
    isUser 
      ? 'cb:bg-gray-300' 
      : 'cb:bg-gray-300 '
  }`}>
    {isUser ? (
      // Standard Lucide Icon for the User
      <User size={18} strokeWidth={2.5} className="cb:text-gray-600" />
    ) : (
      // The ODRS Logo for the Bot
      <img 
        src="/odrs-logo.png" 
        alt="ODRS" 
        className="cb:w-full cb:h-full cb:object-cover" 
      />
    )}
  </div>
);

 


  return (
    <div className={`cb:flex cb:items-start cb:gap-2 ${isUser ? 'cb:justify-end' : 'cb:justify-start'} cb:mb-4`}>
      
      {!isUser && <Avatar />}


      <div className="cb:flex cb:flex-col cb:max-w-[85%]">
        <div className="cb:flex cb:items-start">
          
          <div className={`cb:text-sm cb:shadow-sm ${
            isUser 
              ? 'cb:bg-blue-600 cb:text-white cb:rounded-2xl cb:rounded-tr-none cb:px-4 cb:py-2.5'
              : 'cb:bg-white cb:text-gray-800 cb:rounded-2xl cb:rounded-tl-none cb:px-4 cb:py-3 cb:border cb:border-gray-100'
          }`}>
            <div className="cb:leading-relaxed">{text}</div>

            {/* ACTION BUTTONS & FORMS */}
            {!isUser && actions && actions.length > 0 && (
              <div className="cb:mt-3 cb:flex cb:flex-col cb:gap-2">
                {actions.map((choice) => (
                  <div key={choice.label}>
                    <button
                      disabled={!isLast}
                      onClick={() => {
                        if (choice.isForm) {
                          setActiveFormId(activeFormId === choice.label ? null : choice.label);
                        } else {
                          onSelect(choice);
                        }
                      }}
                      className={`cb:w-full cb:text-left cb:text-xs cb:px-3 cb:py-2 cb:rounded-xl cb:border cb:font-medium cb:transition-all ${
                        isLast 
                          ? 'cb:bg-blue-50 cb:border-blue-200 cb:text-blue-700 hover:cb:bg-blue-600 hover:cb:text-white' 
                          : 'cb:bg-gray-50 cb:border-gray-100 cb:text-gray-300'
                      }`}
                    >
                      {choice.label.replace(/^\w/, c => c.toUpperCase())}
                    </button>

                    {/* DYNAMIC FORM RENDERING */}
                    {isLast && activeFormId === choice.label && choice.isForm && (
                      <div className="cb:mt-3 cb:p-3 cb:bg-gray-50 cb:rounded-xl cb:border cb:border-blue-100 cb:animate-in cb:fade-in cb:slide-in-from-top-2">
                        <p className="cb:text-[10px] cb:text-gray-500 cb:mb-3 cb:italic">
                          {choice.form.description}
                        </p>
                        
                        {choice.form.fields.map((field) => (
                          <div key={field.name} className="cb:mb-3">
                            <label className="cb:text-[10px] cb:font-bold cb:text-gray-400 cb:uppercase">
                              {field.label}
                            </label>
                            <input 
                              type={field.type}
                              disabled={field.disabled}
                              defaultValue={field.value}
                              placeholder={`Enter ${field.label.toLowerCase()}...`}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              className="cb:w-full cb:p-2 cb:text-xs cb:border cb:rounded-lg cb:mt-1 cb:bg-white focus:cb:ring-1 focus:cb:ring-blue-500 cb:outline-none"
                            />
                          </div>
                        ))}

                        <button 
                          onClick={() => onSelect(choice, formData)}
                          className="cb:w-full cb:bg-blue-600 cb:text-white cb:py-2 cb:rounded-lg cb:text-[10px] cb:font-bold cb:uppercase cb:tracking-wider hover:cb:bg-blue-700"
                        >
                          {choice.isTicket ? 'Generate Ticket' : 'Submit Information'}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

  
      {isUser && <Avatar />}
    </div>
  );
}