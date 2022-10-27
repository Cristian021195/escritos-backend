function validate(val){
    if(val===process.env.ADD_KEY){
        return true;
    }else{
        return false;
    }
}
module.exports = {
    validate
}