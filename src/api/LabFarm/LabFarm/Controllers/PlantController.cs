using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LabFarm.Data;
using LabFarm.Models;

namespace LabFarm.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class PlantController : Controller
    {
        private readonly LabContext _context;

        public PlantController(LabContext context)
        {
            _context = context;
        }

        // GET: api/Plant
        [HttpGet]
        public IEnumerable<Plant> GetPlants()
        {
            return _context.Plants;
        }

        // GET: api/Plant/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlant([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var plant = await _context.Plants.SingleOrDefaultAsync(m => m.PlantId == id);

            if (plant == null)
            {
                return NotFound();
            }

            return Ok(plant);
        }

        // PUT: api/Plant/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlant([FromRoute] int id, [FromBody] Plant plant)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != plant.PlantId)
            {
                return BadRequest();
            }

            _context.Entry(plant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlantExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Plant
        [HttpPost]
        public async Task<IActionResult> PostPlant([FromBody] Plant plant)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Plants.Add(plant);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlant", new { id = plant.PlantId }, plant);
        }

        // DELETE: api/Plant/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlant([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var plant = await _context.Plants.SingleOrDefaultAsync(m => m.PlantId == id);
            if (plant == null)
            {
                return NotFound();
            }

            _context.Plants.Remove(plant);
            await _context.SaveChangesAsync();

            return Ok(plant);
        }

        private bool PlantExists(int id)
        {
            return _context.Plants.Any(e => e.PlantId == id);
        }
    }
}