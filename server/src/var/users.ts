type User = {
    userid:string,
    token:string
}

let userlist:User[] = [];

export const getUsers = () => userlist;
export const getUser = (token:string) => userlist.filter(user => user.token === token)[0];
export const pushUser = (userid:string,token:string) => {
    removeUser(userid);
    userlist.push({userid,token})
    console.log("push",getUsers());
    return getUsers();
};
export const removeUser = (userid:string) => {
    userlist = userlist.filter(user => user.userid !== userid);
    console.log("remove",getUsers());
    return getUsers();
}