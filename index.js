const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

// routes
const { get } = require("./routes/get");
const { create } = require("./routes/create");
const { download } = require("./routes/download");
const { deleteRoute } = require("./routes/delete");
const { hook } = require("./routes/hook");

// engines
const { EngineOne } = require("./models/engine-one");
const { EngineTwo } = require("./models/engine-two");
const { EngineThree } = require("./models/engine-three");

const { findLastItem } = require("./utils/find-last-item");

// const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5174",
//   })
// );

const app = express();
app.use(cors());
app.options("*", cors());

const server = http.createServer(app);

///

const dayjs = require("dayjs");
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const downloadDb = require("./utils/download-db");

const onConnection = (socket) => {
  console.log(`connect ${socket.id}`);

  const secret = socket?.handshake?.query?.secret;

  if (secret !== "oneberto") {
    return io.close();
  }

  var itemTimeStamp = {
    0: undefined,
    1: undefined,
    2: undefined,
  };

  const sendSpeed = (Engine, index) => {
    findLastItem(Engine)
      .then((item) => {
        if (!item) {
          return;
        }

        const isDuplicated = itemTimeStamp[index] === item.pk_TimeStamp;

        if (isDuplicated) {
          console.log("DUPLICATED", { index });

          return;
        }

        itemTimeStamp[index] = item.pk_TimeStamp;

        const date = dayjs(item.pk_TimeStamp).format("L");

        socket.emit("speed", {
          data: {
            value: item.Value,
            date,
          },
          index,
        });
      })
      .catch((error) => {
        console.error("ERROR GETTING LAST ITEM", { index, error });
      });
  };

  setInterval(() => {
    //
    downloadDb()
      .then(() => {
        sendSpeed(EngineOne, 0);
        sendSpeed(EngineTwo, 1);
        sendSpeed(EngineThree, 2);
      })
      .catch((err) => console.error("ERROR DOWNLOAD DB", err));
    //

    // sendSpeed(EngineOne, 0);
    // sendSpeed(EngineTwo, 1);
    // sendSpeed(EngineThree, 2);
  }, 1500);

  // socket.on("order:create", createOrder);
  // socket.on("order:read", readOrder);

  socket.on("hey", (...args) => {
    const [body] = args;
    console.log({ body });
  });
};

io.on("connection", onConnection);

///
/// ----------
///

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.get("/get", get);

app.get("/create", create);

app.get("/download", download);

app.get("/delete", deleteRoute);

app.post("/hook", hook);

server.listen(3009, () => {
  console.log("listening on *:3009");
});
