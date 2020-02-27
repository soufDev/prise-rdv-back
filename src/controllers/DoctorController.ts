import {Request, Response, NextFunction} from 'express';
import Doctor from '../models/Doctor';
import mongoose, {Schema, Document} from 'mongoose';
class DoctorController {
  static async patchDoctor(req: Request, res: Response, next: NextFunction) {
    let updateObject = req.body;
    const doctorId = req.params.doctorId;

    Doctor.update(
      {_id: new mongoose.Types.ObjectId(doctorId)},
      {$set: updateObject},
    );
  }

  /**
   * GET /doctor
   * Get all the doctors
   */
  static async getDoctors(req: Request, res: Response, next: NextFunction) {
    try {
      const doctors = await Doctor.find()
        .select('_id firstName lastName phone address')
        .lean();
      return res.json({
        doctors,
      });
    } catch (error) {
      return res.sendStatus(500);
    }
  }
  /**
   * GET /doctor/:phone
   * Get doctor details by phone number
   */
  static async getDoctorByPhone(req: Request, res: Response) {
    const phone = req.params.phone;
    try {
      const doctor = await Doctor.findOne({phone})
        .select(
          '_id firstName lastName phone address unavailablities workingHours sessionDurations reservationType',
        )
        .lean();
      if (doctor) {
        return res.status(200).json({
          doctor,
        });
      } else {
        return res.status(404).json({
          message: 'Doctor not found',
        });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  /**
   * GET /doctor/:saerchValue
   * Get searched Doctors
   */
  static async getSearchedDoctors(req: Request, res: Response) {
    const searchValue = req.params.searchValue;

    if (!searchValue)
      return res.status(422).json({message: 'Invalid Search Text'});

    const getRegex = (str: string) => ({
      $or: [
        {firstName: {$regex: str, $options: 'i'}},
        {lastName: {$regex: str, $options: 'i'}},
      ],
    });

    const query = searchValue
      .split(' ')
      .reduce((accum, currentValue) => [...accum, getRegex(currentValue)], []);

    try {
      const doctors = await Doctor.find({$and: query})
        .select('_id firstName lastName')
        .lean();
      return res.json({
        doctors,
      });
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}

export default DoctorController;
