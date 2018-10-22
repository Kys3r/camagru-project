let socket = io.connect('https://buildfight.com');


socket.on('message', function (message, authour) {
    app.msgs.push({ content: message, name: authour });
});
$("#success-alert").hide();

socket.on('notification', function (notification) {
    showNotif(notification);
});

socket.on('roomStatus', function (roomStatus) {
    app.roomStatus = roomStatus;
});

socket.on('userInRoom', function (roomInfo) {
    app.mates = [];
    app.host = false;
    app.matesSkins = [];
    app.matesCountrys = [];
    let partyColor = [1, 1, 2, 2];
    for (let index in roomInfo) {
        app.mates.push(roomInfo[index].username);
        app.matesSkins.push(roomInfo[index].skin);
        app.matesCountrys.push(roomInfo[index].country);
        app.mates[index] == app.epicId;
        if (app.mates[0] == app.epicId)
            app.host = true;
        if (app.mates[index] == app.epicId) {
            if (app.actualRoom == '2 vs 2')
                app.position = partyColor[index];
            else
                app.position = (parseInt(index) + 1);
        }
    }
});

socket.on('closeChat', function (data) {
    if (data == app.epicId)
        app.closeChat();
});

socket.on('updateInfos', function (data) {
    app.epicId = data.epicId;
    app.region = data.region;
    app.skinId = data.skinId;
    app.platform = data.platform;
    app.locker = data.locker;
    app.authentified = data.isLogged;
});

socket.on('popEvent', function (data) {
    app.showPanel = true;
    app.data = data;
});


socket.on('showGift', function (data) {
    if (app.authentified)
        app.showGift = true;
});

socket.on('giftIsOpen', function (data) {
    app.showGift = false;
    app.showAlert = true;
    app.msgAlert = 'You have unlocked a new skin ! go check it out in your locker !';
    app.locker.push(data);
});