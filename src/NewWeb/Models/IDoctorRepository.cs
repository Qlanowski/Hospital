using System.Collections.Generic;
using System.Threading.Tasks;

namespace NewWeb.Models
{
    public interface IDoctorRepository
    {
        IEnumerable<Doctor> GetAllDoctors();
        Task<bool> SaveChangesAsync();
        IEnumerable<Doctor> GetPatientDoctors(int patientId);
    }
}