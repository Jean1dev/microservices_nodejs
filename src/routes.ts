import * as express from 'express'
import  WhatsAppController  from './rest/WhatsAppController';
import  EmpresaController  from './rest/EmpresaController';
import  UserController  from './rest/UserController';
import  PostController  from './rest/PostController';
import  ScheduleController  from './rest/ScheduleController';
import  PagSeguroController  from './rest/PagSeguroController';
import  TempController  from './rest/TempController';
import SMSController from './rest/SMSController'
import * as path from 'path'
import  DriveController  from './rest/DriveController';

const router = express.Router()
// URI/ON    -> RETORNA SE A API ESTA ONLINE
router.get('/on', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.json({ status: 'ON'})
})

router.use(express.static(__dirname + '/public'))
router.use('/app', (req, res) => {
    res.sendFile('app.html', { root: path.join(__dirname, './public/app')})
})
router.use('/rest/drive', DriveController)
router.use('/rest/sms', SMSController)
router.use('/rest/whats', WhatsAppController)
router.use('/rest/empresa', EmpresaController)
router.use('/rest/user', UserController)
router.use('/rest/post', PostController) //
router.use('/rest/schedule', ScheduleController) //
router.use('/rest/pagseguro', PagSeguroController)
router.use('/', TempController) //

module.exports = router

