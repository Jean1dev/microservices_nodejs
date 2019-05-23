const Drive = require('../models/DriveModel')

export const store = content => {
    Drive.create(content)
}

export const getAllByTitle = async title => {
    return await Drive.find({ title }).populate({ path: 'files', options: {sort: { createdAt: -1 }}})
}

class DriveController {

    public store(content: any) {
        Drive.create(content)
    }
}

module.exports = new DriveController()