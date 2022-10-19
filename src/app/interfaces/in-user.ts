export interface inUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface inUserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: inUser[];
}
