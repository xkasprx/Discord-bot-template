exports.util = {
	color: {
		accent: 0x37A0DC,
		blue: 0x003057,
		default: 0xff6600,
		green: 0x00ff00,
		red: 0xff0000,
		yellow: 0xffff00,
	},
	console: {
		codes: {
			blue: `\x1b[34m`,
			blue2: `\x1b[94m`,
			bold: `\x1b[1m`,
			cyan: `\x1b[36m`,
			cyan2: `\x1b[96m`,
			green: `\x1b[92m`,
			green2: `\x1b[42m`,
			italic: `\x1b[3m`,
			magenta: `\x1b[35m`,
			magenta2: `\x1b[95m`,
			normal: `\x1b[0m`,
			red: `\x1b[91m`,
			red2: `\x1b[41m`,
			underscore: `\x1b[4m`,
			white: `\x1b[37m`,
			white2: `\x1b[97m`,
			yellow: `\x1b[33m`,
			yellow2: `\x1b[93m`,			
		},
		colorend: `\x1b[0m`,
		colorify: (text = ``, code = ``) => `${this.util.console.codes[code] || this.util.console.codes[`normal`]}${text}${this.util.console.colorend}`,
	},
	delay: async (time) => new Promise(async (resolve) => setTimeout(() => resolve(), time)),
	log: async (firstText, secondText, firstColor = `normal`, secondColor = `normal`) => {
		let string = `${this.util.console.colorify(`::`, `cyan`)} ${this.util.console.colorify(firstText, firstColor)}${this.util.console.colorify(`:`, `cyan`)} ${this.util.console.colorify(secondText, secondColor)}`;

		if(firstText.startsWith(`[WARN]`)){
			console.warn(string);
		}else if(firstText.startsWith(`[ERROR]`)){
			console.error(string);
		}else{
			console.log(string);
		}
	},
	prettyDate: function (date, ignoreTime = false){
		date = date || new Date();

		let y = date.getFullYear();
		let m = date.getMonth();
		m = m < 9 ? '0' + (m + 1) : (m + 1);
		let d = date.getDate();
		d = d < 10 ? '0' + d : d;
		let h = date.getHours();
		h = h > 12 ? h - 12 : h;
		let i = date.getMinutes();
		i = i < 10 ? '0' + i : i;
		let a = date.getHours() >= 12 ? 'PM' : 'AM';

		return `${m}-${d}-${y}${ignoreTime ? `` : ` ${h}:${i} ${a}`}`;
	},
	random: {
		number: async (min, max) => {
			min = Math.ceil(min);
			max = Math.floor(max);

			return Math.floor(Math.random() * (max - min)) + min;
		},
		string: async (length = 8) => {
			let str = ``;
			let chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;

			for(let i = 0; i < length; i++){
				str += chars.charAt(Math.floor(Math.random() * chars.length));
			}

			return str;
		},
	},
	secToTime: async (n) => {
		let ms = n % 1000;
		let s = Math.floor((n / 1000) % 60).toString().padStart(2, `0`);
		let m = Math.floor((n / (60 * 1000)) % 60).toString().padStart(2, `0`);
		let h = Math.floor((n / (3600 * 1000)) % 3600).toString().padStart(2, `0`);
		return `${h}:${m}:${s}.${ms}`;
	},
};