let tests = [];

let basicJson = {
  string: "string",
  bool: true,
  number: 5,
  array: [1, "2"],
  obj: { ja: "ja", ok: 5, e: ["0", 2, 5] }
};

let t = {
  name: "simpleMath",
  type: "equal",
  path: "?uid=g7cJlONn6DfNcM6yXwPKpc1C5ul2&pid=tests&func=simple-math",
  response: "4"
};
tests.push(t);

t = {
  name: "query",
  type: "objEqual",
  path:
    "?uid=PFVYvJMugsVndmMtcSWj3Rlo2Tz2&pid=examples&func=get-url-params&number=99",
  response: { status: "ok", data: { result: 198 } }
};
tests.push(t);

t = {
  name: "post-undef-json",
  type: "objEqual",
  method: "post",
  path:
    "?uid=PFVYvJMugsVndmMtcSWj3Rlo2Tz2&pid=examples&func=posted-json-example",
  response: { status: "ok", data: { postedJson: {} } }
};
tests.push(t);

t = {
  name: "post-empty-json",
  type: "objEqual",
  method: "post",
  data: {},
  path:
    "?uid=PFVYvJMugsVndmMtcSWj3Rlo2Tz2&pid=examples&func=posted-json-example",
  response: { status: "ok", data: { postedJson: {} } }
};
tests.push(t);

t = {
  name: "post-simple-json",
  type: "objEqual",
  method: "post",
  data: basicJson,
  path:
    "?uid=PFVYvJMugsVndmMtcSWj3Rlo2Tz2&pid=examples&func=posted-json-example",
  response: {
    status: "ok",
    data: {
      postedJson: basicJson
    }
  }
};
tests.push(t);

t = {
  name: "create-nocb",
  type: "objEqual",
  method: "post",
  data: basicJson,
  op: resp => {
    resp = Object.assign({}, resp);
    delete resp.data.item.time;
    delete resp.data.item.id;
    return resp;
  },
  path: "?uid=g7cJlONn6DfNcM6yXwPKpc1C5ul2&pid=tests&func=db-create-nocb",
  response: {
    status: "ok",
    data: {
      item: basicJson
    }
  }
};
tests.push(t);

t = {
  name: "create-cb",
  type: "objEqual",
  method: "post",
  data: basicJson,
  op: resp => {
    resp = Object.assign({}, resp);
    delete resp.time;
    delete resp.id;
    return resp;
  },
  path: "?uid=g7cJlONn6DfNcM6yXwPKpc1C5ul2&pid=tests&func=db-create-cb",
  response: basicJson
};
tests.push(t);

t = {
  name: "basic-db-read-nocb",
  type: "objEqual",
  path: "?uid=g7cJlONn6DfNcM6yXwPKpc1C5ul2&pid=tests&func=simple-read",
  response: {
    status: "ok",
    data: {
      item: {
        time: "2019-03-20T19:41:41.292Z",
        id: "M4YGYI3ou3xujp4PKeTH",
        number: 5,
        array: [1, "2"],
        obj: { ok: 5, ja: "ja", e: ["0", 2, 5] },
        bool: true,
        string: "string"
      }
    }
  }
};
tests.push(t);

t = {
  name: "db-read-cb",
  type: "objEqual",
  path: "?uid=g7cJlONn6DfNcM6yXwPKpc1C5ul2&pid=tests&func=db-read-cb",
  response: {
    status: "error",
    data: {
      obj: { ok: 5, ja: "ja", e: ["0", 2, 5] },
      bool: true,
      string: "string",
      time: "2019-03-20T19:41:41.292Z",
      id: "M4YGYI3ou3xujp4PKeTH",
      number: 5,
      array: [1, "2"]
    }
  }
};
tests.push(t);

t = {
  name: "db-list-and-sort",
  type: "objEqual",
  path: "?uid=g7cJlONn6DfNcM6yXwPKpc1C5ul2&pid=tests&func=db-list-and-sort",
  response: {
    status: "ok",
    data: {
      pageToken: "uMSMwqMraWob5ViiTUIO",
      items: [
        { time: "2019-03-20T19:21:48.941Z", id: "iUhThgzq5fj9IkmMuWAi" },
        {
          time: "2019-03-20T19:25:40.602Z",
          id: "uMSMwqMraWob5ViiTUIO",
          number: 5,
          array: [1, "2", 3],
          obj: { ok: 5, ja: "ja" },
          bool: true,
          string: "string"
        }
      ]
    }
  }
};
tests.push(t);

t = {
  name: "db-next-page",
  type: "objEqual",
  path: "?uid=g7cJlONn6DfNcM6yXwPKpc1C5ul2&pid=tests&func=db-next-page",
  response: {
    pageToken: "Ftcl1c07PvQaptVvUmgP",
    items: [
      {
        time: "2019-03-20T19:25:51.979Z",
        id: "7Yf2Ow2t7SmzSKzpGcea",
        number: 5,
        array: [1, "2", 3],
        obj: { ok: 5, ja: "ja" },
        bool: true,
        string: "string"
      },
      {
        string: "string",
        time: "2019-03-20T19:27:03.095Z",
        id: "Ftcl1c07PvQaptVvUmgP",
        number: 5,
        array: [1, "2", 3],
        obj: { ok: 5, ja: "ja" },
        bool: true
      }
    ]
  }
};
tests.push(t);

t = {
  name: "res-send-string",
  type: "equal",
  path: "?uid=g7cJlONn6DfNcM6yXwPKpc1C5ul2&pid=tests&func=send-string",
  response: "hi!"
};
tests.push(t);

t = {
  name: "simple-send-ok",
  type: "objEqual",
  path: "?uid=g7cJlONn6DfNcM6yXwPKpc1C5ul2&pid=tests&func=simple-res-ok",
  response: { status: "ok", data: { password: "swordfish" } }
};
tests.push(t);

t = {
  name: "illegal-bucket",
  type: "objEqual",
  path: "?uid=g7cJlONn6DfNcM6yXwPKpc1C5ul2&pid=tests&func=illegal-bucket",
  response: { status: "error", data: { text: "Illegal bucket" } }
};
tests.push(t);

t = {
  name: "item-not-found",
  type: "objEqual",
  path: "?uid=g7cJlONn6DfNcM6yXwPKpc1C5ul2&pid=tests&func=i-not-found",
  response: { status: "error", data: { text: "Error getting item" } }
};
tests.push(t);

module.exports = tests;

/*
t = {
  name: "",
  type: "objEqual",
  method: "",
  debug: true,
  data: basicJson,
  op: resp => {
    return resp;
  },
  path: "",
  response: {}
};
tests.push(t);
*/
