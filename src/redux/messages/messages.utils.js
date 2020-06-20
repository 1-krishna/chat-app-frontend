export const getUsers = messages => {
    let users = [];
    messages.forEach(element => {
        if (!users.includes(element.fromUser)) {
            users.push(element.fromUser)
        }
        if (!users.includes(element.toUser)) {
            users.push(element.toUser)
        }
    });
    return users;
}

export const getOpenUserMessages = (messages, user) => {
    let userMessages = [];
    messages.forEach(element => {
        if (element.fromUser === user || element.toUser === user) {
            userMessages.push(element)
        }
    });
    return userMessages;
}