export const getUsers = messages => {
    let users = [];
    messages.forEach(element => {
        if (!users.includes(element.fromUser)) {
            users.push(element.fromUser)
        }
    });
    return users;
}