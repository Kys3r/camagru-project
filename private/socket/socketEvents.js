const Skins = require('../mongo/models/crud_skin.js');

const SocketAntiSpam = require('socket-anti-spam');
let mod = require('../../app');
let mod2 = require('../router/form_route.js');
let mod3 = require('../router/settings_route.js');


let room1v1 = 1;
let room2v2 = 1;
let roomFFA = 1;
let nbUsers = 0;
let spamScore = 9999;
let clients;
//let skinInGift = randomBetween(9, (112 - 9));
let skinInGift = 9;
let platformInRoom = {};
let roomsInfos = {};
let userOnline = {};
file1v1 = [];
file1v1.shift();
file2v2 = [];
file2v2.shift();
fileFFA = [];
fileFFA.shift();

stats = {
    usersOnline: undefined,
    total1v1Room: undefined,
    total2v2Room: undefined,
    totalFFARoom: undefined
}

function randomBetween(min, max) {
    if (min < 0) {
        return Math.round(min + Math.random() * (Math.abs(min) + max));
    } else {
        return Math.round(min + Math.random() * max);
    }
}


setInterval(function () {
    skinInGift = randomBetween(9, (112 - 9));
}, 86400000);     // <------ automatisation du changement de skin tout les jours en random

exports = module.exports = function (io) {

    // ------- ! envoi les infos de l'user vers le client au refresh ! ----------

    io.sockets.on('connection', function (socket) {

        mod = require('../../app');
        mod2 = require('../router/form_route.js');
        mod3 = require('../router/settings_route.js');

        function initUser() {
            if (mod.session)
                socket.session = mod.session;
            else if (socket.handshake.session.isLogged)
                socket.session = socket.handshake.session;
            mod.session = undefined;
            // a suprimer ->
            if (socket.session && !!socket.session.username) {
                if (userOnline[socket.session.UserId] != socket.id && io.sockets.sockets[userOnline[socket.session.UserId]]) {
                    io.to(userOnline[socket.session.UserId]).emit('closeChat', socket.session.username);
                }
                userOnline[socket.session.UserId] = socket.id;
                socket.session.region = 'ALL';
                socket.session.country = socket.session.country.toLowerCase();
                let usrData = { epicId: socket.session.username, platform: socket.session.platform, skinId: socket.session.skin, region: socket.session.region, locker: socket.session.locker, country: socket.session.country, isLogged: socket.session.isLogged }
                if (socket.session.locker.indexOf(skinInGift) == -1)
                    socket.emit('showGift');
                socket.emit('updateInfos', usrData);
            }
        }
        initUser();
        // ------- ! envoi les infos de l'user vers le client a la connection ! ----------
        socket.on('update', function () {
            if (mod2.session) {
                mod.session = mod2.session;
                mod2.session = undefined;
            }
            else if (mod3.session) {
                mod.session = mod3.session;
                mod3.session = undefined;
            }
            initUser();
        });
        socket.on('serverInfos', function () {
            if (socket.session)
                if (socket.session.typeOfUser == 'admin') {
                    stats.usersOnline = Object.keys(userOnline);
                    stats.nbOfUsers = stats.usersOnline.length;
                    stats.total1v1Room = room1v1;
                    stats.total2v2Room = room2v2;
                    stats.totalFFARoom = roomFFA;
                    socket.emit('popEvent', stats); // controler si admin !
                }
        })
        socket.on('room1v1', function () {
            if (socket.session) {
                if (socket.room)
                    socket.leave(socket.room);
                let str = filterRegion(file1v1, socket.session.region, socket.session.platform);

                if (str != undefined) {
                    socket.room = str; // trouve une room dans la file d'attente
                }
                else {
                    socket.room = '1v1:' + socket.session.region + room1v1;
                    let i = 0;
                    while (!checkPlatform(platformInRoom[socket.room], socket.session.platform)) {
                        socket.room = '1v1:' + socket.session.region + (room1v1 + i); // entre dans la prochaine room dispo pas encore dans la file d'attente
                        i++;
                    }
                }

                socket.join(socket.room);
                if (platformInRoom[socket.room] == null)
                    platformInRoom[socket.room] = [];
                platformInRoom[socket.room].push(socket.session.platform);

                if (!!io.sockets.adapter.rooms[socket.room]) {
                    clients = io.sockets.adapter.rooms[socket.room].sockets;
                    nbUsers = Object.keys(clients).length;
                }
                else
                    nbUsers = 0;
                socket.to(socket.room).emit('notification', socket.session.username + " join the room.");
                if (roomsInfos[socket.room] == null) {
                    roomsInfos[socket.room] = [];
                }
                roomsInfos[socket.room].push({ username: socket.session.username, skin: socket.session.skin, country: socket.session.country });
                io.in(socket.room).emit('userInRoom', roomsInfos[socket.room]);
                if (nbUsers == 2)
                    room1v1++;
                checkRoom(2, nbUsers, socket.room);
            }
        });
        socket.on('room2v2', function () {
            if (socket.session) {
                if (socket.room)
                    socket.leave(socket.room);
                let str = filterRegion(file2v2, socket.session.region, socket.session.platform);

                if (str != undefined) {
                    socket.room = str; // trouve une room dans la file d'attente
                }
                else {
                    socket.room = '2v2:' + socket.session.region + room2v2;
                    let i = 0;
                    while (!checkPlatform(platformInRoom[socket.room], socket.session.platform)) {
                        socket.room = '2v2:' + socket.session.region + (room2v2 + i); // entre dans la prochaine room dispo pas encore dans la file d'attente
                        i++;
                    }
                }

                socket.join(socket.room);
                if (platformInRoom[socket.room] == null)
                    platformInRoom[socket.room] = [];
                platformInRoom[socket.room].push(socket.session.platform);

                if (!!io.sockets.adapter.rooms[socket.room]) {
                    clients = io.sockets.adapter.rooms[socket.room].sockets;
                    nbUsers = Object.keys(clients).length;
                }
                else
                    nbUsers = 0;
                socket.to(socket.room).emit('notification', socket.session.username + " join the room.");
                if (roomsInfos[socket.room] == null) {
                    roomsInfos[socket.room] = [];
                }
                roomsInfos[socket.room].push({ username: socket.session.username, skin: socket.session.skin, country: socket.session.country });
                io.in(socket.room).emit('userInRoom', roomsInfos[socket.room]);
                if (nbUsers == 4)
                    room2v2++;
                checkRoom(4, nbUsers, socket.room);
            }

        });
        socket.on('roomFFA', function () {
            if (socket.session) {
                if (socket.room)
                    socket.leave(socket.room);
                let str = filterRegion(fileFFA, socket.session.region, socket.session.platform);

                if (str != undefined) {
                    socket.room = str; // trouve une room dans la file d'attente
                }
                else {
                    socket.room = 'FFA:' + socket.session.region + roomFFA;
                    let i = 0;
                    while (!checkPlatform(platformInRoom[socket.room], socket.session.platform)) {
                        socket.room = 'FFA:' + socket.session.region + (roomFFA + i); // entre dans la prochaine room dispo pas encore dans la file d'attente
                        i++;
                    }
                }

                socket.join(socket.room);
                if (platformInRoom[socket.room] == null)
                    platformInRoom[socket.room] = [];
                platformInRoom[socket.room].push(socket.session.platform);

                if (!!io.sockets.adapter.rooms[socket.room]) {
                    clients = io.sockets.adapter.rooms[socket.room].sockets;
                    nbUsers = Object.keys(clients).length;
                }
                else
                    nbUsers = 0;
                socket.to(socket.room).emit('notification', socket.session.username + " join the room.");
                if (roomsInfos[socket.room] == null) {
                    roomsInfos[socket.room] = [];
                }
                roomsInfos[socket.room].push({ username: socket.session.username, skin: socket.session.skin, country: socket.session.country });
                io.in(socket.room).emit('userInRoom', roomsInfos[socket.room]);
                if (nbUsers == 4)
                    roomFFA++;
                checkRoom(4, nbUsers, socket.room);
            }
        });
        socket.on('leaveRoom', function () {
            if (socket.session) {
                let str = socket.room;
                if (!!io.sockets.adapter.rooms[socket.room]) {
                    clients = io.sockets.adapter.rooms[socket.room].sockets;
                    nbUsers = Object.keys(clients).length;
                }
                else
                    nbUsers = 0;
                if (str != undefined)
                    if (str.search("2v2:") >= 0) {
                        file2v2.push(socket.room);
                        checkRoom(4, nbUsers - 1, socket.room);
                    }
                    else if (str.search("FFA:") >= 0) {
                        fileFFA.push(socket.room);
                        checkRoom(4, nbUsers - 1, socket.room);
                    }
                    else
                        checkRoom(2, nbUsers - 1, socket.room);
                removeFromRoom(platformInRoom[socket.room], socket.session.platform);
                if (socket.room && roomsInfos[socket.room]) {
                    let index = roomsInfos[socket.room].findIndex((element) => {
                        return element.username === socket.session.username;
                    });
                    roomsInfos[socket.room].splice(index, 1);
                    if (!roomsInfos[socket.room].length) {
                        delete roomsInfos[socket.room];
                        // a test ->
                        file2v2.splice(file2v2.indexOf(socket.room), 1);
                        fileFFA.splice(fileFFA.indexOf(socket.room), 1);
                        //-------
                    }
                }


                io.in(socket.room).emit('userInRoom', roomsInfos[socket.room]);
                if (spamScore < socketAntiSpam.options.kickThreshold)
                    socket.to(socket.room).emit('notification', socket.session.username + " leave the room.");
                socket.leave(socket.room);
            }
        });
        socket.on('logout', function () {
            if (socket.session) {
                delete userOnline[socket.session.UserId];
            }
        });
        socket.on('disconnect', function () {
            if (socket.session) {
                let str = socket.room;
                if (!!io.sockets.adapter.rooms[socket.room]) {
                    clients = io.sockets.adapter.rooms[socket.room].sockets;
                    nbUsers = Object.keys(clients).length;
                }
                else
                    nbUsers = 0;
                if (str != undefined)
                    if (str.search("2v2:") >= 0) {
                        file2v2.push(socket.room);
                        checkRoom(4, nbUsers - 1, socket.room);
                    }
                    else if (str.search("FFA:") >= 0) {
                        fileFFA.push(socket.room);
                        checkRoom(4, nbUsers - 1, socket.room);
                    }
                    else
                        checkRoom(2, nbUsers - 1, socket.room);

                removeFromRoom(platformInRoom[socket.room], socket.platform);
                if (roomsInfos[socket.room]) {
                    let index = roomsInfos[socket.room].findIndex((element) => {
                        return element.username === socket.session.username;
                    });
                    roomsInfos[socket.room].splice(index, 1);
                    if (!roomsInfos[socket.room].length)
                        delete roomsInfos[socket.room];

                }
                io.in(socket.room).emit('userInRoom', roomsInfos[socket.room]);
                if (socket.session && spamScore < socketAntiSpam.options.kickThreshold)
                    socket.to(socket.room).emit('notification', socket.session.username + " leave the room.");
            }
        });

        socket.on('message', function (message) {
            if (socket.session) {
                socket.to(socket.room).emit('message', message, socket.session.username);
            }
        });
        socket.on('openGift', function () {
            if (socket.session) {
                Skins.getLocker(socket.session.UserId, (successLocker) => {
                    socket.session.locker = successLocker;
                    if (socket.session.locker.indexOf(skinInGift) == -1) {
                        Skins.updateLocker(socket.session.UserId, skinInGift, (successUpdate) => {
                            socket.session.locker.push(skinInGift);
                            socket.emit('giftIsOpen', skinInGift);
                            // let usrData = { epicId: socket.pseudo, platform: socket.platform, skinId: socket.skinId, region: socket.region, locker: socket.locker, country: socket.country }
                            // socket.emit('updateInfos', usrData);
                        }, (errorUpdate) => { })
                    }
                }, (error) => { })
            }
        });
    });
    function checkRoom(sizeRoom, nbUsers, room) {

        if (nbUsers <= 1)
            io.in(room).emit('roomStatus', "WAIT PLAYERS");
        else if (nbUsers == 2 && sizeRoom == 2)
            io.in(room).emit('roomStatus', nbUsers - 1 + " PLAYER FOUND, ADD FRIEND AND GO PLAYGROUND !");
        else if (nbUsers == 2 && sizeRoom == 4)
            io.in(room).emit('roomStatus', nbUsers - 1 + " PLAYER FOUND, WAIT FOR " + (sizeRoom - nbUsers) + " PLAYERS");
        else if (nbUsers == 3 && sizeRoom == 4)
            io.in(room).emit('roomStatus', nbUsers - 1 + " PLAYERS FOUND, WAIT FOR " + (sizeRoom - nbUsers) + " PLAYER");
        else
            io.in(room).emit('roomStatus', nbUsers - 1 + " PLAYERS FOUND, ADD FRIENDS AND GO PLAYGROUND !");
    }

    function checkPlatform(platformInRoom, usrPlatform) {
        /* for (let key in platformInRoom) {
             if ((platformInRoom[key] == 'XB1' || platformInRoom[key] == 'PC' || platformInRoom[key] == 'PS4') && (usrPlatform == 'SM' || usrPlatform == 'SW'))
                 return (false)
             if ((platformInRoom[key] == 'SM' || platformInRoom[key] == 'SW') && (usrPlatform == 'PS4' || usrPlatform == 'XB1' || usrPlatform == 'PC'))
                 return (false)
         }*/
        return (true);
    }
    function filterRegion(array, region, platform) {
        let str = undefined;
        for (let key in file2v2) {
            if (array[key] != undefined)
                if (array[key].search(region) >= 0 && checkPlatform(platformInRoom[array[key]], platform)) {
                    str = array[key];
                    array.splice(key, 1)
                    return (str);
                }
        }
        return (str);
    }
    function removeFromRoom(room, user) {
        for (let key in room) {
            if (room[key] == user) {
                room.splice(key, 1);
            }
        }
    }
    const socketAntiSpam = new SocketAntiSpam({
        banTime: 30,         // Ban time in minutes
        kickThreshold: 20,          // User gets kicked after this many spam score
        kickTimesBeforeBan: 3,          // User gets banned after this many kicks
        banning: true,       // Uses temp IP banning after kickTimesBeforeBan
        io: io, // Bind the socket.io variable
        //redis:              client,      // Redis client if you are sharing multiple servers
    });

    /*  socketAntiSpam.event.on('ban', data => {
          console.log("user is banned by ip for " + socketAntiSpam.options.banTime + " for spam.");
      })
      socketAntiSpam.event.on('kick', data => {
          console.log("user is kicked for spam.");
      })*/
    socketAntiSpam.event.on('spamscore', (socket, data) => {
        if (data.score >= socketAntiSpam.options.kickThreshold && data.kickCount < socketAntiSpam.options.kickTimesBeforeBan - 1) {
            socket.emit('closeChat', socket.session.username);
            io.in(socket.room).emit('notification', socket.session.username + " is kicked for spam.");
        }
        else if (data.score >= socketAntiSpam.options.kickThreshold) {
            socket.emit('closeChat', socket.session.username);
            io.in(socket.room).emit('notification', socket.session.username + " is banned for spam for " + socketAntiSpam.options.banTime + " minutes.");
        }
        spamScore = data.score;
    });
}
