// AI Service for Chat Functionality
// Using multiple fallback APIs for better reliability

interface AIResponse {
  content: string
  success: boolean
  error?: string
}

// Simple rule-based responses as ultimate fallback
const fallbackResponses: { [key: string]: string[] } = {
  greeting: [
    'Hello! Nice to meet you! How can I help you today?',
    'Hi there! I\'m your AI assistant. What would you like to chat about?',
    'Hello! How has your day been? Is there anything I can help you with?'
  ],
  question: [
    'That\'s a very interesting question! Let me think about it...',
    'I understand your question, and it\'s definitely worth thinking about deeply.',
    'This is an interesting question. I think we can analyze it from multiple angles.',
    'You\'ve raised a great question. Let me help you analyze it.'
  ],
  help: [
    'I\'d be happy to help you! Please tell me what you need assistance with.',
    'Of course! I\'m here to help you solve problems.',
    'No problem! I\'ll do my best to provide you with help.'
  ],
  learning: [
    'Learning is a great topic! What area of knowledge would you like to explore?',
    'I love discussing learning-related topics. Is there something specific you\'d like to learn?',
    'Learning is indeed very important. I can share some learning methods and techniques.'
  ],
  work: [
    'I can also help with work-related questions! Do you have any workplace concerns?',
    'Career topics are fascinating. I can share some work experience and advice.',
    'Work is indeed an important part of our lives. What would you like to discuss?'
  ],
  life: [
    'Life is always full of possibilities! Do you have any life questions you\'d like to chat about?',
    'I\'m happy to provide life advice. Is there anything troubling you?',
    'Life isn\'t easy, but we can work together to find solutions.'
  ],
  default: [
    'That makes me think of many possibilities.',
    'Your idea is very creative!',
    'This is indeed a topic worth thinking about deeply.',
    'I\'d be happy to discuss this with you.',
    'I\'ve learned something new from this, thanks for sharing!',
    'Your perspective is interesting and makes me reconsider my thoughts.'
  ]
}

// Detect message intent
const detectIntent = (message: string): string => {
  const lowerMessage = message.toLowerCase()
  
  // Greeting patterns
  if (/^(hello|hi|hey|good morning|good afternoon|good evening|greetings)/.test(lowerMessage)) {
    return 'greeting'
  }
  
  // Question patterns
  if (/\?|what|how|why|when|where|which|who|can you|could you|would you/.test(lowerMessage)) {
    return 'question'
  }
  
  // Help patterns
  if (/help|assist|support|advice|guidance/.test(lowerMessage)) {
    return 'help'
  }
  
  // Learning patterns
  if (/learn|study|education|knowledge|course|teach|training/.test(lowerMessage)) {
    return 'learning'
  }
  
  // Work patterns
  if (/work|job|career|office|business|professional/.test(lowerMessage)) {
    return 'work'
  }
  
  // Life patterns
  if (/life|daily|family|friends|relationship|personal|health/.test(lowerMessage)) {
    return 'life'
  }
  
  return 'default'
}

// Generate contextual response
const generateContextualResponse = (message: string): string => {
  const intent = detectIntent(message)
  const responses = fallbackResponses[intent] || fallbackResponses.default
  
  // Add some contextual elements based on the message
  let response = responses[Math.floor(Math.random() * responses.length)]
  
  // Add follow-up questions based on intent
  switch (intent) {
    case 'greeting':
      response += ' What are your plans for today?'
      break
    case 'question':
      response += ' Do you have any other questions you\'d like to explore?'
      break
    case 'help':
      response += ' Please describe your needs in detail.'
      break
    case 'learning':
      response += ' I can share some learning methods and resources.'
      break
    case 'work':
      response += ' I can provide some career development advice.'
      break
    case 'life':
      response += ' I\'d love to hear your thoughts.'
      break
    default:
      response += ' What else would you like to chat about?'
  }
  
  return response
}

// Simulate typing delay
const simulateTypingDelay = (message: string): number => {
  // Calculate delay based on message length (minimum 1s, maximum 3s)
  const baseDelay = Math.min(Math.max(message.length * 50, 1000), 3000)
  // Add some randomness
  return baseDelay + Math.random() * 1000
}

// Main AI API function
export const callAIAPI = async (message: string): Promise<string> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, simulateTypingDelay(message)))
    
    // Try different AI APIs in order of preference
    const apis = [
      tryHuggingFaceAPI,
      tryOpenAIAPI,
      tryCustomAPI
    ]
    
    for (const api of apis) {
      try {
        const response = await api(message)
        if (response.success) {
          return response.content
        }
      } catch (error) {
        console.warn('API failed, trying next:', error)
        continue
      }
    }
    
    // If all APIs fail, use fallback
    return generateContextualResponse(message)
    
  } catch (error) {
    console.error('All AI APIs failed:', error)
    return generateContextualResponse(message)
  }
}

// Hugging Face API (free tier)
const tryHuggingFaceAPI = async (message: string): Promise<AIResponse> => {
  const API_URL = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium'
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: message,
      parameters: {
        max_length: 100,
        temperature: 0.7,
        do_sample: true,
        pad_token_id: 50256
      }
    })
  })

  if (!response.ok) {
    throw new Error(`Hugging Face API Error: ${response.status}`)
  }

  const data = await response.json()
  
  if (Array.isArray(data) && data.length > 0) {
    const generatedText = data[0].generated_text
    if (generatedText && generatedText.trim()) {
      // Clean up the response
      const cleanText = generatedText
        .replace(message, '') // Remove the input message
        .trim()
        .split('\n')[0] // Take only the first line
      
      return {
        content: cleanText || generateContextualResponse(message),
        success: true
      }
    }
  }
  
  throw new Error('Invalid response format')
}

// OpenAI-style API (placeholder for future implementation)
const tryOpenAIAPI = async (message: string): Promise<AIResponse> => {
  // This would be implemented with a real OpenAI API key
  // For now, throw an error to skip to next API
  throw new Error('OpenAI API not configured')
}

// Custom API endpoint (placeholder for future implementation)
const tryCustomAPI = async (message: string): Promise<AIResponse> => {
  // This could be a custom backend API
  // For now, throw an error to use fallback
  throw new Error('Custom API not available')
}

// Enhanced response generation with more context
export const generateEnhancedResponse = (message: string, conversationHistory: string[] = []): string => {
  const intent = detectIntent(message)
  let response = generateContextualResponse(message)
  
  // Add conversation context if available
  if (conversationHistory.length > 0) {
    const lastMessage = conversationHistory[conversationHistory.length - 1]
    if (lastMessage.includes('learn') || lastMessage.includes('study')) {
      response += ' Based on our previous conversation, I suggest you could create a study plan.'
    } else if (lastMessage.includes('work') || lastMessage.includes('job')) {
      response += ' Considering your work situation that you mentioned before, I think this is a good direction.'
    }
  }
  
  return response
}

export default {
  callAIAPI,
  generateEnhancedResponse
}
