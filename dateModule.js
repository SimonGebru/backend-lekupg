function getCurrentDate(){
    const today = new Date();
    return today.toLocaleDateString();
}
module.exports = getCurrentDate;