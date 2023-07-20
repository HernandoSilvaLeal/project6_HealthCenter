import { Request, Response } from "express";

import {
  AppointmentController,
  AppointmentControllerImpl,
} from "../api/components/citas/controller";
import { AppointmentService } from "../api/components/citas/service";
import { Appointment, AppointmentReq } from "../api/components/citas/model";

const mockReq = {} as Request;
const mockRes = {} as Response;

describe("AppointmentController", () => {
  let appointmentService: AppointmentService;
  let appointmentController: AppointmentController;

  beforeEach(() => {
    appointmentService = {
      getAllAppointments: jest.fn(),
      createAppointment: jest.fn(),
      getAppointmentById: jest.fn(),
      updateAppointment: jest.fn(),
      deleteAppointment: jest.fn(),
    };

    appointmentController = new AppointmentControllerImpl(appointmentService);
    mockRes.status = jest.fn().mockReturnThis();
    mockRes.json = jest.fn().mockReturnThis();
  });

  // --------------------------------------------------------------------------------- // 1
  describe("getAllAppointments", () => {
    it("should get all appointments", async () => {
      // Mock Process
      const appointments: Appointment[] = [
        {
          identificacion_paciente: "10249876532",
          especialidad: "Carlos",
          doctor: "Caceres",
          consultorio: 101,
          horario: "5",
        },
        {
          identificacion_paciente: "10249876532",
          especialidad: "Lucas",
          doctor: "Fernandez",
          consultorio: 102,
          horario: "5",
        },
      ];

      (appointmentService.getAllAppointments as jest.Mock).mockResolvedValue(
        appointments
      );

      // Method execution
      await appointmentController.getAllAppointment(mockReq, mockRes);

      // Asserts
      expect(appointmentService.getAllAppointments).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(appointments);
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it("should be handler error and return 400 status", async () => {
      const error = new Error("Internal Server Error");
      (appointmentService.getAllAppointments as jest.Mock).mockRejectedValue(
        error
      );

      await appointmentController.getAllAppointment(mockReq, mockRes);

      expect(appointmentService.getAllAppointments).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Error getting all appointment",
      });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  // --------------------------------------------------------------------------------- // 2
  describe("createAppointment", () => {
    it("should create a new doctor and return info", async () => {
      // Mock Process
      const appointmentRes: Appointment = {
        identificacion_paciente: "10249876532",
        especialidad: "Carlos",
        doctor: "Caceres",
        consultorio: 101,
        horario: "5",
      };
      const appointmentReq: AppointmentReq = {
        identificacion_paciente: "10249876532",
        especialidad: "Carlos",
        id_doctor: 2,
        horario: "5",
      };
      (mockReq.body as AppointmentReq) = appointmentReq;
      (appointmentService.createAppointment as jest.Mock).mockResolvedValue(
        appointmentRes
      );

      // Method execution
      await appointmentController.createAppointment(mockReq, mockRes);

      // Asserts
      expect(appointmentService.createAppointment).toHaveBeenCalledWith(
        appointmentReq
      );
      expect(mockRes.json).toHaveBeenCalledWith(appointmentRes);
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });

    it("should be handler error and return 400 status", async () => {
      const error = new Error("Internal Server Error");
      mockReq.body = {};
      (appointmentService.createAppointment as jest.Mock).mockRejectedValue(
        error
      );

      await appointmentController.createAppointment(mockReq, mockRes);

      expect(appointmentService.createAppointment).toHaveBeenCalledWith({});
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  // --------------------------------------------------------------------------------- // 3
  describe("getAppointmentById", () => {
    it("should get doctor by id", async () => {
      // Mock Process
      const appointmentRes: Appointment = {
        identificacion_paciente: "10249876532",
        especialidad: "Carlos",
        doctor: "Caceres",
        consultorio: 101,
        horario: "5",
      };
      mockReq.params = { id: "1" };
      (appointmentService.getAppointmentById as jest.Mock).mockResolvedValue(
        appointmentRes
      );

      // Method execution
      await appointmentController.getAppointmentById(mockReq, mockRes);

      // Asserts
      expect(appointmentService.getAppointmentById).toHaveBeenCalledWith(1);
      expect(mockRes.json).toHaveBeenCalledWith(appointmentRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it("should return 400 if doctor not found", async () => {
      mockReq.params = { id: "1" };
      (appointmentService.getAppointmentById as jest.Mock).mockResolvedValue(
        null
      );

      await appointmentController.getAppointmentById(mockReq, mockRes);

      expect(appointmentService.getAppointmentById).toHaveBeenCalledWith(1);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Record has not found yet",
      });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    it("should return 400 if an error occurs", async () => {
      const error = new Error("Internal Server Error");
      mockReq.params = { id: "1" };
      (appointmentService.getAppointmentById as jest.Mock).mockRejectedValue(
        error
      );

      await appointmentController.getAppointmentById(mockReq, mockRes);

      expect(appointmentService.getAppointmentById).toHaveBeenCalledWith(1);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Failed to retrieve doctor",
      });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });
});
