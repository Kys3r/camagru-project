// --------------------------------- [DECLARATION VUE VARIABLES] --------------------------------- \\

var app = new Vue({
	el: '#app',
	data: {
		username: '',
		password: '',
		confirmPass: '',
		email: '',
		confirmMail: '',
		region: '',
		epicId: '',
		skinId: undefined,
		platform: '',
		newMsg: '',
		capcha: '',
		showChat: false,
		showButtons: true,
		showLogPage: false,
		showSignPage: false,
		showParamPage: false,
		showReportPage: false,
		showSendBackEmail: false,
		showDevBlog: false,
		showPanel: false,
		showChest: true,
		paramButton: true,
		showIntroMsg: true,
		showLocker: false,
		authentified: false,
		showPwdForget: false,
		showNewPwd: false,
		showGift: false,
		showAlert: false,
		msgAlert: '',
		mailIsSended: false,
		actualRoom: '',
		partyColor: [1, 1, 2, 2],
		data: {},
		msgs: [],
		locker: [],
		mates: [],
		matesSkins: [],
		matesCountrys: [],
		position: 1,
		host: false,
		notification: '',
		roomStatus: '',
		token: '---',
		signUpOk: false,
		chestPath: "/assets/img/chest.png",
		// listes stocké dans register_vue.js
		errorSignUp: allErrorSignUp,
		selectedError: undefined,
		regions: allRegions,
		selectedRegion: 'EUR',
		citys: allCitys,
		selectedCity: 'tilted',
		countrys: allCountrys,
		selectedCountry: 'FR',
		languages: allLanguages,
		selectedLanguage: 'FR',
		platforms: allPlatforms,
		selectedPlatform: 'PC',
	},
	methods: {
		scrollToEnd() {
			var container = document.querySelector(".chat-box");
			var scrollHeight = container.scrollHeight;
			container.scrollTop = scrollHeight;
		},
		sendMsg() {
			if (this.newMsg.trim() === '')
				return;
			var i = 0;
			this.msgs.push({ content: this.newMsg, auteur: true });
			socket.emit('message', this.newMsg);
			this.newMsg = '';
		},
		connection() {
			if (this.authentified) {
				this.showLogPage = false;
			}
		},
		copy(name) {
			const el = document.createElement('textarea');
			el.value = name;
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
			showNotif('"' + name + '"' + " is copied in your clipboard");
		},
		addFriend(name) {
			window.open("https://fortnite.com/friend/" + name);
			return false;
		},
		selectRoom(roomName, room) {
			if (this.authentified) {
				this.showButtons = false;
				this.showChat = true;
				this.paramButton = false;
				this.actualRoom = roomName;
				socket.emit(room);
			}
			else
				this.showLogPage = true;
		},
		closeChat() {
			this.showButtons = true;
			this.showChat = false;
			this.authentified = false;
			this.showGift = false;
			showNotif('You logged in from another location...');
			socket.emit('leaveRoom');
			socket.emit('logout');
			let data = {
				logout: true,
			};
			this.$http.post('/form_route/logout', data).then(response => {

			}).catch(error => { });
		},
		showHideIntro() {
			setTimeout(function () {
				if (app.showIntroMsg)
					app.showIntroMsg = false;
				else
					app.showIntroMsg = true;
			}, 300);
		},
		removePass() {
			let data = {
				new_pwd: this.password,
				token: this.token,
				confirm_pwd: this.confirmPass,
				ret: '',
			};
			this.$http.post('/tokens_route/change_password', data).then(response => {

				if (response.data.ret == 1) {
					this.showNewPwd = false;
					showNotif('Your password is updated.');
				}
				this.selectedError = response.data.ret;
			})
		},
		signIn() {
			let data = {
				username: this.username,
				epicId: '',
				password: this.password,
				ret: '',
			};
			this.$http.post('/form_route/sign-in', data).then(response => {

				if (response.data.ret == 1) {
					this.authentified = true;
					this.username = response.data.username;
					this.showLogPage = false;
					this.password = undefined;
					this.selectedPlatform = response.data.platform;
					this.selectedCountry = response.data.country;
					showNotif("Welcome " + response.data.epicId);
					socket.emit('update');
				}
				else if (response.data.ret == 28)
				{
					showNotif('Please check your mail to activate your account');
					this.showSendBackEmail = true;
				}
				else if (response.data.ret == 27)
					showNotif('Invalid password');
				else
					showNotif('Invalid Login');
			}).catch(error => { });
		},
		resendEmail() {
			let data = {
				value: this.username
			};
			this.$http.post('/form_route/sendback-email', data).then(response => {
				
			}).catch(error => { });
		},
		signUp() {
			let data = {
				username: this.username,
				email: this.email,
				email_confirm: this.confirmMail,
				pwd: this.password,
				pwd_confirm: this.confirmPass,
				region: this.selectedRegion,
				language: this.selectedLanguage,
				country: this.selectedCountry,
				city: this.selectedCity,
				platform: this.selectedPlatform,
				'g-recaptcha-response': grecaptcha.getResponse(),
				epic_account: this.epicId
			};
			this.$http.post('/form_route/sign-up', data).then(response => {
				this.selectedError = response.data;
				if (response.data == 1) {
					this.showSignPage = false;
					this.signUpOk = true;
				}
			}).catch(error => {
				this.selectedError = error.data;
			});
		},
		logout() {
			let data = {
				logout: false,
			};
			this.username = '';
			this.epicId = '';
			this.$http.post('/form_route/logout', data).then(response => {

				if (response.data.logout == true) {
					this.authentified = false;
					this.showChat = false;
					this.showButtons = true;
					this.showParamPage = false;
					this.showLocker = false;
					this.showPwdForget = false;
					this.showLogPage - false;
					this.showSignPage = false;
					this.showGift = false;
					showNotif('Disconnected');
					socket.emit('leaveRoom');
					//	socket.emit('update');
				}
			}).catch(error => { });
		},
		clearData(){
			this.username = '';
			this.epicId = '';
			this.password = '',
			this.email = '',
			this.confirmPass = '',
			this.confirmMail = '',
			this.selectedError = undefined
		},
		skin() {
			let data = {
				skin: this.skinId
			};
			this.$http.post('/form_route/skin', data).then(response => {
				if (response.data.ret)
					socket.emit('update');
			})
		},
		goHome() {
			this.showButtons = true;
			this.showChat = false;
			this.showLocker = false;
			this.showParamPage = false;
			this.showPwdForget = false;
			this.showSignPage = false;
			this.showLogPage = false;
			this.mailIsSended = false;
			this.paramButton = true;
			socket.emit('leaveRoom');
			this.msgs = [];
		},
		openChest() {
			if (app.chestPath != "/assets/img/chestOpen.png") {
				$(".chest").removeClass("chestAnim");
				this.chestPath = "/assets/img/animated.png";
				setTimeout(function () {
					app.chestPath = "/assets/img/chestOpen.png";
					app.showDevBlog = true;
				}, 1000);
			}
		},
		popAlert(str){
			app.msgAlert = str;
			app.showAlert = true;	
		}
	},
	mounted() {
		this.scrollToEnd();
	},
	updated() {
		this.scrollToEnd();
	}
});