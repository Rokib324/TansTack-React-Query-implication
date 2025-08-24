export type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    company: { name: string };
    address: { city: string };
  };
  
  const BASE = "https://jsonplaceholder.typicode.com";
  
  export async function getUsers(): Promise<User[]> {
    const res = await fetch(`${BASE}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  }
  
  export async function getUser(id: number): Promise<User> {
    const res = await fetch(`${BASE}/users/${id}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
  }