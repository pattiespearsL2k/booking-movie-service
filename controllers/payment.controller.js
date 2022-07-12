const {
    getPayments,
} = require('../services');


// const createNewPayment = async (req, res) => {
//     try {
//         const payment = req.body;
//         const user= req.user;
//         payment.userAcount = user.username;
//         await createPayment(payment);
//         return res.status(200).send('Thanh toán thành công!');
//     }catch(err){
//         console.log(err);
//         return res.status(400).json(err);
//     }
// }

const getListPayment = async(req, res) => {
    try {
        const list = await getPayments();
        return res.status(200).json(list);
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

module.exports = {
    getListPayment
}