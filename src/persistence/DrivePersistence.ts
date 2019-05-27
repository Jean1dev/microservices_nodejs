const Drive = require('../models/DriveModel')
const File = require('../models/FilesModel')

export const store = content => {
    Drive.create(content)
}

export const getAllByTitle = async (title: any) => {
    return await Drive.find({ title }).populate({ path: 'files', options: {sort: { createdAt: -1 }}})
}

export const storeFile = async file_info => {
    const drive = await Drive.find({ title: file_info.title })
    const file = await File.create({
        title: file_info.name,
        path: file_info.path
    })

    drive[0].files.push(file)
    await drive[0].save()
}

/*
class DriveController {

    public store(content: any) {
        Drive.create(content)
    }
}

module.exports = new DriveController()
*/