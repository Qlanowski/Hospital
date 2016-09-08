using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewWeb.Models
{
    public class DoctorRepository : IDoctorRepository
    {
        private MedContext _context;

        public DoctorRepository(MedContext context)
        {
            _context = context;
        }


        public IEnumerable<Doctor> GetAllDoctors()
        {
            return _context.Doctors.ToList();
        }

        public IEnumerable<Doctor> GetPatientDoctors(int patientId)
        {
            var doctors = _context.DoctorPatients
                                    .Where(dp => dp.PatientId == patientId)
                                    .Select(dp=>dp.Doctor)
                                    .ToList();

            return doctors;
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}
