import { Router } from "express";
const router = Router();
import * as serviciosCtrl from "../controllers/servicios.controller";

router.get("/servicios", serviciosCtrl.getServicios);

router.get("/servicios/:id", serviciosCtrl.getServicio);

router.post("/servicios", serviciosCtrl.postServicio);

router.put("/servicios/:id", serviciosCtrl.updateServicio);

router.delete("/servicios/:id", serviciosCtrl.deleteServicio);

export default router;