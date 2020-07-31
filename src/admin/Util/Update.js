export const updateState = (field,update,value) => {
    update(prevState => {
        return {
            ...prevState,
            [field]: value
        }
    })
}