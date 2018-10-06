
const generateAvatarUrl = (email, defaultUrl) => {
    return defaultUrl;
    if(!email){
        return defaultUrl;
    }

    if(email.indexOf('@thepsi.com') > 0){
        return `https://outlook.office.com/owa/service.svc/s/GetPersonaPhoto?email=${email}&UA=0&size=HR240x240`;
    }else{
        return defaultUrl;
    }
};


export default generateAvatarUrl;