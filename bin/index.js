/*
	Move Project \dist to  PCT_Prod

*/

const fs = require('fs-extra')

// remove dir
fs.removeSync("D:\\PCT_Prod\\pct\\static")
console.log('remove Production \static directory')

// copy file and overwrite
fs.copySync("D:\\PCT_Admin\\pct_admin_app\\vue-light-bootstrap-dashboard\\dist\\index.html", "D:\\PCT_Prod\\pct\\index.html", { overwrite: true })
console.log('overwrite dist\index.html to Production pct\index.html')

// copy dir
fs.copySync("D:\\PCT_Admin\\pct_admin_app\\vue-light-bootstrap-dashboard\\dist\\static", "D:\\PCT_Prod\\pct\\static")
console.log('copy dist\static dir to Production \static directory')


