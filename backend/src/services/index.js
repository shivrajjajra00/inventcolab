exports.generateCrudMethods = Model => {
    return {
        getById: id => Model.findById(id),
    }
}