import { User } from "./User";

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
    author?: User;
    category: string;
    tags: string[];
    popular?: boolean;
  }