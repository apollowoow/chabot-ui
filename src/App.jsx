import { useState, useEffect, useRef } from 'react';
import ChatHeader from './components/ChatHeader';
import ChatBubble from './components/ChatBubble';
import TypingIndicator from './components/TypingIndicator';
import { User, Briefcase } from 'lucide-react';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [history, setHistory] = useState([

  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const bottomRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [history, isTyping]);

const fetchChatStep = async (sequenceId) => {

  try {
    const response = await fetch(
      `/api/chat/get-step?group_id=1&sequence_id=${sequenceId}`
    );
    console.log(response );
    if (!response.ok) throw new Error('Failed to load sequence');
    return await response.json();
  } catch (error) {
    console.error("ODRS API Error:", error);
    return null;
  }
};

  // Transition to Chat after selecting a role
  const selectRoleAndStart = async (role) => {
    setUserRole(role);
    setIsChatStarted(true);
    setIsTyping(true);

    // Your specific starting IDs
    const startId = (role === 'type_consumer') ? 2 : 43;
    console.log("START ID:", startId); // add this
    const data = await fetchChatStep(startId);
      console.log("START DATA:", data); // add this

    if (data) {
      setHistory([{ 
        type: 'bot', 
        text: data.query, 
        actions: data.actions 
      }]);
    }
    setIsTyping(false);
  };

const handleSelect = async (action, formValues = null) => {
  console.log("ACTION RECEIVED:", action); // 👈 add this
  console.log("nextSequence value:", action.nextSequence);
  console.log("nextSequence type:", typeof action.nextSequence);
  // 1. Show user choice
  setHistory(prev => [...prev, { type: 'user', text: action.label }]);
  setIsTyping(true);

  if (action.isSubmit && formValues) {
    console.log("Submitting Ticket Data:", formValues);
  }

  if (action.nextSequence !== 0) {
     console.log(action.nextSequence);
    const data = await fetchChatStep(action.nextSequence);
    if (data) {
      setHistory(prev => [...prev, { 
        type: 'bot', 
        text: data.query, 
        actions: data.actions 
      }]);
    }
  } else if (!action.isSubmit) {
    setHistory(prev => [...prev, { type: 'bot', text: "Thank you. Our team will get back to you.", actions: [] }]);
  }
  setIsTyping(false);
};

  return (
    <div className="cb:group cb:relative cb:w-full cb:h-full cb:flex cb:flex-col cb:overflow-hidden ">
   
      {!isChatStarted ? (
        /* --- THE TWO BOX LANDING VIEW --- */
        <div className="cb:flex-1 cb:flex cb:flex-col cb:items-center cb:justify-center cb:p-4">
          <div className="cb:text-center cb:mb-5">
            <h1 className="cb:text-xl cb:font-bold cb:text-gray-800">Welcome to ODRS</h1>
            <p className="cb:text-sm cb:text-gray-500">Efficient online resolution for every consumer concern.</p>
            <p className="cb:text-sm cb:text-gray-500"> Please choose what type of complaint you are.</p>
          </div>

          <div className="cb:grid cb:grid-cols-2 cb:gap-4 cb:w-full cb:max-w-md">
            <button 
                onClick={() => selectRoleAndStart('type_consumer', 'Consumer')}
                onMouseEnter={() => setHoveredCard('consumer')}
                onMouseLeave={() => setHoveredCard(null)}
                className="cb:flex cb:flex-col cb:items-center cb:p-4 cb:bg-white cb:border cb:border-gray-200 cb:rounded-2xl cb:shadow-sm hover:cb:border-blue-500 hover:cb:shadow-md cb:transition-all active:cb:scale-95"
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
                className="cb:flex cb:flex-col cb:items-center cb:p-4 cb:bg-white cb:border cb:border-gray-200 cb:rounded-2xl cb:shadow-sm hover:cb:border-blue-500 hover:cb:shadow-md cb:transition-all active:cb:scale-95"
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
       <div className="cb:flex cb:flex-col cb:flex-1 cb:overflow-hidden">

    {/* STICKY HEADER */}
      <div className="cb:sticky cb:top-0 cb:z-10 cb:bg-white cb:p-3 ">
        <ChatHeader role={userRole} />
      </div>

    {/* SCROLLABLE CHAT AREA */}
    <div className="cb:flex-1 cb:overflow-y-auto cb:p-4">
      {history.map((item, i) => (
        <ChatBubble 
          key={i} 
          type={item.type} 
          text={item.text} 
          actions={item.actions}
          onSelect={handleSelect}
          isLast={i === history.length - 1 && !isTyping}
        />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>

  </div>
      )}
    </div>
  );
}

export default App;