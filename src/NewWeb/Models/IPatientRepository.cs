using System.Collections.Generic;
using System.Threading.Tasks;

namespace NewWeb.Models
{
    public interface IPatientRepository
    {
        
        Task<bool> SaveChangesAsync();
        IEnumerable<Patient> GetDoctorsPatients(string name);
        void DoctorAddPatient(Patient newPatient, string name);
        Patient GetPatientBySurname(int patientId, string name);
        void UpdatePatient(Patient updatedPatient);
    }
}