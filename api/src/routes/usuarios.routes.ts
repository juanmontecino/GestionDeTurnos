import { Router } from "express";
const router = Router();
import * as usuariosCtrl from "../controllers/usuarios.controller";

router.get("/usuarios", usuariosCtrl.getUsuarios);

router.get("/usuarios/:id", usuariosCtrl.getUsuario);

router.post("/usuarios", usuariosCtrl.postUsuario);

router.put("/usuarios/:id", usuariosCtrl.updateUsuario);

router.delete("/usuarios/:id", usuariosCtrl.deleteUsuario);

export default router;