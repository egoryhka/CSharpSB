export interface roles {
    isAdmin: boolean;
    isExpert: boolean;
    isSpeaker: boolean;
    isGuest: boolean;
    isListener: boolean;
}

export const getLinkText = (userRoles: roles): string => {
    if (userRoles.isAdmin) {
        return "Редактировть"
    }
    if (userRoles.isGuest) {
        return "Присоедениться"
    }
    return "Покинуть"
}
