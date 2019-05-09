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

        [HttpPost("getusertravels")]
        public IEnumerable<TravelViewDTO> GetTravelsForUser([FromBody]int userId)
        {
            var travels = dbcontext.Travels.Where(t => t.UserId == userId).ToArray();

            List<TravelViewDTO> travelsView = new List<TravelViewDTO>();
            foreach(var tr in travels)
            {
                var countryId = dbcontext.Cities.Where(c => c.Id == tr.CityId).Select(c => c.CountryId).First();
                tr.City = dbcontext.Cities.Where(c => c.Id == tr.CityId).First();
                tr.User = dbcontext.Users.Where(c => c.Id == tr.UserId).First();
                TravelViewDTO travelView = new TravelViewDTO
                {
                    Id = tr.Id,
                    OwnerName = tr.User.Username,
                    CityName = tr.City.Name,
                    CityId = tr.CityId,
                    CountryName = dbcontext.Countries.Where(c => c.Id == countryId).Select(c => c.Name).First(),
                    PriceType = tr.PriceType,
                    Date = tr.DateFrom.ToLongDateString(),
                    RegistedAmount = 0
                };
                travelsView.Add(travelView);
            }

            return travelsView;
        }

    }
}
