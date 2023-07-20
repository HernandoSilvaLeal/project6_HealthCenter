class DoctorGetAllError extends Error {
  constructor() {
    super("Failed to retrieve doctor list");
    this.name = "DoctorGetAllError";
  }
}

class PatientGetAllError extends Error {
  constructor() {
    super("Failed to retrieve patient list");
    this.name = "PatientGetAllError";
  }
}

// Custom Errors Doctor -------------------------------
class DoctorCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DoctorCreationError";
  }
}

class DoctorUpdateError extends Error {
  constructor() {
    super("Failed to update doctor");
    this.name = "DoctorUpdateError";
  }
}

class DoctorDeleteError extends Error {
  constructor() {
    super("Failed to delete doctor");
    this.name = "DoctorDeleteError";
  }
}

// Custom Errors Citas -------------------------------
class AppointmentUpdateError extends Error {
  constructor() {
    super("Failed to update appointment");
    this.name = "AppointmentUpdateError";
  }
}

class AppointmentDeleteError extends Error {
  constructor() {
    super("Failed to delete appointment");
    this.name = "AppointmentDeleteError";
  }
}

// Custom Errors Pacientes -------------------------------

class PatientUpdateError extends Error {
  constructor() {
    super("Failed to update Patients");
    this.name = "PatientUpdateError";
  }
}

class PatientDeleteError extends Error {
  constructor() {
    super("Failed to delete Patient");
    this.name = "PatientDeleteError";
  }
}

class RecordNotFoundError extends Error {
  constructor() {
    super("Record has not found yet");
    this.name = "RecordNotFound";
  }
}

class GetAllError extends Error {
  constructor(message: string, componentName?: string) {
    super(message);
    this.name = `${componentName}GetAllError`;
  }
}

export {
  DoctorGetAllError,
  DoctorCreationError,
  RecordNotFoundError,
  DoctorUpdateError,
  DoctorDeleteError,
  PatientGetAllError,
  GetAllError,
  AppointmentUpdateError,
  AppointmentDeleteError,
  PatientUpdateError,
  PatientDeleteError
};
