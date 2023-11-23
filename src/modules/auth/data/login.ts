export interface AuthenticateResponse {
    id: number;
    username: string;
    refreshToken: string;
    token: string;
    tenantId: string;
}
export interface Login {
    username? :string;
    password? :string;
    rememberMe? :string;
    returnUrl?:string
}