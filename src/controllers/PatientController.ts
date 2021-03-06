import { Request, Response, NextFunction } from "express";
import Patient from "../models/Patient";

class PatientController {
  /**
   * GET /patient
   * Get all the patients
   */
  static async getPatients(req: Request, res: Response, next: NextFunction) {
    try {
      const patients = await Patient.find().select("_id firstName lastName");
      return res.json({
        patients
      });
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}

export default PatientController;
