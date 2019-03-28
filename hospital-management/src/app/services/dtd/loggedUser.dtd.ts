export interface LoggedUser{
    name: string;
    userId: number;
    email: string;
    userName: string;
    profileUrl: string;
    expiration: number;
    hospitalStaffId: number;
    position: string;
    channels: any[];
}

export interface LogingResponceDTO {
    displayUserDTO: DisplayUserDTO;
    hospitelStaff: HospitelStaff;
}

export interface AuthToken {
    accessToken: string;
    refreshToken: string;
}

export interface DisplayUserDTO {
    authToken: AuthToken;
    name: string;
    userId: number;
    email: string;
    userName: string;
    profileUrl: string;
    expiration: number;
}

export interface HospitelStaff {
    hospitalStaffId: number;
    position: string;
    channels: any[];
}
