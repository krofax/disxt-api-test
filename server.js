const app = require("./app");
const config = require('./config/env')
let PORT = config.port;
app.listen(PORT, () => console.log(`app up and running on ${PORT}`));
