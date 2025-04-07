export default {
  home: async (req, res) => {
    res.status(200).json({
      message: 'Welcome to the ECF Genshin API',
    });
  },
};
