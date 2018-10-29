module.exports = {
   /* plugins: [
        require('precss'),
        require('postcss-cssnext')
    ]*/
    plugins: {
        autoprefixer: {
            browsers: ['last 7 iOS versions', 'last 3 versions', '> 1%']
        }
    }

};
/*module.exports = {
    plugins: [
        require('precss'),
        require('autoprefixer')
    ]
};*/
/*
module.exports = {
    parser: 'sugarss',
    plugins: {
        'postcss-import': {},
        'postcss-cssnext': {},
        'cssnano': {}
    }
}*/
