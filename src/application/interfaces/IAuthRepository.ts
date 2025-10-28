export interface AuthClaims {
    sam?: string;
    name?: string;
    lastName?: string;
    email?: string;    
    groups?: string;            
}

export interface IAuthRepository {

    getClaims(): Promise<AuthClaims | undefined>;
    login(landingPage?: string): void;
    logout(): void;

}
