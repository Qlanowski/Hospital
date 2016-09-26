using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NewWeb.Models;
using NewWeb.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewWeb.Controllers
{
    public class AuthController : Controller
    {
        private IDoctorRepository _doctorRepository;
        private SignInManager<Doctor> _signInManager;
        private UserManager<Doctor> _userManager;

        public AuthController(SignInManager<Doctor> signInManager, 
            IDoctorRepository doctorRepository, 
            UserManager<Doctor> userManager)
        {
            _signInManager = signInManager;
            _doctorRepository = doctorRepository;
            _userManager = userManager;
        }
        public IActionResult Login()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Patients", "App");
            }

            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Login(LoginViewModel vm, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                var signInResult = await _signInManager.PasswordSignInAsync(vm.Username,
                                                                      vm.Password,
                                                                      true, false);
                if (signInResult.Succeeded)
                {
                    if (string.IsNullOrWhiteSpace(returnUrl))
                    {
                        return RedirectToAction("Patients", "App");
                    }
                    else
                    {
                        return Redirect(returnUrl);
                    }

                }
                else
                {
                    ModelState.AddModelError("", "Username or password is incorrect");
                }
            }

            return View();
        }

        public async Task<ActionResult> Logout()
        {
            if (User.Identity.IsAuthenticated)
            {
                await _signInManager.SignOutAsync();
            }
            return RedirectToAction("Index", "App");
        }
        public IActionResult Register()
        {
            return View();
        }
        [HttpPost("Auth/Register")]
        public async Task<ActionResult> Register([FromBody]RegisterDoctorViewModel theDoctor)//przyjmuje doctora w formie która jest w RegisterDoctor
        {
            if (ModelState.IsValid)//sprawdza czy doctorj jest zgodny z założeniami register doctor
            {
                var password = theDoctor.Password;
                var newDoctor = Mapper.Map<Doctor>(theDoctor);//mapuje doctora z RegisterDoctor na Doctor

                var result = await _userManager.CreateAsync(newDoctor, password);
                if (result.Succeeded)
                {
                    await _signInManager.SignInAsync(newDoctor, isPersistent: false);
                    return RedirectToAction("Patients", "App");//nie działa :( po zarejestrowaniu nie przechodzi do App Patients TODO
                    
                }
            }
            else
            {
                return BadRequest("Failed to register");
            }
            
            return View();

        }

    }
}
