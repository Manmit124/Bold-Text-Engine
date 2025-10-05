export interface TextStyle {
  id: string;
  name: string;
  category: string;
  description: string;
  example: string;
}

export interface ConvertedText {
  styleId: string;
  text: string;
}

export interface StyleCategory {
  name: string;
  styles: TextStyle[];
}
