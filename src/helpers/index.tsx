export const generateRandomString = (length: number) => {
    const charactes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#%^&*/";
    let res = "";
    for(let i=0;i<length;i++) {
        res = res + charactes.charAt(Math.floor(Math.random()*(charactes.length)));
    }
    return res;
}