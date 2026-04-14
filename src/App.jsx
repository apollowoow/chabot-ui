import { useState, useEffect, useRef } from 'react';
import { User, Briefcase, ChevronRight } from 'lucide-react';
import ChatHeader from './components/ChatHeader';
import ChatBubble from './components/ChatBubble';
import TypingIndicator from './components/TypingIndicator';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [history, setHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Transition to Chat after selecting a role
  const selectRoleAndStart = (role, label) => {
    setUserRole(role);
    setIsChatStarted(true);
    setIsTyping(true);

    // Initial bot response logic
    setTimeout(() => {
      let response = (role === 'type_consumer') 
        ? { text: "Hello! I'm your Consumer Assistant. What is the nature of your complaint?", choices: [{ id: 'c_defective', label: 'Defective Product' }, { id: 'c_service', label: 'Poor Service' }] }
        : { text: "Business Portal active. Are you reporting a B2B conflict or a Fraud claim?", choices: [{ id: 'b_b2b', label: 'B2B Conflict' }, { id: 'b_fraud', label: 'Fraud Claim' }] };

      setHistory([{ type: 'bot', text: response.text, choices: response.choices }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSelect = (choice) => {
    // Add User's bubble
    setHistory(prev => [...prev, { type: 'user', text: choice.label }]);
    setIsTyping(true);

    setTimeout(() => {
      let nextResponse;

      // Logic branching based on choice.id
      if (choice.id === 'c_defective' || choice.id === 'c_service') {
        nextResponse = {
          text: `I understand. To proceed with your ${choice.label} claim, I'll need your transaction details.`,
          choices: [{ id: 'form_details', label: 'Fill out details' }]
        };
      } else if (choice.id === 'b_b2b' || choice.id === 'b_fraud') {
        nextResponse = {
          text: "Understood. Please provide the Business Registration Number of the entity in question.",
          choices: [{ id: 'form_b_details', label: 'Provide BRN' }]
        };
      } else {
        nextResponse = { text: "Thank you. Our agents will review this shortly.", choices: [] };
      }

      setHistory(prev => [...prev, { 
        type: 'bot', 
        text: nextResponse.text, 
        choices: nextResponse.choices 
      }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="cb:group cb:relative cb:w-full cb:h-full cb:flex cb:flex-col cb:overflow-hidden ">
   
      {!isChatStarted ? (
        /* --- THE TWO BOX LANDING VIEW --- */
        <div className="cb:flex-1 cb:flex cb:flex-col cb:items-center cb:justify-center cb:p-6">
          <div className="cb:text-center cb:mb-8">
            <h1 className="cb:text-xl cb:font-bold cb:text-gray-800">Welcome to ODRS</h1>
            <p className="cb:text-sm cb:text-gray-500">Efficient online resolution for every consumer concern.</p>
            <p className="cb:text-sm cb:text-gray-500"> Please choose what type of complaint you are.</p>
          </div>

          <div className="cb:grid cb:grid-cols-2 cb:gap-4 cb:w-full cb:max-w-md">
            <button 
                onClick={() => selectRoleAndStart('type_consumer', 'Consumer')}
                onMouseEnter={() => setHoveredCard('consumer')}
                onMouseLeave={() => setHoveredCard(null)}
                className="cb:flex cb:flex-col cb:items-center cb:p-6 cb:bg-white cb:border cb:border-gray-200 cb:rounded-2xl cb:shadow-sm hover:cb:border-blue-500 hover:cb:shadow-md cb:transition-all active:cb:scale-95"
              >
                <div className={`cb:w-12 cb:h-12 cb:rounded-full cb:flex cb:items-center cb:justify-center cb:mb-3 cb:transition-colors ${hoveredCard === 'consumer' ? 'cb:bg-blue-600' : 'cb:bg-blue-50'}`}>
                  <User size={32} 
                  strokeWidth={1.5}
                  className={`cb:transition-colors ${hoveredCard === 'consumer' ? 'cb:text-white' : 'cb:text-blue-600'}`} />
                </div>
                <span className="cb:font-bold cb:text-gray-700">Consumer</span>
                <span className="cb:text-[10px] cb:text-gray-400 cb:text-center cb:mt-1">Submit complaints or inquiries, or track case.</span>
            </button>


            <button 
                onClick={() => selectRoleAndStart('type_business', 'Business')}
                onMouseEnter={() => setHoveredCard('business')}
                onMouseLeave={() => setHoveredCard(null)}
                className="cb:flex cb:flex-col cb:items-center cb:p-6 cb:bg-white cb:border cb:border-gray-200 cb:rounded-2xl cb:shadow-sm hover:cb:border-blue-500 hover:cb:shadow-md cb:transition-all active:cb:scale-95"
              >
                <div className={`cb:w-12 cb:h-12 cb:rounded-full cb:flex cb:items-center cb:justify-center cb:mb-3 cb:transition-colors ${hoveredCard === 'business' ? 'cb:bg-blue-600' : 'cb:bg-blue-50'}`}>
                  <Briefcase 
                    size={24} 
                    strokeWidth={1.5}
                    className={`cb:transition-colors ${hoveredCard === 'business' ? 'cb:text-white' : 'cb:text-blue-600'}`}
                  />
                </div>
                <span className="cb:font-bold cb:text-gray-700">Business</span>
                <span className="cb:text-[10px] cb:text-gray-400 cb:text-center cb:mt-1">File a Business-to-Business Complaint</span>
            </button>
          </div>
        </div>
      ) : (

        
        /* --- THE STANDARD CHAT VIEW --- */
        <div className="cb:flex-1 cb:overflow-y-auto cb:p-4">
          <div className="cb:text-center">
            <h1 className="cb:text-xl cb:font-bold cb:text-gray-800">Welcome to ODRS</h1>
            <p className="cb:text-sm cb:text-gray-500">Efficient online resolution for every consumer concern.</p>
            <p className="cb:text-sm cb:text-gray-500"> Please choose what type of complaint you are.</p>
          </div>
          <ChatHeader role={userRole} />
            {history.map((item, i) => (
              <ChatBubble 
                key={i} 
                type={item.type} 
                text={item.text} 
                choices={item.choices}
                onSelect={handleSelect}
                isLast={i === history.length - 1 && !isTyping}
              />
            ))}
            {isTyping && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}

export default App;