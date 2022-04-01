export interface IUser {
    name: string;
    age: number;
    salary: number;
    langs?: string[] | null;
    sizes: number[] | null;
    country: string;
    city: string;
}
