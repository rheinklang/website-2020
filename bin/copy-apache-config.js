const fs = require('fs');
const { resolve } = require('path');
const { green } = require('chalk');

const SOURCE = resolve(__dirname, '..', 'src', '.htaccess');
const DEST = resolve(__dirname, '..', 'dist', 'rheinklang', '.htaccess');

// destination.txt will be created or overwritten by default.
fs.copyFile(SOURCE, DEST, (err) => {
	if (err) throw err;
	console.log('');
	console.log(green('📡 .htaccess was copied to compiled output directory'));
	console.log('');
});
