using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Traveler.Entities;

namespace Traveler.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class PlaceToVisitsController : ControllerBase
    {
        private readonly DataContext _context;

        public PlaceToVisitsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/PlaceToVisits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlaceToVisit>>> GetPlaces()
        {
            return await _context.Places.ToListAsync();
        }

        // GET: api/PlaceToVisits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlaceToVisit>> GetPlaceToVisit(int id)
        {
            var placeToVisit = await _context.Places.FindAsync(id);

            if (placeToVisit == null)
            {
                return NotFound();
            }

            return placeToVisit;
        }

        // PUT: api/PlaceToVisits/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlaceToVisit(int id, PlaceToVisit placeToVisit)
        {
            if (id != placeToVisit.Id)
            {
                return BadRequest();
            }

            _context.Entry(placeToVisit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaceToVisitExists(id))
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

        // POST: api/PlaceToVisits
        [HttpPost]
        public void PostPlaceToVisit([FromBody]PlaceToVisit  placeToVisit)
        {
            placeToVisit.City = _context.Cities.Where(c => c.Id == placeToVisit.CityId).First();
            placeToVisit.User = _context.Users.Where(u => u.Id == placeToVisit.UserId).First();
            _context.Places.Add(placeToVisit);
            _context.SaveChanges();
            
        }

        // DELETE: api/PlaceToVisits/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PlaceToVisit>> DeletePlaceToVisit(int id)
        {
            var placeToVisit = await _context.Places.FindAsync(id);
            if (placeToVisit == null)
            {
                return NotFound();
            }

            _context.Places.Remove(placeToVisit);
            await _context.SaveChangesAsync();

            return placeToVisit;
        }

        private bool PlaceToVisitExists(int id)
        {
            return _context.Places.Any(e => e.Id == id);
        }
    }
}
