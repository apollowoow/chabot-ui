import { useState, useEffect, useRef } from 'react';
import ChatHeader from './components/ChatHeader';
import ChatBubble from './components/ChatBubble';
import TypingIndicator from './components/TypingIndicator';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [history, setHistory] = useState([
    { 
      type: 'bot', 
      text: 'Welcome to the Consumer Protection Portal. How are you filing today?', 
      choices: [
        { id: 'type_consumer', label: 'I am a Consumer' },
        { id: 'type_business', label: 'I am a Business' }
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isTyping]);

  const handleSelect = (choice) => {

    if (choice.id === 'type_consumer' || choice.id === 'type_business') {
      setUserRole(choice.id);
    }
    setHistory(prev => [...prev, { type: 'user', text: choice.label }]);
    setIsTyping(true);

    // Mock Backend Logic
    setTimeout(() => {
      let response = (choice.id === 'type_consumer') ? {
          text: "What is the nature of your complaint?",
          choices: [
            { id: 'c_defective', label: 'Defective Product' },
            { id: 'c_service', label: 'Poor Service' }
          ]
      } : {
          text: "Business Center. Reporting another business?",
          choices: [
            { id: 'b_b2b', label: 'Yes, B2B' },
            { id: 'b_fraud', label: 'No, Fraud Claim' }
          ]
      };

      setHistory(prev => [...prev, { 
        type: 'bot', 
        text: response.text, 
        choices: response.choices 
      }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    /* w-full h-full makes it fill the Laravel parent div */
    <div className="cb:relative cb:w-full cb:h-full cb:bg-white cb:flex cb:flex-col cb:overflow-hidden">
      <ChatHeader role={userRole}/>
      
      <div className="cb:flex-1 cb:overflow-y-auto cb:p-4">
        {history.map((item, i) => (
          <ChatBubble 
            key={i} 
            type={item.type} 
            text={item.text} 
            choices={item.choices}
            onSelect={handleSelect}
            // Logic: Only the last message can be interacted with
            isLast={i === history.length - 1 && !isTyping}
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default App;