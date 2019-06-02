import * as fs from 'fs'
import { getTimeNow } from './utils';

export const geraLog = (content) => {
    let dir = `./logs`
    let arq_name = `/log_${getTimeNow()}.txt`
    console.log(getTimeNow())
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    content = `\n====================================================================\n${content}`
    //fs.writeFile(`${dir}${arq_name}`, content, (err) => {})
    fs.appendFile(`${dir}${arq_name}`, content, (err) => {})
}

//geraLog(`oi cara de boi`)