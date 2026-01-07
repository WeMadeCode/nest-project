export interface BillResponseData {
  expense: BillItem[];
  income: BillItem[];
}

export interface BillItem {
  amount: string;
  category: string;
  timestamp: number;
}

export interface AIReaponseData {
  choices: AIChoice[];
}

export interface AIChoice {
  message: AIMessage;
  finish_reason: string;
}

export interface AIMessage {
  role: string;
  content: string;
  reasoning_content: string;
}
