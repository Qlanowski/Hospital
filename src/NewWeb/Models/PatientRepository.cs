using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewWeb.Models
{
    public class PatientRepository : IPatientRepository
    {
        private MedContext _context;
        private ILogger<PatientRepository> _logger;

        public PatientRepository(MedContext context, ILogger<PatientRepository> logger)
        {
            _context = context;
            _logger = logger;
        }   

        public void DoctorAddPatient(Patient newPatient, string name)
        {
            var doctor = _context.Doctors.Where(d => d.UserName == name).FirstOrDefault();
            _context.Add(newPatient);
            _context.DoctorPatients.Add(new DoctorPatient() { Id = doctor.Id, PatientId = newPatient.PatientId });
        }

        public IEnumerable<Patient> GetDoctorsPatients(string name)
        {
            var patients = _context.Doctors
                .Join(
                _context.DoctorPatients,
                d => d.Id,
                dp => dp.Id,
                (d, dp) => new { d, dp }
                )
                .Join(
                _context.Patients,
                pdp => pdp.dp.PatientId,
                pa => pa.PatientId,
                (pdp, pa) => new { pdp, pa }
                )
                .Where(c => c.pdp.d.UserName == name)
                .Select(c => c.pa)
                .ToList();

            return patients;
        }

        public Patient GetPatientBySurname(int patientId, string name)
        {
            var patients = _context.Doctors
                .Join(
                _context.DoctorPatients,
                d => d.Id,
                dp => dp.Id,
                (d, dp) => new { d, dp }
                )
                .Join(
                _context.Patients,
                pdp => pdp.dp.PatientId,
                pa => pa.PatientId,
                (pdp, pa) => new { pdp, pa }
                )
                .Where(c => c.pdp.d.UserName == name)
                .Select(c => c.pa)
                .ToList(); 

            var patient = patients
                .Where(p => p.PatientId == patientId)
                .FirstOrDefault();

            return patient;
                
        }

        public IEnumerable<Patient> GetRestPatiens(string name)
        {
            var myPatientsId = _context.Doctors //Id pacjetów lekarza który chce ściągnąć  nowych pacjętów
                .Join(
                _context.DoctorPatients,
                d => d.Id,
                dp => dp.Id,
                (d, dp) => new { d, dp }
                )
                .Join(
                _context.Patients,
                pdp => pdp.dp.PatientId,
                pa => pa.PatientId,
                (pdp, pa) => new { pdp, pa }
                )
                .Where(c => c.pdp.d.UserName == name)
                .Select(c => c.pa.PatientId)
                .ToList();

            var allPatientsId = _context.Patients //id wszystkich pacjentów w bazie
                                .Select(p=>p.PatientId)
                                .ToList();

            IEnumerable<int> patientsIdToReturn = allPatientsId.Except(myPatientsId); //kolekcja Id wszystkich pacjętów bez id pacjętów których już ten lekarz ma

            var patients = _context.Patients // zwraca pacjetów których ten lekarz nie ma
                                    .Where(p => patientsIdToReturn.Any(p2=>p2.Equals(p.PatientId)))
                                    .ToList();

            return patients;


        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }


        public void UpdatePatient(Patient updatedPatient)
        {
            _context.Update(updatedPatient);
        }
    }
}
