import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

import express from "express";
import data from "../db.json" with { type: "json" };
const router = express.Router();

import getPaginacao from "./../utils/pager.js";

const db = new Low(new JSONFile("db.devices.json"), data);
await db.write();

router.get("/", (req, res) => {
  let data = db.data;
  if (req.query.filtro && req.query.campos) {
    const campos = req.query.campos.split(",");
    const filtro = req.query.filtro;
    let ret = [];

    for (let coluna of campos) {
      const dadosFiltrados = data.filter(device => {
        return device[`${coluna}`].toLowerCase().includes(filtro.toLowerCase());
      });

      if (Object.keys(dadosFiltrados).length > 0) {
        ret = [...ret, ...dadosFiltrados];
      }
    }

    data = ret;
  }

  if (req.query.sort) {
    const ordem = req.query.ordem ?? "desc";

    if (ordem === "desc") {
      data.sort((a, b) => (a[req.query.sort] > b[req.query.sort] ? 1 : -1));
    } else {
      data.sort((a, b) => (a[req.query.sort] > b[req.query.sort] ? -1 : 1));
    }
  }

  if (req.query.pagina && req.query.limite) {
    const paginacao = getPaginacao(data, req.query.pagina, req.query.limite);

    res.json(paginacao);
  } else {
    res.json(data);
  }
});

router.get("/DeviceList", (req, res) => {
  let data = db.data.DeviceList;
  if (req.query.filtro && req.query.campos) {
    const campos = req.query.campos.split(",");
    const filtro = req.query.filtro;
    let ret = [];

    for (let coluna of campos) {
      const dadosFiltrados = data.filter(device => {
        return device[`${coluna}`].toLowerCase().includes(filtro.toLowerCase());
      });

      if (Object.keys(dadosFiltrados).length > 0) {
        ret = [...ret, ...dadosFiltrados];
      }
    }

    data = ret;
  }

  if (req.query.sort) {
    const ordem = req.query.ordem ?? "desc";

    if (ordem === "desc") {
      data.sort((a, b) => (a[req.query.sort] > b[req.query.sort] ? 1 : -1));
    } else {
      data.sort((a, b) => (a[req.query.sort] > b[req.query.sort] ? -1 : 1));
    }
  }

  if (req.query.pagina && req.query.limite) {
    const paginacao = getPaginacao(data, req.query.pagina, req.query.limite);

    res.json(paginacao);
  } else {
    res.json(data);
  }
});

router.get("/Device", (req, res) => {
  let data = db.data.Device;
  if (req.query.filtro && req.query.campos) {
    const campos = req.query.campos.split(",");
    const filtro = req.query.filtro;
    let ret = [];

    for (let coluna of campos) {
      const dadosFiltrados = data.filter(device => {
        return device[`${coluna}`].toLowerCase().includes(filtro.toLowerCase());
      });

      if (Object.keys(dadosFiltrados).length > 0) {
        ret = [...ret, ...dadosFiltrados];
      }
    }

    data = ret;
  }

  if (req.query.sort) {
    const ordem = req.query.ordem ?? "desc";

    if (ordem === "desc") {
      data.sort((a, b) => (a[req.query.sort] > b[req.query.sort] ? 1 : -1));
    } else {
      data.sort((a, b) => (a[req.query.sort] > b[req.query.sort] ? -1 : 1));
    }
  }

  if (req.query.pagina && req.query.limite) {
    const paginacao = getPaginacao(data, req.query.pagina, req.query.limite);

    res.json(paginacao);
  } else {
    res.json(data);
  }
});

router.get("/CommandDescription", (req, res) => {
  let data = db.data.CommandDescription;
  if (req.query.filtro && req.query.campos) {
    const campos = req.query.campos.split(",");
    const filtro = req.query.filtro;
    let ret = [];

    for (let coluna of campos) {
      const dadosFiltrados = data.filter(device => {
        return device[`${coluna}`].toLowerCase().includes(filtro.toLowerCase());
      });

      if (Object.keys(dadosFiltrados).length > 0) {
        ret = [...ret, ...dadosFiltrados];
      }
    }

    data = ret;
  }

  if (req.query.sort) {
    const ordem = req.query.ordem ?? "desc";

    if (ordem === "desc") {
      data.sort((a, b) => (a[req.query.sort] > b[req.query.sort] ? 1 : -1));
    } else {
      data.sort((a, b) => (a[req.query.sort] > b[req.query.sort] ? -1 : 1));
    }
  }

  if (req.query.pagina && req.query.limite) {
    const paginacao = getPaginacao(data, req.query.pagina, req.query.limite);

    res.json(paginacao);
  } else {
    res.json(data);
  }
});

router.get("/Command", (req, res) => {
  let data = db.data.Command;
  if (req.query.filtro && req.query.campos) {
    const campos = req.query.campos.split(",");
    const filtro = req.query.filtro;
    let ret = [];

    for (let coluna of campos) {
      const dadosFiltrados = data.filter(device => {
        return device[`${coluna}`].toLowerCase().includes(filtro.toLowerCase());
      });

      if (Object.keys(dadosFiltrados).length > 0) {
        ret = [...ret, ...dadosFiltrados];
      }
    }

    data = ret;
  }

  if (req.query.sort) {
    const ordem = req.query.ordem ?? "desc";

    if (ordem === "desc") {
      data.sort((a, b) => (a[req.query.sort] > b[req.query.sort] ? 1 : -1));
    } else {
      data.sort((a, b) => (a[req.query.sort] > b[req.query.sort] ? -1 : 1));
    }
  }

  if (req.query.pagina && req.query.limite) {
    const paginacao = getPaginacao(data, req.query.pagina, req.query.limite);

    res.json(paginacao);
  } else {
    res.json(data);
  }
});

router.get("/Parameter", (req, res) => {
  let data = db.data.Parameter;
  if (req.query.filtro && req.query.campos) {
    const campos = req.query.campos.split(",");
    const filtro = req.query.filtro;
    let ret = [];

    for (let coluna of campos) {
      const dadosFiltrados = data.filter(device => {
        return device[`${coluna}`].toLowerCase().includes(filtro.toLowerCase());
      });

      if (Object.keys(dadosFiltrados).length > 0) {
        ret = [...ret, ...dadosFiltrados];
      }
    }

    data = ret;
  }

  if (req.query.sort) {
    const ordem = req.query.ordem ?? "desc";

    if (ordem === "desc") {
      data.sort((a, b) => (a[req.query.sort] > b[req.query.sort] ? 1 : -1));
    } else {
      data.sort((a, b) => (a[req.query.sort] > b[req.query.sort] ? -1 : 1));
    }
  }

  if (req.query.pagina && req.query.limite) {
    const paginacao = getPaginacao(data, req.query.pagina, req.query.limite);

    res.json(paginacao);
  } else {
    res.json(data);
  }
});

router.get("/Device/:id", (req, res) => {
  if (!req.params.id) {
    res.json({
      error: "Não é possível encontrar o registro sem um id.",
    });
  } else {
    const id = req.params.id;
    const { data } = db;

    const result = data.Device.find(x => x.id === id);
    res.json(result);
  }
});

router.post("/Device", (req, res) => {
  if (!req.body || Object.keys(req.body).length < 1) {
    res.json({
      error: "Não é possível criar um novo registro sem os dados.",
    });
  } else {
    const novoRegisto = req.body;
    const result = db.update(({ Device }) => Device.push(novoRegisto));

    res.json({ success: "Ok!", data: result });
  }
});

router.put("/Device/:id", (req, res) => {
  if (!req.body || Object.keys(req.body).length < 1) {
    res.json({
      error: "Não é possível criar um novo registro sem os dados.",
    });
  } else if (!req.params.id) {
    res.json({
      error: "Não é possível atualizar um registro sem um id.",
    });
  } else {
    const id = req.params.id;

    for (var i = 0; i < db.data.Device.length; i++) {
      if (db.data.Device[i].id === id) {
        db.data.Device[i] = req.body;
      }
    }
    res.json({ success: "Ok!", data: db.data });
  }
});

router.delete("/Device/:id", (req, res) => {
  if (!req.params.id) {
    res.json({
      error: "Não é possível remover um registro sem um id.",
    });
  } else {
    const id = req.params.id;

    for (var i = 0; i < db.data.Device.length; i++) {
      if (db.data.Device[i].id === id) {
        db.data.Device.splice(i, 1);
      }
    }
    res.json({ success: "Ok!", data: db.data });
  }
});

export default router;
