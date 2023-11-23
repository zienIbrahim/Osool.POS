export interface AccessToken {
    aud: string;​ // App name
    cid: string; // Client ID
    exp: number; // Expiry date (ms)
    iss: string; // Issue date (ms)
    jti: string; // User ID
    lng: string; // User language
    nbf: number; // Not valid before (ms)
    sub: string; // User email
    tel: string; // User phone number
    rol: string[]; // User phone number
    permission: string[]; // User phone number
    tenantName:string;
    userName:string;
 }

 export const UserRole :UserRole={
       Admin: "Admin",
       OsoolUser: "OsoolUser",
       Delegate: "Delegate",
 }
 export interface UserRole{
    OsoolUser: string,
    Delegate: string,
    Admin: string,
 }