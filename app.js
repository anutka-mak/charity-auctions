const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const { Bids, Product } = require('./models/sellersProducts');
const fileUpload = require('express-fileupload');
const app = express();
// Налаштування шляху до статичних файлів
app.use(express.static(path.join(__dirname, 'public')));

// Налаштування шаблонізатора EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Мідлвари для реєстрації логування, парсингу JSON та обробки кукі
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Роутери
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Роутер для перевірки пароля
app.post('/check-password', (req, res) => {
  const { password } = req.body;

  // Перевірка пароля
  if (password === '1234') {
    res.json({ authenticated: true });
  } else {
    res.json({ authenticated: false });
  }
});

// Роутер для збереження заявки
app.post('/bids', function(req, res, next) {
  // Отримання даних з тіла запиту
  const { name, contact, price, productId } = req.body;

  // Приклад збереження в базі даних
  const bid = new Bids({ name, contact, price, productId });
  bid.save()
    .then(() => {
      res.status(200).json({ message: 'Bid saved successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Обробка помилки 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Обробка помилок сервера
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Запуск сервера
app.listen(4000, () => {
  console.log('Server started on port 4000');
});

module.exports = app;
