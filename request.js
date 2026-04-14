const targetSequence = action.nextSequence;
const response = await fetch('https://web.chatbot.f-dci.com/api/chat/get-step', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sequence_id: targetSequence, 
      user_action: action.label  
    })
  });