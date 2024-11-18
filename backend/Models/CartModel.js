import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            _id: false
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true });

cartSchema.pre('save', function (next) {
    this.totalPrice = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    next();
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;


// import mongoose from 'mongoose'

// const cartSchema = mongoose.Schema({
//     user_id:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'User',
//         required:true
//     },
//     items:[
//         {
//             product_id:{
//                 type:mongoose.Schema.Types.ObjectId,
//                 ref:'Products',
//                 required: true
//             },
//             quantity:{
//                 type:Number,
//                 required:true
//             },
//             price: {
//                 type:Number,
//                 required:true,
//             },
//             _id:false
//         }
//     ],
//     totalPrice:{
//         type:Number,
//         required:true
//     }
// },{ timestamps:true })

// cartSchema.pre("save",function(next){
//     this.totalPrice = this.items.reduce((acc, item) => {
//         return acc + item.price;
//       }, 0);
    
//       this.updatedAt = Date.now();
//       next();
// });

// const Cart = mongoose.model('Cart',cartSchema)
// export default Cart
