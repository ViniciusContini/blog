module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'blog',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
