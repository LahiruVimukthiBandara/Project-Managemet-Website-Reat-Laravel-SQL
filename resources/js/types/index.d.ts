export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
