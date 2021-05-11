import 'colors'
import axios from 'axios'
import jsonfile from 'jsonfile'

const BASE_URL = 'https://api.clubhouse.io/api/v3'
const gettedToken = '609a9aa8-7519-4498-b596-6852da0829ab'

const args = process.argv
const oIndex = args.indexOf('-o')
let fileName = 'exported.file'
let projectNames = []


if (oIndex !== -1) {
  fileName = args[oIndex + 1]
} 

if (args.indexOf('-p') !== -1) {
  args.forEach((a, i) => a === '-p' ? projectNames.push(args[i+1]) : null)
} 


axios.defaults.headers.common['Clubhouse-Token'] = gettedToken
axios.get(`${BASE_URL}/projects`)
.then(function (response) {
  const projects = response.data.filter(p => projectNames.includes(p.name))
  jsonfile.writeFile(`${fileName}.json`, projects)
  console.log(`${fileName}.json`.green, 'okey'.green)
})


/**
 * node index.js -p proj1 -p proj2 -o fileName
 * 
 */