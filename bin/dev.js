/*
	Development PCT Admin for Demoing Purposes
	
	Move Project \dist to  PCT_Prod\dev

*/

const fs = require('fs-extra')

// remove dir
fs.removeSync("D:\\PCT_Prod\\dev\\static")
console.log('remove Development \static directory')

// copy file and overwrite
fs.copySync("D:\\PCT_Admin\\pct_admin_app\\vue-light-bootstrap-dashboard\\dist\\index.html", "D:\\PCT_Prod\\dev\\index.html", { overwrite: true })
console.log('overwrite dist\index.html to Development dev\index.html')

// copy dir
fs.copySync("D:\\PCT_Admin\\pct_admin_app\\vue-light-bootstrap-dashboard\\dist\\static", "D:\\PCT_Prod\\dev\\static")
console.log('copy dist\static dir to Development \static directory')


