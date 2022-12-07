export interface IParticipant {
    email: string;
    logo: string;
    userid: number;
    firstName?: string;
    lastName?: string;
}

export interface ConferenceInfo {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    logo: string;
    faqDoc: string;
    isOnline: string;
    onlineConnectionLink: string;
    offlineConnectionPlacement: string;
    errorMessage: string;
    isFounded: string;
    partyPageLink: string;
    totalUsersCount: number;
    participants: IParticipant[];
}
