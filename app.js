var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


//// dari edson
const mongoose  = require('mongoose')
const port = 4001
const authRoutes = require('./src/router/auth')
const products = require('./src/router/products')
const bodyParser = require('body-parser')
const multer = require('multer')


app.use(bodyParser.json()) // type json yang nantinya akan diterima



const fileStorage = multer.diskStorage({
  //destination: lokasi filenya
  destination: (req, file, cb)=>{
      // cb(null, './images'); // paramater pertama = errornya tidak ada, paramater ke2 : lokasi/folder filenya
      cb(null, 'images'); // paramater pertama = errornya tidak ada, paramater ke2 : lokasi/folder filenya
  },
  //filename: format penamaan file yang akan kita tentukan didalam folder image
  filename:(req, file, cb)=>{
      cb(null, new Date().getTime() + '-' + file.originalname) //file.originalname = nama asli file yang dikirimkan ke kita
      // cb(null, file.originalname) //file.originalname = nama asli file yang dikirimkan ke kita
  }
})

const fileFilter = (req, file, cb) =>{
  if(
     file.mimetype === 'image/png' || 
     file.mimetype === 'image/jpg' || 
     file.mimetype === 'image/jpeg'
  //    ||file.mimetype === 'video/mp4'
    ){
      cb(null, true); // kita menerima file tersebut
  } else{
      cb(null, false); // jika tidak sesuai kita tidak menerima file tersebut
  }
}

app.use(bodyParser.json()) // type json yang nantinya akan diterima
app.use('/images', express.static(path.join(__dirname, 'images'))) // setiap kali ada pemanggilan terhadap /image, maka akan disediakan URL statik agar folder image bisa dipanggil
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image')) // single: pengiriman bertipe single dan body yang dikirim harus image


//// dari edson




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

///// === > ROUTES PROJECT


//home
// app.use('/', (req, res, next) => {
//   res.json({ title: ' halo Express' });
// });

//authentication
app.use('/v1/auth', authRoutes)

//product
app.use('/v1/auth', products)


///// === > ROUTES PROJECT



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


app.use((error, req, res, next)=>{
  //midleware ini adalah tempat untuk menampung respon error yang dikirimkan dari midleware yang lain
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({message: message, data: data})
})


mongoose.connect('mongodb+srv://kelompok5:kelompok5@cluster0.pl36s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(()=>{
    app.listen(port, ()=>console.log(`Conection Success from port ${port}`));
})
.catch(err=> console.log("error:",err))

module.exports = app;
