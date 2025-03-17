import { ChatOpenAI } from "@langchain/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";
import { PromptTemplate } from "@langchain/core/prompts";

// Define the system prompt for the phonology assistant
const PHONOLOGY_SYSTEM_PROMPT = `You are a helpful assistant specialized in linguistic phonology and language construction. 
Your role is to help users design phoneme inventories for constructed languages.

When users describe the kind of language they want to create, suggest appropriate phonemes based on:
1. Natural language typology
2. Phonological universals
3. Articulatory phonetics
4. The specific aesthetic or functional goals the user has

Format phoneme suggestions as IPA symbols. Provide brief explanations for why certain phonemes would work well together.
If the user mentions a specific natural language or language family as inspiration, base recommendations on those sound systems.

Available consonant phonemes include: p, b, t, d, k, g, q, ʔ, m, n, ŋ, f, v, θ, ð, s, z, ʃ, ʒ, ç, x, ɣ, h, ɬ, ɮ, r, ɾ, l, j, w, ʋ, ɹ
Available vowel phonemes include: i, y, ɨ, ʉ, ɯ, u, e, ø, ɘ, ɵ, ɤ, o, ɛ, œ, ɜ, ɞ, ʌ, ɔ, æ, a, ɑ, ɒ

Recommend balanced phoneme inventories with appropriate contrasts.`;

// Interface for the PhonologyChain parameters
interface PhonologyChainParams {
  apiKey?: string;
  temperature?: number;
}

// Interface for the chat request
interface PhonologyRequest {
  message: string;
  history?: { role: 'human' | 'ai'; content: string }[];
}

// Interface for the chat response
interface PhonologyResponse {
  text: string;
  suggestedPhonemes?: string[];
}

export class PhonologyChain {
  private model: ChatOpenAI;
  private memory: BufferMemory;
  private chain: ConversationChain;

  constructor(params: PhonologyChainParams = {}) {
    // Initialize the model (using environment variable as fallback for API key)
    this.model = new ChatOpenAI({
      temperature: params.temperature || 0.7,
      openAIApiKey: params.apiKey || process.env.OPENAI_API_KEY,
      modelName: "gpt-3.5-turbo",
    });

    // Initialize memory
    this.memory = new BufferMemory({
      returnMessages: true,
      memoryKey: "history",
    });

    // Template string for the prompt
    const template = `${PHONOLOGY_SYSTEM_PROMPT}\n\n{history}\nHuman: {input}\nAI: `;
    
    // Initialize the conversation chain
    this.chain = new ConversationChain({
      llm: this.model,
      memory: this.memory,
      prompt: new PromptTemplate({
        template,
        inputVariables: ["history", "input"],
      }),
    });
  }

  // Extract phonemes from AI response
  private extractPhonemes(text: string): string[] {
    // Simple regex pattern to find IPA symbols
    // This is a basic implementation - could be improved
    const phonemePattern = /[pbtdkgqʔmnŋfvθðszʃʒçxɣhɬɮrɾljwʋɹiɨʉɯuyeøɘɵɤoɛœɜɞʌɔæaɑɒ]+/g;
    const matches = text.match(phonemePattern) || [];
    
    // Filter for standalone IPA symbols (not parts of words)
    return [...new Set(matches.filter(match => 
      // Filter out English words that might contain these characters
      !/^(a|an|the|this|that|these|those|is|was|be|been|being|am|are|were|have|has|had|do|does|did|can|could|will|would|shall|should|may|might|must)$/i.test(match)
    ))];
  }

  // Process a message using the LangChain
  async processMessage(request: PhonologyRequest): Promise<PhonologyResponse> {
    try {
      // If history is provided, initialize the memory with it
      if (request.history && request.history.length > 0) {
        const pastMessages = request.history.map(msg => 
          msg.role === 'human' 
            ? new HumanMessage(msg.content) 
            : new AIMessage(msg.content)
        );
        
        // Add system message at the beginning
        pastMessages.unshift(new SystemMessage(PHONOLOGY_SYSTEM_PROMPT));
        
        // Set the chat history
        this.memory = new BufferMemory({
          returnMessages: true,
          chatHistory: new ChatMessageHistory(pastMessages),
          memoryKey: "history",
        });
        
        // Template string for the prompt
        const template = `${PHONOLOGY_SYSTEM_PROMPT}\n\n{history}\nHuman: {input}\nAI: `;
        
        // Update the chain with the new memory
        this.chain = new ConversationChain({
          llm: this.model,
          memory: this.memory,
          prompt: new PromptTemplate({
            template,
            inputVariables: ["history", "input"],
          }),
        });
      }

      // Process the message
      const response = await this.chain.call({
        input: request.message,
      });

      // Extract suggested phonemes
      const suggestedPhonemes = this.extractPhonemes(response.response);

      return {
        text: response.response,
        suggestedPhonemes: suggestedPhonemes,
      };
    } catch (error) {
      console.error("Error processing message with LangChain:", error);
      throw error;
    }
  }
} 