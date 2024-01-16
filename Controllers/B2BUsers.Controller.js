import { B2BUser } from "../Models/B2BUsers.Model.js";

// smsService.js


const sendOtpSMS = async (mobileNumber, otp) => {
  const apiKey = 'mk9FmduXikm530fTCyirdg';
  const message = `Your One Time Password is: ${otp}. Thanks SMSINDIAHUB`;

  const url = "http://cloud.smsindiahub.in/vendorsms/pushsms.aspx";
  const params = {
    APIKey: apiKey,
    msisdn: `91${mobileNumber}`,
    sid: 'AREPLY',
    msg: message,
    fl: 0,
    gwid: 2
  };

  const apiUrl = `${url}?${new URLSearchParams(params).toString()}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // You may need to adjust the condition based on the actual response format
    if (data.status === 'success') {
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

  try {
    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Save OTP to user document in MongoDB
    const user = await B2BUser.findOneAndUpdate({ mobile: mobile_number }, { $set: { otp } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Trigger SMS sending
    const smsResponse = await sendOtpSMS(mobile_number, otp);

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
      return res.status(404).json({ message: 'User not found' });
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

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new user
export const createB2BUser = async (req, res) => {
  try {
    console.log("Creating  b2b user...",req.files);
    const images = req.files || [];
    const newUser = req.body;
    const AdharData = req.body.adharData;
    const sub_category_Data = req.body.sub_category;
    const Adhar = JSON.parse(AdharData)
    const sub_category = JSON.parse(sub_category_Data)
    newUser.adharData = Adhar
    newUser.images = images.map(file => ({
      filename: file.filename,
      path: file.path
  }));

  newUser.sub_category = sub_category

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


export const addB2BSubcategory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, price, unit } = req.body;

    if (!userId || !name || !price || !unit) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await B2BUser.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add new subcategory to the array
    user.sub_category.push({ name, price, unit });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding subcategory' });
  }
};

export const updateB2BSubcategoryByIndex = async (req, res) => {
  try {
    const { userId, subcategoryIndex } = req.params;
    const { name, price, unit } = req.body;

    if (!userId || !subcategoryIndex || !name || !price || !unit) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await B2BUser.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (subcategoryIndex < 0 || subcategoryIndex >= user.sub_category.length) {
      return res.status(400).json({ error: 'Invalid subcategory index' });
    }

    // Update subcategory fields based on the index
    const subcategory = user.sub_category[subcategoryIndex];
    subcategory.name = name;
    subcategory.price = price;
    subcategory.unit = unit;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating subcategory' });
  }
};

export const deleteB2BSubcategoryByIndex = async (req, res) => {
  try {
    const { userId, subcategoryIndex } = req.params;

    if (!userId || !subcategoryIndex) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await B2BUser.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (subcategoryIndex < 0 || subcategoryIndex >= user.sub_category.length) {
      return res.status(400).json({ error: 'Invalid subcategory index' });
    }

    // Remove subcategory based on the index
    user.sub_category.splice(subcategoryIndex, 1);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting subcategory' });
  }
};


export const updateB2BCategory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { category } = req.body;

    if (!userId || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await B2BUser.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update category
    user.category = category;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating category' });
  }
};