using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Traveler.Dtos;
using Traveler.Entities;

namespace Traveler.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelController : ControllerBase
    {
        private readonly DataContext dbcontext;

        public TravelController(DataContext context)
        {
            dbcontext = context;
        }
        // GET: api/Travel
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }


        //add travel
        [HttpPost("addtravel")]
        public void AddTravel([FromBody]TravelDTO travelDTO)
        {
            Travel travel = new Travel
            {
                UserId = travelDTO.UserId,
                CityId = dbcontext.Cities.Where(c => c.Name == travelDTO.CityName).Select(c => c.Id).First(),
                PriceType = travelDTO.PriceType,
                PeopleAmount = travelDTO.PeopleAmount
            };
            dbcontext.Add(travel);
            dbcontext.SaveChanges();
        }


        // POST: api/Travel
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Travel/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
