using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using NewWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewWeb.Controllers.Web
{
    public class AppController : Controller
    {
        
        private IPatientRepository _patientRepository;
        private ILogger<AppController> _logger;
        private IDoctorRepository _doctorRepository;

        public AppController(IPatientRepository patientRepository,
            IDoctorRepository doctorRepository, 
            ILogger<AppController> logger)
        {
            _patientRepository = patientRepository;
            _doctorRepository = doctorRepository;
            _logger = logger;

        }

        public IActionResult Index()
        {
            try
            {
                return View();
            }
            catch(Exception ex)
            {
                _logger.LogError($"Failed to load patients: {ex.Message}");
                return Redirect("/error");
            }
            
        }

        [Authorize]
        public IActionResult Patients()
        {
            return View();        
        }
        public IActionResult About()
        {
            return View();
        }
        public IActionResult Contact()
        {
            return View();
        }
    }
}
