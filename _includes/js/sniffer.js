/*
	puper druper sniffer version 1.12

	1.11 - added ovi browser, added Series40 os
	1.12 - added opera mini
*/

var Sniffer = {
	browser: {
		/*
		name
		version
		engine
		*/
	},
	os: {
		/*
		name
		version
		*/
	},
	features: {
		/*
		bw
		*/
	},

	init: function () {
		this.browser = this.searchString(this.dataBrowser) || '';
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| false;
		this.os = this.searchString(this.dataOS) || '';
		this.osVersion = this.searchOSVersion(navigator.userAgent)
			|| this.searchVersion(navigator.platform)
			|| false;
		this.setClasses();
	},
	setClasses: function() {
		var tag = document.getElementsByTagName('html')[0];
		var classNames = [tag.className, this.browser, this.os].join(' ');

		if (this.browser != 'ie') classNames += ' no-ie';
		if (this.os == 'android' && this.osVersion <= 2.3) classNames += ' android-old';
		if (this.os == 'kindle' || (this.os == 'winphone' && this.osVersion < 8)) {
			classNames = classNames.replace('fontface','no-fontface');
		}

		tag.className = classNames;
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].name;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].name;
			}
			else if (dataProp)
				return data[i].name;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		console.log(dataString.substring(index+this.versionSearchString.length+1));
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	searchOSVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			test: [
				{
					string: navigator.userAgent,
					search: 'MSIE'
				}
			],
			browser: {
				name: 'ie',
				engine: 'trident'
			},
			version: {
				string: navigator.userAgent,
				search: 'MSIE'
			}
		},
		{
			test: [
				{
					string: navigator.vendor,
					search: 'Opera Software'
				}
			],
			browser: {
				engine: 'webkit',
				name: 'opera'
			},
			version: {
				string: navigator.userAgent,
				search: 'OPR'
			}
		},
		{
			test: [
				{
					string: navigator.userAgent,
					search: 'Chrome',
				}
			],
			browser: {
				engine: 'webkit',
				name: 'chrome'
			},
			version: {
				string: navigator.userAgent,
				search: 'Chrome'
			}
		},
		{
			test: [
				{
					string: navigator.userAgent,
					search: 'Firefox'
				}
			],
			browser: {
				name: 'firefox',
				engine: 'gecko'
			},
			version: {
				string: navigator.userAgent,
				search: 'Firefox'
			}
		},
		{
			test: [
				{
					string: navigator.userAgent,
					search: 'NokiaBrowser'
				}
			],
			browser: {
				engine: 'webkit',
				name: 'nokiabrowser'
			},
			features: {
				mobile: true
			},
			version: {
				string: navigator.userAgent,
				search: 'NokiaBrowser'
			}
		},
		{
			test: [
				{
					string: navigator.userAgent,
					search: 'Opera Mini'
				},
				{
					string: navigator.userAgent,
					search: 'Presto'
				}
			],
			browser: {
				name: 'operamini',
				engine: 'presto'
			},
			features: {
				mobile: true
			},
			version: {
				string: navigator.userAgent,
				search: 'Version'
			}
		},
		/* future proof */
		{
			test: [
				{
					string: navigator.userAgent,
					search: 'Opera Mini'
				},
				{
					string: navigator.userAgent,
					search: 'AppleWebKit'
				}
			],
			browser: {
				name: 'opera',
				engine: 'webkit'
			},
			features: {
				mobile: true,
				serverside: true
			},
			version: {
				string: navigator.userAgent,
				search: 'Version'
			}
		},
		{
			test: [
				{
					prop: window.opera
				}
			],
			browser: {
				name: 'opera',
				engine: 'presto'
			},
			version: {
				string: navigator.userAgent,
				search: 'Version'
			}
		},
		{
			test: [
				{
					string: navigator.userAgent,
					search: 'OviBrowser'
				}
			],
			browser: {
				name: 'ovi'
			},
			features: {
				mobile: true,
				serverside: true
			},
			version: {
				string: navigator.userAgent,
				search: 'OviBrowser'
			}
		},
		{
			test: [
				{
					string: navigator.vendor,
					search: 'Apple'
				},
				{
					string: navigator.userAgent,
					search: 'Safari'
				}
			],
			browser: {
				name: 'safari',
				engine: 'webkit'
			},
			version: {
				string: navigator.userAgent,
				search: 'Version'
			}
		}
	],
	dataOS : [
		{
			test: [
				{
					string: navigator.userAgent,
					search: "Windows Phone"
				}
			],
			name: "winphone",
			version: {
				string: navigator.userAgent,
				search: "Windows Phone"
			}
		},
		{
			test: [
				{
					string: navigator.platform,
					search: "Win"
				}
			],
			name: "win"
		},
		{
			test: [
				{
					string: navigator.platform,
					search: "Mac"
				}
			],
			name: "mac"
		},
		{
			test: [
				{
					string: navigator.userAgent,
					search: "iPhone"
				}
			],
			name: "ios"
		},
		{
			test: [
				{
					string: navigator.userAgent,
					search: "Android"
				}
			],
			name: "android",
			version: {
				string: navigator.userAgent,
				search: "Android"
			}
		},
		{
			test: [
				{
					string: navigator.userAgent,
					search: "Symbian"
				}
			],
			name: "symbian"
		},
		{
			test: [
				{
					string: navigator.userAgent,
					search: "Series40"
				}
			],
			name: "symbian"
		},
		{
			test: [
				{
					string: navigator.platform,
					search: "Linux"
				}
			],
			name: "linux"
		},
		{
			test: [
				{
					string: navigator.userAgent,
					search: "Kindle"
				}
			],
			name: "kindle"
		}
	]
};

Sniffer.init();