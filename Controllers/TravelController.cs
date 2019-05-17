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
                PeopleAmount = travelDTO.PeopleAmount,
                DateFrom = travelDTO.DateFrom,
                DateTill =  travelDTO.DateTill
            };
            dbcontext.Add(travel);
            dbcontext.SaveChanges();
        }

        //add travel
        [HttpPost("Calculate")]
        public TotalPriceDTO Calculate([FromBody]int travelId)
        {
            var savedPlacesid = dbcontext.SavedPlaces.Where(x => x.TravelId == travelId).Select(x => x.PlaceId).ToList();
            var savedPlaces = dbcontext.Places.Where(x => savedPlacesid.Contains(x.Id)).ToList();
            var dayTill = dbcontext.Travels.Where(x => x.Id == travelId).Select(x => x.DateTill.Date).First();
            var dayFrom = dbcontext.Travels.Where(x => x.Id == travelId).Select(x => x.DateFrom.Date).First();
            var daysAmount = (dayTill - dayFrom).Days;
            var restorants = 0.0;

            if (savedPlaces.Where(x => x.PlaceType == PlaceType.Restaurant).Count() > 0)
            {
                restorants =
                    savedPlaces.Where(x => x.PlaceType == PlaceType.Restaurant).Select(x => x.Price).Average() *
                    daysAmount * 2;
            }

            var hotel = 0;
            if (savedPlaces.Where(x => x.PlaceType == PlaceType.Hotel).Count() > 0)
            {
                hotel = savedPlaces.Where(x => x.PlaceType == PlaceType.Hotel).Select(x => x.Price).Min();
            }

            var result = new TotalPriceDTO()
            {
                Hotels = hotel * daysAmount ,
                Restaurants = restorants,
                Entertaiments = savedPlaces.Where(x => x.PlaceType == PlaceType.Entertaiment).Sum(x => x.Price),
                Monuments = savedPlaces.Where(x => x.PlaceType == PlaceType.Monument).Sum(x => x.Price),
                Museums = savedPlaces.Where(x => x.PlaceType == PlaceType.Museum).Sum(x => x.Price),
                
            };

            result.TotalPrice = result.Hotels + result.Restaurants + result.Entertaiments + result.Monuments +
                                result.Museums;
            return result;
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
