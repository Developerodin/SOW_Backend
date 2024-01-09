import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        maxlength: [20, 'Username must be less than or equal to 10 characters.']
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        // required: [true, 'Please provide your email'],
        // unique: true,
        // validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        // required: [false, 'Please provide a password'],
        // minlength: 8
    },
    mobile: {
        type: String,
        required: [true, 'Please provide a mobile number'],
        minlength: 10
    },
    dob: {
        type: String,
        required: [true, 'Please provide  data of birth'],
        
    },
    Address:{
        type: String,
        required: [true, 'Please provide  address'],
    },
    city: {
        type: String,
        required: [true, 'A user must have a city'],
        
    },
    pincode: {
        type: String,
        required: [true, 'A user must have a pincode'],
        
    },
    country: {
        type: String,
        required: [true, 'A user must have a country'],
        
    },
    registerAs: {
        type: String,
        required: [true, 'A user must have a registerAs'],
        
    },
    panNo: {
        type: String,
        required: [true, 'A user must have a panNo'],
        
    },
    adharData: {
        type: Object,
        required: [true, 'A user must have a adharData'],
        
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    status: {
        type: Boolean,
        default: true,
      },
    active: {
        type: Boolean,
        default: false,
    },
    images: [{
        filename: String, // Store the filename of the image
        path: String,     // Store the path to the image in the media folder
    }],
    category: {
        type:String,
        required: true,
      },
    sub_category:[{
          name: String, 
          price: String,
          unit:String 
      }],
    
},
    {
        timestamps: {
        }
    });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});
/**
 * Reset Password
 */
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime());
        return JWTTimestamp < changedTimestamp;
    }
    // False means Not Changed
    return false;
}



export const B2BUser = mongoose.model('BusinessUsers', userSchema);