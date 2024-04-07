export type SingUpRequest = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};

export type SingUpResponse = {
    id: number;
};

export type SingInRequest = {
    login: string;
    password: string;
};

export type UserResponse = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    avatar: string;
    email: string;
};
