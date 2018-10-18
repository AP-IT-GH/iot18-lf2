using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LabFarm.Controllers
{
    public class DataController : Controller
    {
        [Route("api/[controller]")]
        public int Index()
        {
            return 5;
        }

        [HttpGet]
        public IActionResult GetAllData()
        {
            return Ok();
        }
    }
}