const path = require('path');
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');
global.__basedir = __dirname + "/";
// Setting the directory where the template files are located
app.use('/uploads', express.static('uploads')).set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use(bodyParser.json())
app.use(session({
  secret: 'technogazwersecret', // Secret key to sign session ID cookie
  resave: false,
  saveUninitialized: false,
}));

const UsersRouter = require('./routers/UsersRouter');
const AuthRouter =require('./routers/AuthRouter');
const SaleTeamRouter = require('./routers/SaleTeamRouter');
const TelecallerTeamRouter = require('./routers/TelecallerTeamRouter');
const RoleRouter = require('./routers/RoleRouter');
const UserPermissionDepartmentRouter = require('./routers/UserPermissionRouter');
const FrontdeskRouter =require('./routers/FrontDeskRouter');
const CoursesRouter = require('./routers/CoursesRouter')
const CounselorDepartmentRouter = require('./routers/CounselorDepartmentRouter')
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static('public'));

app.use('/api', UsersRouter);
app.use('/api', AuthRouter)
app.use('/api', SaleTeamRouter)
app.use('/api', TelecallerTeamRouter)
app.use('/api', RoleRouter)
app.use('/api', UserPermissionDepartmentRouter)
app.use('/api', CoursesRouter )
app.use('/api', FrontdeskRouter )
app.use('/api', CounselorDepartmentRouter )
const PORT = 3000
//Starting a server
app.listen(PORT, async () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
  try {
      console.log('DATABASE SYNCED!');
  } catch (error) {
      console.log(error);
  }
})