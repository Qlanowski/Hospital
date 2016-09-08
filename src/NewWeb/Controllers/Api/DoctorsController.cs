using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NewWeb.Models;
using NewWeb.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewWeb.Controllers.Api
{
    [Route("api/doctors/{patientId}")]
    [Authorize]
    public class DoctorsController : Controller
    {
        private IDoctorRepository _doctorRepository;
        private ILogger<PatientsController> _logger;

        public DoctorsController(ILogger<PatientsController> logger, IDoctorRepository doctorRepository )
        {
            _logger = logger;
            _doctorRepository = doctorRepository;
        }
        [HttpGet("")]
        public IActionResult GetPatientDoctors(int patientId)
        {
            try
            {
                var doctors = _doctorRepository.GetPatientDoctors(patientId);

                return Ok(Mapper.Map<IEnumerable<SentPatientViewModel>>(doctors)); // pozwala na zmapowanie wiecej niż jednego lekarza
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get doctors: {ex}");
                return BadRequest("Error occured");
            }

        }
    }
}
