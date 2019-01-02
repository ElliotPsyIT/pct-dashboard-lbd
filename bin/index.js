const fs = require('fs-extra')

// remove dir
fs.removeSync("C:\\PCT_Prod\\static")
console.log('remove static dir')

// copy file and overwrite
fs.copySync("C:\\PCT_Admin\\pct_admin_app\\vue-light-bootstrap-dashboard\\dist\\index.html", "C:\\PCT_Prod\\index.html_", { overwrite: true })
console.log('overwrite index.html to index.html_')

// copy dir
fs.copySync("C:\\PCT_Admin\\pct_admin_app\\vue-light-bootstrap-dashboard\\dist\\static", "C:\\PCT_Prod\\static")
console.log('copy static dir to PCT_Prod')

/*
(async () => {
	await trash(["C:\\PCT_Prod\\static"]);
	console.log('delete static dir');
	
	await trash(["C:\\PCT_Prod\\index.html_"]);
	console.log('deleted index.html_')
	
	await cpFile("C:\\PCT_Admin\\pct_admin_app\\vue-light-bootstrap-dashboard\\dist\\index.html", "C:\\PCT_Prod\\index.html_");
	console.log('copy index.html to index.html_')
	
	await cpFile("C:\\PCT_Admin\\pct_admin_app\\vue-light-bootstrap-dashboard\\dist\\static\\*", "C:\\PCT_Prod\\static\\*");
	console.log('copy static folder contents to prod')
	
})();
*/


