import axios from "axios";
import { B2BUser } from "../Models/B2BUsers.Model.js";

// smsService.js


const sendOtpSMS = async (mobileNumber, otp) => {

  console.log("send otp ==>",mobileNumber,otp);
  const authorization = 'fXeO8yi0IF29xhjVN5LTB6slYdRrEkSJv3ZtWcMHaoqbPDuAUmLuihz0I8CkVM34y7KJxEeGlFBsSvQt';
  const route = `otp`;
  const variablesValues = otp;
  const flash = '0';

  const url = 'https://www.fast2sms.com/dev/bulkV2';

  const params = {
    authorization,
    route,
    variables_values: variablesValues,
    flash,
    numbers: `${mobileNumber}`, // Assuming the mobile number should include the country code (e.g., +91 for India)
  };

  try {
    const response = await axios.get(url, { params });

    // You may need to adjust the condition based on the actual response format
    if (response.data.return === true) {
      return { success: true };
    } else {
      return { success: false, error: 'Failed to send SMS' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Internal server error' };
  }
};


export const generateOTPController = async (req, res) => {
  const { mobile_number } = req.body;
  console.log("mobile", mobile_number)
  try {
    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Save OTP to user document in MongoDB
    const user = await B2BUser.findOneAndUpdate({ mobile: mobile_number }, { $set: { otp } },{ new: true });
      //  console.log("user get otp", user)
    if (!user) {
      return res.status(200).json({ message: 'User not found' });
    }

    // Trigger SMS sending
    const smsResponse = await sendOtpSMS(mobile_number, otp);
      console.log("Sms Resposne ===>",smsResponse)
    if (smsResponse.success) {
      console.log("Otp send successfull")
      res.status(200).json({ message: 'OTP sent successfully!' });
    } else {
      console.log("Otp send erros")
      res.status(500).json({ message: 'Failed to send OTP via SMS' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginWithOTPController = async (req, res) => {
  const { mobile_number, otp } = req.body;

  try {
    // Check if the user with the provided mobile number exists
    const user = await B2BUser.findOne({ mobile: mobile_number });
   console.log("User login ==>",user)
    if (!user) {
      return res.status(200).json({ message: 'User not found' });
    }

    // Validate OTP
    if (user.otp !== otp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    // Clear the OTP after successful validation
    user.otp = undefined;
    await user.save();

    // Optionally, you may generate a JWT token for authentication
    // and send it back to the client

    res.status(200).json({ message: 'Login successful',
       data : user
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new user
export const createB2BUser = async (req, res) => {
  try {
    console.log("Creating  b2b user...", req.files);
    const images = req.files || [];
    const newUser = req.body;
    const adharData = req.body.adharData;
    const categoriesData = req.body.categories;

    const adhar = JSON.parse(adharData);
    const categories = JSON.parse(categoriesData);

    newUser.adharData = adhar;
    newUser.images = images.map((file) => ({
      filename: file.filename,
      path: file.path,
    }));

    newUser.categories = categories;

    console.log("new User in b2b", newUser);
    const savedUser = await B2BUser.create(newUser);
    res.status(201).json(savedUser);
  } catch (error) {
    console.log("Error in b2b", error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Get all users
export const getB2BUsers = async (req, res) => {
  try {
    const users = await B2BUser.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Get a specific user by ID
export const getB2BUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await B2BUser.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user by ID' });
  }
};

// Update a user
export const updateB2BUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await B2BUser.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

// Delete a user
export const deleteB2BUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await B2BUser.findByIdAndDelete(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};


// export const addB2BSubcategory = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { name, price, unit } = req.body;

//     if (!userId || !name || !price || !unit) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const user = await B2BUser.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Add new subcategory to the array
//     user.sub_category.push({ name, price, unit });
//     await user.save();

//     res.status(201).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error adding subcategory' });
//   }
// };

export const addB2BSubcategory = async (req, res) => {
  try {
    // Extract category ID from request parameters
    const categoryId = req.params.categoryId;

    // Find the user by category ID
    const user = await B2BUser.findOne({ 'categories._id': categoryId });

    // Check if the user and category exist
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User or category not found',
      });
    }

    // Find the index of the category in the user's categories array
    const categoryIndex = user.categories.findIndex(category => category._id == categoryId);

    // Check if the category index is valid
    if (categoryIndex === -1) {
      return res.status(404).json({
        status: 'fail',
        message: 'Category not found',
      });
    }

    // Extract subcategory data from the request body
    const { name, price, unit } = req.body;

    // Create a new subcategory object
    const newSubcategory = {
      name,
      price,
      unit,
    };

    // Add the subcategory to the category
    user.categories[categoryIndex].sub_category.push(newSubcategory);

    // Save the user with the updated subcategory
    await user.save();

    // Send the response
    res.status(201).json({
      status: 'success',
      message: 'Subcategory added successfully',
      data: newSubcategory,
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

// export const updateB2BSubcategoryByIndex = async (req, res) => {
//   try {
//     const { userId, subcategoryIndex } = req.params;
//     const { name, price, unit } = req.body;

//     if (!userId || !subcategoryIndex || !name || !price || !unit) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const user = await B2BUser.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     if (subcategoryIndex < 0 || subcategoryIndex >= user.sub_category.length) {
//       return res.status(400).json({ error: 'Invalid subcategory index' });
//     }

//     // Update subcategory fields based on the index
//     const subcategory = user.sub_category[subcategoryIndex];
//     subcategory.name = name;
//     subcategory.price = price;
//     subcategory.unit = unit;

//     await user.save();

//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error updating subcategory' });
//   }
// };

export const updateB2BSubcategoryByIndex = async (req, res) => {
  try {
    // Extract category ID and subcategory ID from request parameters
    const categoryId = req.params.categoryId;
    const subcategoryId = req.params.subcategoryId;

    // Find the user by category ID
    const user = await B2BUser.findOne({ 'categories._id': categoryId });

    // Check if the user and category exist
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User or category not found',
      });
    }

    // Find the index of the category in the user's categories array
    const categoryIndex = user.categories.findIndex(category => category._id == categoryId);

    // Check if the category index is valid
    if (categoryIndex === -1) {
      return res.status(404).json({
        status: 'fail',
        message: 'Category not found',
      });
    }

    // Find the index of the subcategory in the category's sub_category array
    const subcategoryIndex = user.categories[categoryIndex].sub_category.findIndex(subCategory => subCategory._id == subcategoryId);

    // Check if the subcategory index is valid
    if (subcategoryIndex === -1) {
      return res.status(404).json({
        status: 'fail',
        message: 'Subcategory not found',
      });
    }

    // Extract updated subcategory data from the request body
    const { name, price, unit } = req.body;

    // Update the subcategory with the new data
    user.categories[categoryIndex].sub_category[subcategoryIndex].name = name || user.categories[categoryIndex].sub_category[subcategoryIndex].name;
    user.categories[categoryIndex].sub_category[subcategoryIndex].price = price || user.categories[categoryIndex].sub_category[subcategoryIndex].price;
    user.categories[categoryIndex].sub_category[subcategoryIndex].unit = unit || user.categories[categoryIndex].sub_category[subcategoryIndex].unit;

    // Save the user with the updated subcategory
    await user.save();

    // Send the response
    res.status(200).json({
      status: 'success',
      message: 'Subcategory updated successfully',
      data: user.categories[categoryIndex].sub_category[subcategoryIndex],
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export const deleteB2BSubcategoryByIndex = async (req, res) => {
  try {
    // Extract category ID and subcategory ID from request parameters
    const categoryId = req.params.categoryId;
    const subcategoryId = req.params.subcategoryId;

    // Find the user by category ID
    const user = await B2BUser.findOne({ 'categories._id': categoryId });

    // Check if the user and category exist
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User or category not found',
      });
    }

    // Find the index of the category in the user's categories array
    const categoryIndex = user.categories.findIndex(category => category._id == categoryId);

    // Check if the category index is valid
    if (categoryIndex === -1) {
      return res.status(404).json({
        status: 'fail',
        message: 'Category not found',
      });
    }

    // Find the index of the subcategory in the category's sub_category array
    const subcategoryIndex = user.categories[categoryIndex].sub_category.findIndex(subCategory => subCategory._id == subcategoryId);

    // Check if the subcategory index is valid
    if (subcategoryIndex === -1) {
      return res.status(404).json({
        status: 'fail',
        message: 'Subcategory not found',
      });
    }

    // Remove the subcategory from the array
    user.categories[categoryIndex].sub_category.splice(subcategoryIndex, 1);

    // Save the user with the updated subcategory
    await user.save();

    // Send the response
    res.status(204).json({
      status: 'success',
      message: 'Subcategory deleted successfully',
      data: null,
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};


export const updateB2BCategory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { categories } = req.body;

    if (!userId || !categories) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await B2BUser.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update categories
    user.categories = categories;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating categories' });
  }
};


export const getUserCategoryAndSubcategory = async (req, res, next) => {
  try {
    // Extract user ID from request parameters or headers
    const userId = req.params.userId; // Replace 'userId' with the actual parameter or header name

    // Find user by ID
    const user = await B2BUser.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    // Extract categories from the user object
    const categories = user.categories || [];

    // Send the categories in the response
    res.status(200).json({
      status: 'success',
      data: {
        categories,
      },
    });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};


export const addCategories = async (req, res) => {
  try {
      const userId = req.params.userId; // Assuming userId is in the route parameters
      const { Data } = req.body;
       const categoryData = JSON.parse(Data)
      // Find the user by userId
      const user = await B2BUser.findById(userId);

      if (!user) {
          return res.status(404).json({
              success: false,
              message: 'User not found',
          });
      }

      // Add the new categories to the categories array
      user.categories.push(...categoryData);

      // Save the updated user object
      await user.save();

      return res.status(200).json({
          success: true,
          message: 'Categories added successfully',
      });
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: error.message,
      });
  }
};


export const deleteCategory = async (req, res) => {
  try {
      const userId = req.params.userId; // Assuming userId is in the route parameters
      const categoryId = req.params.categoryId; // Assuming categoryId is in the route parameters

      // Find the user by userId
      const user = await B2BUser.findById(userId);

      if (!user) {
          return res.status(404).json({
              success: false,
              message: 'User not found',
          });
      }

      // Find the index of the category in the categories array
      const categoryIndex = user.categories.findIndex(category => category._id == categoryId);

      if (categoryIndex === -1) {
          return res.status(404).json({
              success: false,
              message: 'Category not found',
          });
      }

      // Remove the category from the categories array
      user.categories.splice(categoryIndex, 1);

      // Save the updated user object
      await user.save();

      return res.status(200).json({
          success: true,
          message: 'Category deleted successfully',
      });
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: error.message,
      });
  }
};