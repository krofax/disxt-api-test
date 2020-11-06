import app from "./app";
import config from './config/env'
let PORT = config.port;
app.listen(PORT, () => console.log(`app up and running on ${PORT}`));
