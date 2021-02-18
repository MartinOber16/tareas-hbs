const successNotificationImage = './assets/crystal-notification/img/Success.png';
const errorNotificationImage = './assets/crystal-notification/img/Error.png';

const notification = (title, type, content, location) => {
    
    let image = type ==='success' ? successNotificationImage : errorNotificationImage;
    $.CrystalNotification({
        title, 
        image,
        content,
        panelbutton: false,
    },function(){
        if(location != '' && location != undefined)
            window.location=location;
    });
}
