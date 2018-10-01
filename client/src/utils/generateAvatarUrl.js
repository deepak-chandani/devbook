
const generateAvatarUrl = (email, defaultUrl) => {
    if(!email){
        return defaultUrl;
    }

    console.log(email.indexOf('@thepsi.com'));
    if(email.indexOf('@thepsi.com') > 0){
        return `https://outlook.office.com/owa/service.svc/s/GetPersonaPhoto?email=${email}&UA=0&size=HR240x240`;
    }else{
        return defaultUrl;
    }
};


export default generateAvatarUrl;