const User = require("../../Models/User");
const axios = require("axios");

const assign = async (req, res, next) => {
    const { userToken } = req.body;
    console.log(userToken);
    const { data: UserData } = await axios.get(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    const user = await User.findOne({ email: UserData.email });
    if(user.pal) {
        return res.json({
            pal: `${user.pal}`
        });
    }
    console.log(User.count());
    const random = Math.floor(Math.random * User.count());
    const pal = await User.findOne({ pal: null }).skip(random)
    user.pal = pal;
    pal.pal = user;
    await user.save();
    await pal.save();

    return res.json({
        pal: pal
    });
};

const post = async (req, res, next) => {
    const { userToken, post } = req.body;
    console.log("DOING")
    const { data: UserData } = await axios.get(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    const user = await User.findOne({ email: UserData.email });
    if(!user.palPost) {
        user.palPost = post;
        await user.save();
    }
    return res.json({
      message: 'Done'
    })
}

const getPalsPost = async (req, res, next) => {
    const { userToken } = req.body;
    const { data: UserData } = await axios.get(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    const user = await User.findOne({ email: UserData.email });
    const pal = await User.findById(user.pal);
    return res.json({
      pal
    });
}

module.exports = {
    assign,
    post,
    getPalsPost
};

// 090F2E