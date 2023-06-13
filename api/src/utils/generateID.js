function generateID() {
    var id = 'xxxxxxxx-xxxxxxxx'.replace(/[xy]/g, function (c) {
        return Math.ceil(Math.random() * 16).toString(16)
    })

    return id
}

module.exports = generateID